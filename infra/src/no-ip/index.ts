import { Fn, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { CronJobSpecJobTemplateSpecTemplateSpecContainer } from "@cdktf/provider-kubernetes/lib/cron-job";
import { k8sBackend, k8sProvider } from "../common";

export class NoIpStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "no-ip");

    k8sBackend(this, "no-ip");
    k8sProvider(this);

    const domain = "nregner.ddns.net";
    const noIp = new k8s.Namespace(this, "no-ip", {
      metadata: { name: "no-ip" },
    });
    new NoIpUpdate(this, {
      namespace: noIp.metadata.name!!,
      domain,
      // https://community.ui.com/questions/Any-luck-with-no-ip-group-Update/e5195e2a-5319-4e24-8379-844e4b1a0797
      username: "duc#nathanregner@gmail.com",
      password: Fn.file("../../../src/no-ip/duc.password.secret"),
    });
  }
}

interface Options {
  namespace: string;
  domain: string;
  username: string;
  password: string;
}

export class NoIpUpdate extends Construct {
  constructor(scope: Construct, options: Options) {
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
