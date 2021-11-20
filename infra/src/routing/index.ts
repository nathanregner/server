import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { k8sBackend, k8sProvider, LocalhostMapping, Mapping } from "../common";
import { EmissaryIngress } from "./emissary-ingress";
import * as k8s from "@cdktf/provider-kubernetes";

export class RoutingStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "routing");

    k8sBackend(this, "routing");
    k8sProvider(this);

    const domain = "nregner.ddns.net";

    // ingress
    const ns = new k8s.Namespace(this, "routing", {
      metadata: { name: "routing" },
    });
    const emissary = new EmissaryIngress(this, {
      namespace: ns.metadata.name!!,
      domain,
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
              rewrite name ${domain} ${emissary.ingress}.${ns.metadata.name}.svc.cluster.local
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

    // mappings
    new LocalhostMapping(this, {
      dependsOn: [emissary],
      metadata: { namespace: ns.metadata.name!!, name: "craigslist-ui" },
      spec: { prefix: "/craigslist", port: 8888 },
    });
    new LocalhostMapping(this, {
      dependsOn: [emissary],
      metadata: { namespace: ns.metadata.name!!, name: "craigslist-api" },
      spec: { prefix: "/craigslist-api/", port: 6000 },
    });
    new LocalhostMapping(this, {
      dependsOn: [emissary],
      metadata: { namespace: ns.metadata.name!!, name: "nlp" },
      spec: { prefix: "/nlp/", port: 4000 },
    });

    this.httpbin(ns.metadata.name!!);
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
                image: "docker.io/kennethreitz/httpbin",
                port: [{ containerPort: 80 }],
              },
            ],
          },
        },
      },
    });
    const service = new k8s.Service(this, "httpbin-service", {
      metadata: { namespace, name: "httpbin", labels },
      spec: {
        selector: labels,
        port: [{ name: "http", port: 80, targetPort: "80" }],
      },
    });
    new Mapping(this, "httpbin-mapping", {
      metadata: { namespace, name: "httpbin" },
      spec: { prefix: "/httpbin", service },
    });
  }
}
