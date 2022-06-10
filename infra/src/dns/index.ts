import { Fn, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { k8sBackend, k8sProvider } from "../common";
import * as helm from "@cdktf/provider-helm";
import { values } from "../common/helm";
import { NginxIngress } from "./nginx-ingress";
import { Route53DnsUpdate } from "./route53-dns-update";
import { AwsProvider, route53, ses, sns } from "@cdktf/provider-aws/lib/";
import { Route53CertificateIssuer } from "./route53-certificate-issuer";
import { Certificate } from "./certificate";

// https://www.ssllabs.com/ssltest/analyze.html?viaform=on&d=nregner.net&hideResults=on
export class DnsStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "dns");

    // providers
    k8sBackend(this, "dns");
    k8sProvider(this);
    const aws = new AwsProvider(this, "aws", {
      region: "us-west-2",
      defaultTags: { tags: { project: "server/infra/dns" } },
    });

    const domain = { commonName: "nregner.net", names: [`*.nregner.net`] };
    const ns = new k8s.Namespace(this, "dns", {
      metadata: { name: "dns" },
    });

    //
    // Route53 Domain
    //

    const zone = new route53.Route53Zone(this, "zone", {
      name: domain.commonName,
    });
    new route53.Route53DomainsRegisteredDomain(this, "nregner-net", {
      domainName: domain.commonName,
      // hack until cdktf supports loops...
      nameServer: [0, 1, 2, 3].map((index) => ({
        name: Fn.element(zone.nameServers, index),
      })),
    });
    new Route53DnsUpdate(this, "route53-dns-update", {
      namespace: ns.metadata.name,
      region: aws.region!!,
      zone,
      domains: [domain.commonName, ...domain.names],
    });

    //
    // SendInBlue
    //

    new route53.Route53Record(this, "sendinblue-dkim", {
      zoneId: zone.id,
      name: `mail._domainkey.${domain.commonName}`,
      type: "TXT",
      ttl: 60,
      records: [
        "k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeMVIzrCa3T14JsNY0IRv5/2V1/v2itlviLQBwXsa7shBD6TrBkswsFUToPyMRWC9tbR/5ey0nRBH0ZVxp+lsmTxid2Y2z+FApQ6ra2VsXfbJP3HE6wAO0YTVEJt1TmeczhEd2Jiz/fcabIISgXEdSpTYJhb0ct0VJRxcg4c8c7wIDAQAB",
      ],
    });
    new route53.Route53Record(this, "sendinblue-spf", {
      zoneId: zone.id,
      name: domain.commonName,
      type: "TXT",
      ttl: 60,
      records: [
        "v=spf1 include:spf.sendinblue.com mx ~all",
        "Sendinblue-code:cb50c333834cbfd1efd0e0107585833c",
      ],
    });
    new route53.Route53Record(this, "sendinblue-dmarc", {
      zoneId: zone.id,
      name: `_dmarc.${domain.commonName}`,
      type: "TXT",
      ttl: 60,
      records: [
        "v=DMARC1; p=none; sp=none; rua=mailto:dmarc@mailinblue.com!10m; ruf=mailto:dmarc@mailinblue.com!10m; rf=afrf; pct=100; ri=86400",
      ],
    });

    //
    // SendInBlue
    //

    const records = [
      {
        name: "em5726",
        value: "u27378089.wl090.sendgrid.net",
      },
      {
        name: "s1._domainkey",
        value: "s1.domainkey.u27378089.wl090.sendgrid.net",
      },
      {
        name: "s2._domainkey",
        value: "s2.domainkey.u27378089.wl090.sendgrid.net",
      },
    ];

    for (const { name, value } of records) {
      new route53.Route53Record(this, `sendgrid-${name}`, {
        zoneId: zone.id,
        name: `${name}.${domain.commonName}`,
        type: "CNAME",
        ttl: 60,
        records: [value],
      });
    }

    //
    // Certificate
    //

    const certManager = new helm.Release(this, "cert-manager", {
      namespace: ns.metadata.name,
      name: "cert-manager",
      repository: "https://charts.jetstack.io",
      chart: "cert-manager",
      version: "1.6.1",
      values: values({
        installCRDs: true,
      }),
    });

    const issuer = new Route53CertificateIssuer(this, "route53-issuer", {
      namespace: ns.metadata.name,
      region: aws.region!!,
      zone,
    });
    issuer.node.addDependency(certManager);

    const certificate = new Certificate(this, {
      namespace: ns.metadata.name,
      domain,
      issuer: issuer.production,
    });
    certificate.node.addDependency(certManager);

    //
    // Ingress
    //

    new NginxIngress(this, "nginx", {
      namespace: ns.metadata.name,
      certificate,
    });

    //
    // CoreDNS
    //

    // kubectl run scratch --image=curlimages/curl -it --rm -- /bin/sh
    // curl http://nregner.ddns.net
    new k8s.Manifest(this, "update-coredns", {
      manifest: {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
          name: "coredns",
          namespace: "kube-system",
        },
        data: {
          Corefile: Fn.file("../../../src/dns/Corefile"),
        },
      },
    });
  }
}
