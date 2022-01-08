import { Construct } from "constructs";
import * as helm from "@cdktf/provider-helm";
import * as k8s from "@cdktf/provider-kubernetes";
import { values } from "../common/helm";

export interface NginxIngressConfig {
  namespace: string;
  domain: string;
  cert: {
    issuerName: string;
    secretName: string;
  };
}

export class NginxIngress extends Construct {
  readonly name = "nginx";

  constructor(
    scope: Construct,
    id: string,
    { namespace, domain, cert }: NginxIngressConfig
  ) {
    super(scope, id);

    new helm.Release(this, "ingress-nginx", {
      namespace,
      name: "nginx",
      repository: "https://kubernetes.github.io/ingress-nginx",
      chart: "ingress-nginx",
      version: "4.0.13",
      values: values({
        // https://stackoverflow.com/questions/56915354/how-to-install-nginx-ingress-with-hostnetwork-on-bare-metal
        controller: {
          hostNetwork: "true",
          service: { type: "" },
          kind: "DaemonSet",
        },
      }),
    });

    new k8s.IngressV1(this, "ingress", {
      metadata: {
        namespace,
        name: "nginx",
        annotations: {
          "cert-manager.io/issuer": cert.issuerName,
        },
      },
      spec: {
        ingressClassName: "nginx",
        rule: [
          {
            host: domain,
            http: {
              path: [
                {
                  path: "/craigslist",
                  backend: {
                    service: {
                      name: "craigslist-ui",
                      port: { number: 80 },
                    },
                  },
                },
                {
                  path: "/",
                  backend: {
                    service: { name: "httpbin", port: { number: 80 } },
                  },
                },
              ],
            },
          },
        ],
        tls: [
          {
            hosts: [domain],
            secretName: cert.secretName,
          },
        ],
      },
    });

    this.httpbin(namespace);
  }

  httpbin(namespace: string) {
    const labels = { app: "httpbin" };
    new k8s.Deployment(this, "httpbin-deployment", {
      metadata: { namespace, name: "httpbin" },
      spec: {
        replicas: "1",
        selector: { matchLabels: labels },
        template: {
          metadata: { labels },
          spec: {
            container: [
              {
                name: "httpbin",
                image: "kennethreitz/httpbin",
                port: [{ containerPort: 80 }],
              },
            ],
          },
        },
      },
    });
    new k8s.Service(this, "httpbin-service", {
      metadata: { namespace, name: "httpbin", labels },
      spec: {
        selector: labels,
        port: [{ name: "http", port: 80, targetPort: "80" }],
      },
    });
  }
}
