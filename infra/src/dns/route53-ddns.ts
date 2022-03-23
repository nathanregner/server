import { Construct } from "constructs";
import { iam, route53 } from "@cdktf/provider-aws";
import { Fn } from "cdktf";
import { CronJobSpecJobTemplate } from "@cdktf/provider-kubernetes/lib/cron-job";
import * as k8s from "@cdktf/provider-kubernetes";

export interface Route53DDNSConfig {
  namespace: string;
  region: string;
}

export class Route53DDNS extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { namespace, region }: Route53DDNSConfig
  ) {
    super(scope, id);

    const zone = new route53.Route53Zone(this, "zone", { name: "nregner.net" });

    const user = new iam.IamUser(this, "ddns", { name: "ddns" });
    const key = new iam.IamAccessKey(this, "ddns-access-key", {
      user: user.name,
    });
    const policy = new iam.IamPolicy(this, "ddns-update", {
      name: "ddns-update",
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "DDNSUpdate",
            Effect: "Allow",
            Action: [
              "route53:ChangeResourceRecordSets",
              "route53:ListResourceRecordSets",
            ],
            Resource: zone.arn,
          },
        ],
      }),
    });
    new iam.IamUserPolicyAttachment(this, "ddns-attachment", {
      user: user.name,
      policyArn: policy.arn,
    });

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
                image: "amazon/aws-cli:2.4.27",
                command: [
                  "/bin/bash",
                  "-c",
                  Fn.file("../../../src/dns/route53-ddns.sh"),
                ],
                env: [
                  { name: "AWS_ACCESS_KEY_ID", value: key.id },
                  { name: "AWS_SECRET_ACCESS_KEY", value: key.secret },
                  { name: "AWS_DEFAULT_REGION", value: region },
                  { name: "NAME", value: "nregner.net." },
                  { name: "HOSTED_ZONE_ID", value: zone.id },
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
