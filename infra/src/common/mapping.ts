import { Service } from "@cdktf/provider-kubernetes";
import { Construct } from "constructs";
import { Manifest } from "./manifest";
import { ITerraformDependable } from "cdktf";

export interface MappingOptions {
  dependsOn?: ITerraformDependable[];
  metadata: { namespace: string; name: string };
  spec: {
    /** https://www.getambassador.io/docs/edge-stack/latest/topics/using/intro-mappings/#services */
    service: Service | string;
    host?: string;
    prefix?: string;
    rewrite?: string;
  };
}

export class Mapping extends Construct {
  constructor(scope: Construct, id: string, options: MappingOptions) {
    super(scope, id);

    const { metadata, spec } = options;
    if (typeof spec.service !== "string") {
      const { namespace, name } = spec.service.metadata;
      spec.service = `${name}.${namespace}`;
    }

    new Manifest(this, `${id}-mapping`, {
      body: {
        apiVersion: "getambassador.io/v3alpha1",
        kind: "Mapping",
        metadata,
        spec: {
          prefix: "",
          ...spec,
        },
      },
    });
  }
}
