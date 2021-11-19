import { Construct } from "constructs";
import * as helm from "@cdktf/provider-helm";
import * as k8s from "@cdktf/provider-kubernetes";
import { Manifest } from "./manifest";

export class ReverseProxy extends Construct {
  constructor(scope: Construct, domain: string) {
    super(scope, "reverse-proxy");

    const ns = new k8s.Namespace(this, "ingress", {
      metadata: { name: "ingress" },
    });

    // https://community.letsencrypt.org/t/how-to-switch-from-staging-to-production/79632
    // https://www.ssllabs.com/ssltest/analyze.html?d=nregner.ddns.net&hideResults=on&latest
    /* const issuer = {
      name: "letsencrypt-staging",
      server: "https://acme-staging-v02.api.letsencrypt.org/directory",
      secret: "letsencrypt-staging.cert",
    }; */
    const issuer = {
      name: "letsencrypt",
      server: "https://acme-v02.api.letsencrypt.org/directory",
      secret: "letsencrypt.cert",
    };

    //////////////////
    // Emissary Ingress
    //////////////////
    const emissary = new helm.Release(this, "emissary-ingress", {
      namespace: ns.metadata.name,
      name: "emissary-ingress",
      repository: "https://www.getambassador.io",
      chart: "emissary-ingress",
      version: "7.1.10",
      wait: false,
      values: values({
        // https://nregner.ddns.net/ambassador/v0/diag
        adminService: { create: false },
        replicaCount: 1,
        service: {
          type: "NodePort",
          ports: [
            { name: "http", port: 80, targetPort: 8080, nodePort: 30080 },
            { name: "https", port: 443, targetPort: 8443, nodePort: 30443 },
          ],
        },
      }),
    });

    // https://www.getambassador.io/docs/emissary/latest/howtos/configure-communications/#basic-http-and-https

    const http = new Manifest(this, "http-listener", {
      dependsOn: [emissary],
      body: {
        apiVersion: "getambassador.io/v3alpha1",
        kind: "Listener",
        metadata: { namespace: ns.metadata.name, name: "http" },
        spec: {
          port: 8080,
          protocol: "HTTPS", // not a typo
          securityModel: "XFP",
          hostBinding: { namespace: { from: "SELF" } },
        },
      },
    });

    const https = new Manifest(this, "https-listener", {
      dependsOn: [emissary],
      body: {
        apiVersion: "getambassador.io/v3alpha1",
        kind: "Listener",
        metadata: { namespace: ns.metadata.name, name: "https" },
        spec: {
          port: 8443,
          protocol: "HTTPS",
          securityModel: "XFP",
          hostBinding: { namespace: { from: "SELF" } },
        },
      },
    });

    new Manifest(this, "host", {
      dependsOn: [http, https],
      body: {
        apiVersion: "getambassador.io/v3alpha1",
        kind: "Host",
        metadata: { namespace: ns.metadata.name, name: "default-host" },
        spec: {
          hostname: domain,
          tlsSecret: {
            name: "ambassador-certs",
          },
          requestPolicy: {
            insecure: {
              action: "Redirect",
              // action: "Route",
            },
          },
        },
      },
    });

    //////////////////
    // Cert Manager
    //////////////////
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

    // https://www.getambassador.io/docs/edge-stack/latest/howtos/cert-manager/
    const acmeChallenge = new k8s.Service(this, "acme-challenge", {
      dependsOn: [certManager],
      metadata: { namespace: ns.metadata.name, name: "acme-challenge" },
      spec: {
        port: [{ port: 80, targetPort: "8089" }],
        selector: { "acme.cert-manager.io/http01-solver": "true" },
      },
    });

    // https://www.getambassador.io/docs/edge-stack/latest/howtos/cert-manager/
    new Manifest(this, "acme-challenge-mapping", {
      dependsOn: [emissary, acmeChallenge],
      body: {
        apiVersion: "getambassador.io/v3alpha1",
        kind: "Mapping",
        metadata: { namespace: ns.metadata.name, name: "acme-challenge" },
        spec: {
          source: "*",
          hostname: "*",
          prefix: "/.well-known/acme-challenge/",
          rewrite: "",
          // https://www.getambassador.io/docs/edge-stack/latest/topics/using/intro-mappings/#services
          service: acmeChallenge.metadata.name,
        },
      },
    });

    new Manifest(this, "issuer", {
      dependsOn: [certManager],
      body: {
        apiVersion: "cert-manager.io/v1",
        kind: "ClusterIssuer",
        metadata: { namespace: ns.metadata.name, name: issuer.name },
        spec: {
          acme: {
            server: issuer.server,
            email: "nathanregner@gmail.com",
            privateKeySecretRef: {
              name: issuer.secret,
            },
            solvers: [{ http01: { ingress: { class: "nginx" } } }],
          },
        },
      },
    });

    new Manifest(this, "cert", {
      dependsOn: [certManager],
      body: {
        apiVersion: "cert-manager.io/v1",
        kind: "Certificate",
        metadata: { namespace: ns.metadata.name, name: domain },
        spec: {
          secretName: "ambassador-certs",
          issuerRef: { kind: "ClusterIssuer", name: issuer.name },
          commonName: domain,
          dnsNames: [domain],
        },
      },
    });

    //////////////////
    // CoreDNS
    //////////////////

    // kubectl run scratch --image=curlimages/curl -it --rm -- /bin/sh
    // curl http://nregner.ddns.net
    new k8s.Manifest(this, "update-coredns", {
      lifecycle: { preventDestroy: true },
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
              rewrite name ${domain} ${emissary.name}.${ns.metadata.name}.svc.cluster.local
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
            }
          `,
        },
      },
    });
  }
}

function values(values: {}) {
  return [JSON.stringify(values)];
}
