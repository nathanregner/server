import { Construct } from "constructs";
import * as helm from "@cdktf/provider-helm";
import * as k8s from "@cdktf/provider-kubernetes";
import { values } from "../common/helm";
import { Certificate } from "./certificate";
import { IngressV1SpecRuleHttpPathBackendService } from "@cdktf/provider-kubernetes";
import { Fn, TerraformOutput } from "cdktf";

export interface NginxIngressConfig {
  namespace: string;
  certificate: Certificate;
}

export class NginxIngress extends Construct {
  readonly name = "nginx";

  constructor(
    scope: Construct,
    id: string,
    { namespace, certificate }: NginxIngressConfig
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

    const api = this.localService(namespace, {
      name: "craigslist-api",
      port: 6000,
    });

    const gitlab = this.externalService(namespace, {
      namespace: "gitlab",
      name: "gitlab-webservice-default",
      port: 8080,
    });

    new k8s.IngressV1(this, "ingress", {
      metadata: {
        namespace,
        name: "nginx",
        annotations: {
          "cert-manager.io/issuer": certificate.issuer.name,
          "nginx.ingress.kubernetes.io/rewrite-target": "/$2",
          "nginx.ingress.kubernetes.io/force-ssl-redirect": "true",
        },
      },
      spec: {
        ingressClassName: "nginx",
        rule: [
          {
            host: `gitlab.${certificate.domain.commonName}`,
            http: {
              path: [
                {
                  path: "/",
                  pathType: "Prefix",
                  backend: { service: gitlab },
                },
              ],
            },
          },
          {
            host: certificate.domain.commonName,
            http: {
              path: [
                {
                  path: "/craigslist(/|$)(.*)",
                  pathType: "Prefix",
                  backend: {
                    service: {
                      name: "craigslist-ui",
                      port: { number: 80 },
                    },
                  },
                },
                {
                  path: "/craigslist-api(/|$)(.*)",
                  pathType: "Prefix",
                  backend: { service: api },
                },
              ],
            },
          },
        ],
        tls: [
          {
            hosts: [certificate.domain.commonName],
            secretName: certificate.secretName,
          },
        ],
      },
    });

    this.httpbin(namespace);
  }

  private externalService(
    namespace: string,
    service: { namespace: string; name: string; port: number }
  ): IngressV1SpecRuleHttpPathBackendService {
    const proxy = "http";
    const proxyService = new k8s.Service(this, `${service.name}-proxy`, {
      metadata: { namespace, name: service.name },
      spec: {
        type: "ClusterIP",
        clusterIp: "None",
        port: [
          {
            name: proxy,
            port: service.port,
            protocol: "TCP",
            targetPort: `${service.port}`,
          },
        ],
      },
    });
    const sourceService = new k8s.DataKubernetesServiceV1(this, service.name, {
      metadata: { namespace: service.namespace, name: service.name },
    });
    new k8s.Endpoints(this, `${service.name}-proxy-endpoints`, {
      metadata: { namespace, name: proxyService.metadata.name },
      subset: [
        {
          address: [{ ip: sourceService.spec("0").clusterIp }],
          port: [{ name: proxy, port: service.port, protocol: "TCP" }],
        },
      ],
    });
    return {
      name: proxyService.metadata.name,
      port: { name: proxy },
    };
  }

  private localService(
    namespace: string,
    { name, port }: { name: string; port: number }
  ): IngressV1SpecRuleHttpPathBackendService {
    const http = "http";
    new k8s.Service(this, name, {
      metadata: { namespace, name },
      spec: {
        type: "ClusterIP",
        clusterIp: "None",
        port: [{ name: http, port, protocol: "TCP", targetPort: `${port}` }],
      },
    });
    new k8s.Endpoints(this, `${name}-endpoints`, {
      metadata: { namespace, name },
      subset: [
        {
          address: [{ ip: "10.0.1.1" }],
          port: [{ name: http, port, protocol: "TCP" }],
        },
      ],
    });
    return {
      name,
      port: { name: http },
    };
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
