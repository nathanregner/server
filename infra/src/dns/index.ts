import { call, Fn, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { CronJobSpecJobTemplate } from "@cdktf/provider-kubernetes/lib/cron-job";
import { k8sBackend, k8sProvider } from "../common";

export class DnsStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "dns");

    k8sBackend(this, "dns");
    k8sProvider(this);

    const domain = "nregner.net";
    const ns = new k8s.Namespace(this, "dns", {
      metadata: { name: "dns" },
    });

    const credentials = new k8s.Secret(this, "credentials", {
      metadata: { namespace: ns.metadata.name, name: "credentials" },
      type: "kubernetes.io/basic-auth",
      data: call("jsondecode", [Fn.file("../../../src/dns/credentials.json")]),
    });

    new DdnsUpdate(this, {
      namespace: ns.metadata.name!!,
      domain,
      credentials,
    });
  }
}

export class DdnsUpdate extends Construct {
  constructor(
    scope: Construct,
    options: { namespace: string; domain: string; credentials: k8s.Secret }
  ) {
    const { namespace, domain, credentials } = options;
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
