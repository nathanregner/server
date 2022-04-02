import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as helm from "@cdktf/provider-helm";
import * as k8s from "@cdktf/provider-kubernetes";
import { values } from "../common/helm";
import { k8sBackend, k8sProvider } from "../common";

export class GitlabStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "gitlab");

    k8sBackend(this, "gitlab");
    k8sProvider(this);

    const ns = new k8s.Namespace(this, "gitlab", {
      metadata: { name: "gitlab" },
    });

    const persistence = (name: string, size: string) => {
      const storageClass = "microk8s-hostpath";

      /*
      new k8s.PersistentVolumeClaim(this, `gitlab-${name}-claim`, {
        metadata: { namespace: ns.metadata.name, name: `gitlab-${name}` },
        spec: {
          storageClassName: storageClass,
          accessModes: ["ReadWriteOnce"],
          resources: { requests: { storage: size } },
        },
      });
*/

      return { storageClass, size };
    };

    new helm.Release(this, "gitlab-release", {
      namespace: ns.metadata.name,
      name: "gitlab",
      repository: "https://charts.gitlab.io/",
      chart: "gitlab",
      version: "5.9.2",
      wait: false,
      waitForJobs: false,
      values: values({
        // integrations
        certmanager: { install: false },
        prometheus: { install: false },

        // components
        global: { ingress: { enabled: false, configureCertmanager: false } },
        "gitlab-runner": {
          enabled: true,
          gitlabUrl: "http://gitlab-webservice-default:8181",
        },
        "nginx-ingress": { enabled: false },
        gitlab: { gitaly: { persistence: persistence("gitaly", "50Gi") } },
        minio: { persistence: persistence("minio", "10Gi") },
        postgresql: { persistence: persistence("postgresql", "8Gi") },
        redis: { master: { persistence: persistence("redis", "5Gi") } },
        registry: { enabled: false },
        toolbox: { persistence: persistence("toolbox", "5Gi") },
      }),
    });
  }
}
