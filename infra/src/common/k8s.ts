import { Construct } from "constructs";
import { K8sBackend } from "./k8s-backend";
import * as helm from "@cdktf/provider-helm";
import * as k8s from "@cdktf/provider-kubernetes";
import * as kubectl from "../../.gen/providers/kubectl";

export const namespace = "arbitrage-bot";

export const k8sProvider = (scope: Construct) => {
  const kubernetes = {
    configPath: "~/.kube/config",
  };
  new k8s.KubernetesProvider(scope, "k8s", kubernetes);
  new helm.HelmProvider(scope, "helm", { kubernetes });
  new kubectl.KubectlProvider(scope, "kubectl", kubernetes);
};

export const k8sBackend = (scope: Construct, secretSuffix: string) => {
  new K8sBackend(scope, {
    secretSuffix,
    loadConfigFile: true,
  });
};
