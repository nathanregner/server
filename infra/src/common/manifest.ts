import { Construct } from "constructs";
import * as kubectl from "../../.gen/providers/kubectl";

export interface Metadata {
  namespace?: string;
  name?: string;
  labels?: Record<string, string>;
}

export class Manifest<T> extends kubectl.Manifest {
  constructor(
    scope: Construct,
    id: string,
    manifest: T & { metadata: Metadata }
  ) {
    console.log(manifest);
    super(scope, id, {
      yamlBody: JSON.stringify(manifest, undefined, 2),
    });
  }
}
