import { call, Fn, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { k8sBackend, k8sProvider } from "../common";
import { GoogleDomainsDdns } from "./google-domains-ddns";
import * as helm from "@cdktf/provider-helm";
import { values } from "../common/helm";
import { CloudDnsCert } from "./cloud-dns-cert";
import * as gcp from "@cdktf/provider-google";
import { NginxIngress } from "./nginx-ingress";

const project = "copper-canyon-296719";
const domain = "nregner.net";

// https://www.ssllabs.com/ssltest/analyze.html?viaform=on&d=nregner.net&hideResults=on
export class DnsStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "dns");

    k8sBackend(this, "dns");
    k8sProvider(this);
    new gcp.GoogleProvider(this, "gcp", {
      project,
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

    // https://community.letsencrypt.org/t/how-to-switch-from-staging-to-production/79632
    // const productionCert = new CloudDnsCert(this, "staging", {
    //   namespace: ns.metadata.name,
    //   project,
    //   domain,
    //   issuer: {
    //     name: "letsencrypt",
    //     server: "https://acme-v02.api.letsencrypt.org/directory",
    //   },
    //   dependsOn: [certManager],
    // });

    const stagingCert = new CloudDnsCert(this, "staging", {
      namespace: ns.metadata.name,
      project,
      dns,
      issuer: {
        name: "letsencrypt-staging",
        server: "https://acme-staging-v02.api.letsencrypt.org/directory",
      },
      dependsOn: [certManager],
    });

    // TODO: Migrate this to CloudDNS once 60 day window is up
    // 1. gcloud dns record-sets list -z default
    // 2. manually copy to google domains custom record
    // 3. dig -t txt _acme-challenge.nregner.net +short
    new GoogleDomainsDdns(this, {
      namespace: ns.metadata.name!!,
      domain,
      credentials: new k8s.Secret(this, "credentials", {
        metadata: { namespace: ns.metadata.name, name: "credentials" },
        type: "kubernetes.io/basic-auth",
        data: call("jsondecode", [
          Fn.file("../../../src/dns/credentials.json"),
        ]),
      }),
    });

    new NginxIngress(this, "nginx", {
      namespace: ns.metadata.name!!,
      domain,
      cert: stagingCert,
    });
  }
}
