import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import * as gcp from "@cdktf/provider-google";
import { Fn, ITerraformDependable } from "cdktf";
import { Manifest } from "../common";
import { Certificate } from "../common/manifest/Certificate.v1";
import { ClusterIssuer } from "../common/manifest/ClusterIssuer.v1";

interface Config {
  namespace: string;
  dns: {
    domain: string;
    wildcards: string[];
  };
  project: string;
  issuer: { name: string; server: string };
  dependsOn: ITerraformDependable[];
}

export class CloudDnsCert extends Construct {
  readonly issuerName: string;
  readonly secretName: string;

  constructor(
    scope: Construct,
    id: string,
    { namespace, dns, project, issuer, dependsOn }: Config
  ) {
    super(scope, id);

    this.issuerName = issuer.name;
    this.secretName = `${issuer.name}-cert`;

    this.node.addDependency(...dependsOn);

    // https://cert-manager.io/docs/configuration/acme/dns01/google/
    const sa = new gcp.ServiceAccount(this, "dns01-solver", {
      accountId: "dns01-solver",
    });
    new gcp.ProjectIamBinding(this, "dns01-solver-binding", {
      members: [`serviceAccount:${sa.email}`],
      role: "roles/dns.admin",
    });
    const key = new gcp.ServiceAccountKey(this, "dns01-solver-key", {
      serviceAccountId: sa.name,
    });

    // https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account_key#example-usage-save-key-in-kubernetes-secret---deprecated
    const secretKey = "key.json";
    const secret = new k8s.Secret(this, "dns01-solver-secret", {
      metadata: { namespace, name: "dns01-solver-svc-acct" },
      data: {
        [secretKey]: Fn.base64decode(key.privateKey),
      },
    });

    new Manifest<ClusterIssuer>(this, "issuer", {
      content: {
        apiVersion: "cert-manager.io/v1",
        kind: "ClusterIssuer",
        metadata: { namespace, name: issuer.name },
        spec: {
          acme: {
            server: issuer.server,
            email: "nathanregner@gmail.com",
            privateKeySecretRef: { name: issuer.name },
            solvers: [
              {
                // https://cert-manager.io/docs/configuration/acme/dns01/google/
                dns01: {
                  cloudDNS: {
                    project,
                    serviceAccountSecretRef: {
                      name: secret.metadata.name,
                      key: secretKey,
                    },
                  },
                },
              },
            ],
          },
        },
      },
    });

    new Manifest<Certificate>(this, "cert", {
      content: {
        apiVersion: "cert-manager.io/v1",
        kind: "Certificate",
        metadata: { namespace, name: dns.domain },
        spec: {
          secretName: this.secretName,
          issuerRef: { kind: "ClusterIssuer", name: issuer.name },
          commonName: dns.domain,
          dnsNames: [dns.domain, ...dns.wildcards],
        },
      },
    });
  }
}
