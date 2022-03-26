import { Construct } from "constructs";
import * as kubectl from "../../.gen/providers/kubectl";
import { ITerraformDependable } from "cdktf";

export interface ManifestMetadata {
  namespace?: string;
  name?: string;
  labels?: Record<string, string>;
}

export interface ManifestConfig<T> {
  dependsOn?: ITerraformDependable[];
  content: T & {
    metadata?: ManifestMetadata;
  };
}

export class Manifest<T> extends Construct implements ITerraformDependable {
  readonly fqn: string;

  constructor(scope: Construct, id: string, config: ManifestConfig<T>) {
    super(scope, id);
    const { dependsOn, content } = config;
    const manifest = new kubectl.Manifest(this, `${id}-manifest`, {
      yamlBody: JSON.stringify(content, undefined, 2),
      dependsOn,
    });
    this.fqn = manifest.fqn;
  }
}
