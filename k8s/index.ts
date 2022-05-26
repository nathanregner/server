import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import { EckOperator } from "./eck";

new k8s.Provider("k8s", { context: "k3d-local" });

// const appLabels = { app: "nginx" };
// const deployment = new k8s.apps.v1.Deployment("nginx", {
//   spec: {
//     selector: { matchLabels: appLabels },
//     replicas: 1,
//     template: {
//       metadata: { labels: appLabels },
//       spec: { containers: [{ name: "nginx", image: "nginx" }] },
//     },
//   },
// });
// export const name = deployment.metadata.name;

new EckOperator();
