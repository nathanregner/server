import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { k8sBackend, k8sProvider } from "../common";
import * as helm from "@cdktf/provider-helm";
import { values } from "../common/helm";
import { NginxIngress } from "./nginx-ingress";
import { Route53DDNS } from "./route53-ddns";
import { AwsProvider, route53 } from "@cdktf/provider-aws";
import { Route53DNSCert } from "./route53-dns-cert";

const domain = "nregner.net";

// https://www.ssllabs.com/ssltest/analyze.html?viaform=on&d=nregner.net&hideResults=on
export class DnsStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "dns");

    k8sBackend(this, "dns");
    k8sProvider(this);
    const region = "us-west-2";
    new AwsProvider(this, "aws", {
      region: region,
      defaultTags: { tags: { project: "server/infra/dns" } },
    });

    const ns = new k8s.Namespace(this, "dns", {
      metadata: { name: "dns" },
    });

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

    const dns = {
      domain,
      wildcards: [`*.${domain}`],
    };

    /*
    // https://community.letsencrypt.org/t/how-to-switch-from-staging-to-production/79632
    const productionCert = new CloudDnsCert(this, "staging", {
      namespace: ns.metadata.name,
      project,
      dns,
      issuer: {
        name: "letsencrypt",
        server: "https://acme-v02.api.letsencrypt.org/directory",
      },
      dependsOn: [certManager],
    });
*/

    const zone = new route53.Route53Zone(this, "zone", { name: "nregner.net" });

    const cert = new Route53DNSCert(this, "wildcard-staging", {
      namespace: ns.metadata.name,
      region,
      zone,
      dependsOn: [certManager],
      /*
      issuer: {
        name: "letsencrypt-staging",
        server: "https://acme-staging-v02.api.letsencrypt.org/directory",
      },
      */
      issuer: {
        name: "letsencrypt",
        server: "https://acme-v02.api.letsencrypt.org/directory",
      },
      dns,
    });

    new Route53DDNS(this, "route-53", {
      namespace: ns.metadata.name!!,
      region,
      zone,
    });

    new NginxIngress(this, "nginx", {
      namespace: ns.metadata.name!!,
      domain,
      cert: cert,
    });

    // CoreDNS
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
          Corefile: `
            .:53 {
              errors
              health {
               lameduck 5s
              }
              ready
              log . {
               class error
              }
              kubernetes cluster.local in-addr.arpa ip6.arpa {
               pods insecure
               fallthrough in-addr.arpa ip6.arpa
              }
              prometheus :9153
              forward . 8.8.8.8 8.8.4.4
              cache 30
              loop
              reload
              loadbalance
              hosts {
                10.0.1.1 local-node
                fallthrough
              }
            }
          `,
        },
      },
    });
  }
}
