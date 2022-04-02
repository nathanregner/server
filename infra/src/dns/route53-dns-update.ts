import { Construct } from "constructs";
import { Fn } from "cdktf";
import { CronJobSpecJobTemplate } from "@cdktf/provider-kubernetes/lib/cron-job";
import * as k8s from "@cdktf/provider-kubernetes";
import { iam, route53 } from "@cdktf/provider-aws";

export interface Route53DnsUpdateConfig {
  namespace: string;
  region: string;
  zone: route53.Route53Zone;
  domains: string[];
}

export class Route53DnsUpdate extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { namespace, region, zone, domains }: Route53DnsUpdateConfig
  ) {
    super(scope, id);

    const user = new iam.IamUser(this, "dns-update", { name: "dns-update" });
    const key = new iam.IamAccessKey(this, "dns-update-access-key", {
      user: user.name,
    });
    const policy = new iam.IamPolicy(this, "dns-update-policy", {
      name: "dns-update",
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
    new iam.IamUserPolicyAttachment(this, "dns-update-policy-attachment", {
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
            container: domains.map((name, index) => ({
              name: `${id}-${index}`,
              image: "amazon/aws-cli:2.4.27",
              command: [
                "/bin/bash",
                "-c",
                Fn.file("../../../src/dns/route53-dns-update.sh"),
              ],
              env: [
                { name: "AWS_ACCESS_KEY_ID", value: key.id },
                { name: "AWS_SECRET_ACCESS_KEY", value: key.secret },
                { name: "AWS_DEFAULT_REGION", value: region },
                { name: "NAME", value: `${name}.` },
                { name: "HOSTED_ZONE_ID", value: zone.zoneId },
              ],
            })),
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
