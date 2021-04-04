import { Construct } from "constructs";
import {
  CronJob,
  CronJobSpec,
  CronJobSpecJobTemplateSpec,
  CronJobSpecJobTemplateSpecTemplateSpecContainer,
  Secret,
} from "./.gen/providers/kubernetes";

interface NoIpConfig {
  namespace: string;
  domains: string[];
  username: string;
  passwordFile: string;
}

export class NoIp extends Construct {
  constructor(scope: Construct, id: string, config: NoIpConfig) {
    super(scope, id);

    const { namespace, domains, username, passwordFile } = config;
    const name = "no-ip";

    const passwordSecret = new Secret(this, id + "-password", {
      metadata: [{ name, namespace }],
      data: { password: `file(${passwordFile})` },
    });

    const containerSpec: CronJobSpecJobTemplateSpecTemplateSpecContainer = {
      name: "no-ip",
      image: "curlimages/curl",
      command: [
        "/bin/sh",
        "-c",
        `curl --silent --show-error --fail \\
          -u "$NO_IP_USERNAME:$NO_IP_PASSWORD" \\
          "https://dynupdate.no-ip.com/nic/update?hostname=$NO_IP_DOMAIN"`,
      ],
      env: [
        { name: "NO_IP_DOMAIN", value: domains.join(",") },
        { name: "NO_IP_USERNAME", value: username },
        {
          name: "NO_IP_PASSWORD",
          valueFrom: [
            {
              secretKeyRef: [
                { key: passwordSecret.metadata[0].name, name: "password" },
              ],
            },
          ],
        },
      ],
    };

    const jobSpec: CronJobSpecJobTemplateSpec = {
      backoffLimit: 0,
      parallelism: 1,
      template: [
        {
          metadata: [{ name }],
          spec: [{ restartPolicy: "Never", container: [containerSpec] }],
        },
      ],
    };

    const cronSpec: CronJobSpec = {
      concurrencyPolicy: "Forbid",
      failedJobsHistoryLimit: 0,
      successfulJobsHistoryLimit: 0,
      schedule: "*/15 * * * *",
      jobTemplate: [{ metadata: [{ name }], spec: [jobSpec] }],
    };
    new CronJob(this, "no-ip", {
      metadata: [{ name, namespace }],
      spec: [cronSpec],
    });
  }
}
