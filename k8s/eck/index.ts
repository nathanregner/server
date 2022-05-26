import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

export class EckOperator {
  constructor() {
    new k8s.yaml.ConfigFile("crds", { file: "./eck/crds.yaml" });
    new k8s.yaml.ConfigFile("operator", { file: "./eck/operator.yaml" });
  }
}
