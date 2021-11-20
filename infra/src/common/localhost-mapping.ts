import { Construct } from "constructs";
import * as k8s from "@cdktf/provider-kubernetes";
import { Mapping } from "./mapping";
import { ITerraformDependable } from "cdktf";

export interface LocalhostMappingOptions {
  dependsOn?: ITerraformDependable[];
  metadata: { namespace: string; name: string };
  spec: {
    prefix: string;
    rewrite?: string;
    port: number;
  };
}

export class LocalhostMapping extends Construct {
  constructor(scope: Construct, options: LocalhostMappingOptions) {
    super(scope, options.metadata.name);

    const { dependsOn, metadata, spec } = options;

    const service = new k8s.Service(this, "service", {
      dependsOn,
      metadata,
      spec: {
        type: "ClusterIP",
        clusterIp: "None",
        port: [{ protocol: "TCP", port: spec.port }],
      },
    });

    new k8s.Endpoints(this, "endpoint", {
      dependsOn,
      metadata,
      subset: [{ address: [{ ip: "10.0.1.1" }], port: [{ port: spec.port }] }],
    });

    new Mapping(this, "mapping", {
      dependsOn,
      metadata,
      spec: {
        prefix: spec.prefix,
        rewrite: spec.rewrite,
        service: `${service.metadata.name}:${spec.port}`,
      },
    });
  }
}
