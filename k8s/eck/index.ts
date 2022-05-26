import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import * as eck from "../eck/gen/index";
import { ObjectMeta } from "./gen/meta/v1";
import { ConfigFileOpts } from "@pulumi/kubernetes/yaml";
import { ComponentResourceOptions } from "@pulumi/pulumi";

function ref<T>(metadata: ObjectMeta | undefined) {
  if (metadata == null) throw new Error("Metadata cannot be null");
  const { namespace, name } = metadata;
  return { namespace, name };
}

export class EckOperator {
  constructor() {
    new k8s.yaml.ConfigFile("crds", { file: "./eck/crds.yaml" });
    new k8s.yaml.ConfigFile("operator", { file: "./eck/operator.yaml" });

    const ns = new k8s.core.v1.Namespace("test", {
      metadata: { name: "test" },
    });

    new k8s.yaml.ConfigFile("example", {
      file: "./kubernetes-integration.yaml",
      transformations: [
        (o, opts) => {
          o.metadata.namespace = ns.metadata.name;
        },
      ],
    });

    // new Quickstart();
  }
}

class Quickstart {
  constructor() {
    const version = "8.2.1";
    const elasticsearch = new eck.elasticsearch.v1.Elasticsearch("quickstart", {
      metadata: { name: "quickstart" },
      spec: {
        version,
        nodeSets: [
          {
            name: "default",
            count: 1,
            config: { "node.store.allow_mmap": false },
          },
        ],
      },
    });

    const elasticsearchRef = elasticsearch.metadata.apply(ref);

    const kibana = new eck.kibana.v1.Kibana("quickstart", {
      metadata: { name: "quickstart" },
      spec: {
        version,
        count: 1,
        elasticsearchRef,
      },
    });

    const kibanaRef = kibana.metadata.apply(ref);

    new eck.beat.v1beta1.Beat("quickstart", {
      apiVersion: "beat.k8s.elastic.co/v1beta1",
      kind: "Beat",
      metadata: {
        name: "quickstart",
      },
      spec: {
        type: "filebeat",
        version,
        elasticsearchRef,
        kibanaRef,
        config: {
          "filebeat.inputs": [
            {
              type: "container",
              paths: ["/var/log/containers/*.log"],
            },
          ],
        },
        daemonSet: {
          podTemplate: {
            spec: {
              dnsPolicy: "ClusterFirstWithHostNet",
              hostNetwork: true,
              securityContext: {
                runAsUser: 0,
              },
              containers: [
                {
                  name: "filebeat",
                  volumeMounts: [
                    {
                      name: "varlogcontainers",
                      mountPath: "/var/log/containers",
                    },
                    {
                      name: "varlogpods",
                      mountPath: "/var/log/pods",
                    },
                    {
                      name: "varlibdockercontainers",
                      mountPath: "/var/lib/docker/containers",
                    },
                  ],
                },
              ],
              volumes: [
                {
                  name: "varlogcontainers",
                  hostPath: { path: "/var/log/containers" },
                },
                {
                  name: "varlogpods",
                  hostPath: { path: "/var/log/pods" },
                },
                {
                  name: "varlibdockercontainers",
                  hostPath: { path: "/var/lib/docker/containers" },
                },
              ],
            },
          },
        },
      },
    });

    new eck.apm.v1.ApmServer("quickstart", {
      metadata: { name: "quickstart" },
      spec: {
        version,
        count: 1,
        elasticsearchRef,
        kibanaRef,
      },
    });

    new eck.agent.v1alpha1.Agent("quickstart", {
      metadata: { name: "quickstart" },
      spec: {
        version,
        elasticsearchRefs: [elasticsearchRef],
        kibanaRef,
      },
    });
  }
}
