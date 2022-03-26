import * as crd from "../common/manifest/Certificate.v1";
import { Manifest } from "../common";
import { Construct } from "constructs";
import { Issuer } from "./route53-certificate-issuer";

export interface Domain {
  commonName: string;
  names?: string[];
}

export interface CertificateConfig {
  namespace: string;
  domain: Domain;
  issuer: Issuer;
}

export class Certificate extends Manifest<crd.Certificate> {
  readonly secretName: string;
  readonly domain: Domain;
  readonly issuer: Issuer;

  constructor(
    scope: Construct,
    { namespace, issuer, domain }: CertificateConfig
  ) {
    const secretName = `${domain.commonName}-cert`;
    super(scope, `${domain.commonName}-${issuer}`, {
      content: {
        apiVersion: "cert-manager.io/v1",
        kind: "Certificate",
        metadata: {
          namespace: namespace,
          name: domain.commonName,
          labels: { issuer: issuer.name },
        },
        spec: {
          secretName,
          issuerRef: { kind: "ClusterIssuer", name: issuer.name },
          commonName: domain.commonName,
          dnsNames: [domain.commonName, ...(domain.names ?? [])],
        },
      },
    });
    this.secretName = secretName;
    this.domain = domain;
    this.issuer = issuer;
  }
}
