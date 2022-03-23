import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { CronJobSpecJobTemplate } from "@cdktf/provider-kubernetes/lib/cron-job";

interface Config {
  namespace: string;
  domain: string;
  credentials: k8s.Secret;
}

export class GoogleDomainsDdns extends Construct {
  constructor(scope: Construct, { namespace, domain, credentials }: Config) {
    const id = domain.replace(/\./g, "-");
    super(scope, id);

    const jobTemplate: CronJobSpecJobTemplate = {
      metadata: { generateName: `update-${id}-` },
      spec: {
        backoffLimit: 0,
        template: {
          metadata: { generateName: `update-${id}-` },
          spec: {
            restartPolicy: "Never",
            container: [
              {
                name: id,
                image: "curlimages/curl",
                command: [
                  "/bin/sh",
                  "-c",
                  `curl --silent --show-error --fail \
                    -u "$USERNAME:$PASSWORD" \
                    "https://domains.google.com/nic/update?hostname=$DOMAIN"`,
                ],
                env: [
                  { name: "DOMAIN", value: domain },
                  { name: "USERNAME", valueFrom: ref(credentials, "username") },
                  { name: "PASSWORD", valueFrom: ref(credentials, "password") },
                ],
              },
            ],
          },
        },
      },
    };
    new k8s.CronJob(this, "update", {
      metadata: { namespace, generateName: `update-${id}-` },
      spec: {
        schedule: "*/15 * * * *",
        concurrencyPolicy: "Forbid",
        successfulJobsHistoryLimit: 1,
        failedJobsHistoryLimit: 1,
        jobTemplate,
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
