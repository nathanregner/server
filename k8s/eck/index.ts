import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import * as eck from "../eck/gen/index";

export class EckOperator {
  constructor() {
    new k8s.yaml.ConfigFile("crds", { file: "./eck/crds.yaml" });
    new k8s.yaml.ConfigFile("operator", { file: "./eck/operator.yaml" });

    new eck.elasticsearch.v1.Elasticsearch("quickstart", {
      metadata: { name: "quickstart" },
      spec: {
        version: "8.2.1",
        nodeSets: [
          {
            name: "default",
            count: 1,
            config: { "node.store.allow_mmap": false },
          },
        ],
      },
    });
  }
}
