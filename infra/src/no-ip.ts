import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { CronJobSpecJobTemplateSpecTemplateSpecContainer } from "@cdktf/provider-kubernetes/lib/cron-job";

interface NoIpDynamicDNSOptons {
  namespace: string;
  domain: string;
  username: string;
  password: string;
}

export class NoIp extends Construct {
  constructor(scope: Construct, options: NoIpDynamicDNSOptons) {
    const { namespace, domain, username, password } = options;
    const id = domain.replace(/\./g, "-");
    super(scope, id);

    const login = new k8s.Secret(this, "login", {
      metadata: { namespace, generateName: `${id}-` },
      type: "kubernetes.io/basic-auth",
      data: { username, password },
    });
    const container: CronJobSpecJobTemplateSpecTemplateSpecContainer = {
      name: id,
      image: "curlimages/curl",
      command: [
        "/bin/sh",
        "-c",
        `curl --silent --show-error --fail \
           -u "$NO_IP_USERNAME:$NO_IP_PASSWORD" \
          "https://dynupdate.no-ip.com/nic/update?hostname=$NO_IP_DOMAIN"`,
      ],
      env: [
        { name: "NO_IP_DOMAIN", value: domain },
        { name: "NO_IP_USERNAME", valueFrom: ref(login, "username") },
        { name: "NO_IP_PASSWORD", valueFrom: ref(login, "password") },
      ],
    };
    new k8s.CronJob(this, "update", {
      metadata: { namespace, generateName: `update-${id}-` },
      spec: {
        schedule: "*/15 * * * *",
        concurrencyPolicy: "Forbid",
        successfulJobsHistoryLimit: 1,
        failedJobsHistoryLimit: 1,
        jobTemplate: {
          metadata: { generateName: `update-${id}-` },
          spec: {
            backoffLimit: 0,
            template: {
              metadata: { generateName: `update-${id}-` },
              spec: { restartPolicy: "Never", container: [container] },
            },
          },
        },
      },
    });
  }
}

function ref(secret: k8s.Secret, key: string) {
  return {
    secretKeyRef: {
      name: secret.metadata.name,
      key,
    },
  };
}
