import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { k8sBackend, k8sProvider } from "../common";
import * as yaml from "js-yaml";
import * as fs from "fs";
import { Manifest } from "../common";

export class EckStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "eck");

    k8sBackend(this, "eck");
    k8sProvider(this);

    this.manifests("crds", "./src/eck/crds.yaml");
    this.manifests("operator", "./src/eck/operator.yaml");
  }

  manifests(prefix: string, path: string) {
    const docs: any[] = yaml.loadAll(fs.readFileSync(path).toString());
    for (let i = 0; i < docs.length; i++) {
      new Manifest(this, `${prefix}-${i}`, docs[i]);
    }
  }
}
