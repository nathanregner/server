import { Construct } from "constructs";
import * as kubectl from "../../.gen/providers/kubectl";
import { ITerraformDependable } from "cdktf";

export interface ManifestConfig {
  dependsOn?: ITerraformDependable[];
  body: {
    apiVersion: string;
    kind: string;
    metadata: { namespace?: string; name?: string };
    spec: { [key: string]: any };
  };
}

export class Manifest extends Construct implements ITerraformDependable {
  readonly fqn: string;

  constructor(scope: Construct, id: string, config: ManifestConfig) {
    super(scope, id);
    const { dependsOn, body } = config;
    const manifest = new kubectl.Manifest(this, `${id}-manifest`, {
      yamlBody: JSON.stringify(body, undefined, 2),
      dependsOn,
    });
    this.fqn = manifest.fqn;
  }
}
