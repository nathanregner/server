import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import * as gcp from "@cdktf/provider-google";
import { Fn, ITerraformDependable } from "cdktf";
import { Manifest } from "../common";
import { Certificate } from "../common/manifest/Certificate.v1";
import { ClusterIssuer } from "../common/manifest/ClusterIssuer.v1";
import { iam } from "@cdktf/provider-aws";
import { Route53Zone } from "@cdktf/provider-aws/lib/route53";

interface Config {
  namespace: string;
  region: string;
  zone: Route53Zone;
  issuer: { name: string; server: string };
  dns: { domain: string; wildcards: string[] };
  dependsOn: ITerraformDependable[];
}

export class Route53DNSCert extends Construct {
  readonly issuerName: string;
  readonly secretName: string;

  constructor(
    scope: Construct,
    id: string,
    { namespace, region, zone, issuer, dns, dependsOn }: Config
  ) {
    super(scope, id);

    this.issuerName = issuer.name;
    this.secretName = `${issuer.name}-cert`;

    this.node.addDependency(...dependsOn);

    const user = new iam.IamUser(this, "cert-manager", {
      name: "cert-manager",
    });
    const key = new iam.IamAccessKey(this, "cert-manager-key", {
      user: user.name,
    });
    const policy = new iam.IamPolicy(this, "cert-manager-policy", {
      name: "cert-manager",
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: "route53:GetChange",
            Resource: "arn:aws:route53:::change/*",
          },
          {
            Effect: "Allow",
            Action: [
              "route53:ChangeResourceRecordSets",
              "route53:ListResourceRecordSets",
            ],
            Resource: zone.arn,
          },
          {
            Effect: "Allow",
            Action: "route53:ListHostedZonesByName",
            Resource: "*",
          },
        ],
      }),
    });
    new iam.IamUserPolicyAttachment(this, "cert-manager-attachment", {
      user: user.name,
      policyArn: policy.arn,
    });

    const keySecret = new k8s.Secret(this, "cert-manager-access-key", {
      metadata: { namespace, name: "cert-manager-access-key" },
      data: { secret: key.secret },
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
                  route53: {
                    region,
                    hostedZoneID: zone.id,
                    accessKeyID: key.id,
                    secretAccessKeySecretRef: {
                      name: keySecret.metadata.name,
                      key: "secret",
                    },
                  },
                },
              },
            ],
          },
        },
      },
    });

    // TODO: This should live elsewhere
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
