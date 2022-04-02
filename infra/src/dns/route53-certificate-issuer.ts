import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { Manifest } from "../common";
import { ClusterIssuer } from "../common/manifest/ClusterIssuer.v1";
import { iam, route53 } from "@cdktf/provider-aws";

export interface Issuer {
  name: string;
  server: string;
}

export interface Route53DnsCertificateManagerConfig {
  namespace: string;
  region: string;
  zone: route53.Route53Zone;
}

export class Route53CertificateIssuer extends Construct {
  readonly staging: Issuer;
  readonly production: Issuer;

  constructor(
    scope: Construct,
    id: string,
    private config: Route53DnsCertificateManagerConfig
  ) {
    super(scope, id);

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
            Resource: config.zone.arn,
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
      metadata: {
        namespace: this.config.namespace,
        name: "cert-manager-access-key",
      },
      data: { secret: key.secret },
    });
    const accessKey = {
      id: key.id,
      secretName: keySecret.metadata.name,
    };

    this.staging = this.issuer(accessKey, {
      name: "letsencrypt-staging",
      server: "https://acme-staging-v02.api.letsencrypt.org/directory",
    });
    this.production = this.issuer(accessKey, {
      name: "letsencrypt",
      server: "https://acme-v02.api.letsencrypt.org/directory",
    });
  }

  private issuer(
    accessKey: { id: string; secretName: string },
    issuer: Issuer
  ) {
    new Manifest<ClusterIssuer>(this, issuer.name, {
      apiVersion: "cert-manager.io/v1",
      kind: "ClusterIssuer",
      metadata: { namespace: this.config.namespace, name: issuer.name },
      spec: {
        acme: {
          server: issuer.server,
          email: "nathanregner@gmail.com",
          privateKeySecretRef: { name: issuer.name },
          solvers: [
            {
              selector: { matchLabels: { issuer: issuer.name } },
              // https://cert-manager.io/docs/configuration/acme/dns01/google/
              dns01: {
                route53: {
                  region: this.config.region,
                  hostedZoneID: this.config.zone.id,
                  accessKeyID: accessKey.id,
                  secretAccessKeySecretRef: {
                    name: accessKey.secretName,
                    key: "secret",
                  },
                },
              },
            },
          ],
        },
      },
    });
    return issuer;
  }
}
