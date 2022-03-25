// https://www.terraform.io/docs/providers/kubectl/d/server_version
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataKubectlServerVersionConfig extends cdktf.TerraformMetaArguments {
}

/**
* Represents a {@link https://www.terraform.io/docs/providers/kubectl/d/server_version kubectl_server_version}
*/
export class DataKubectlServerVersion extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType: string = "kubectl_server_version";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://www.terraform.io/docs/providers/kubectl/d/server_version kubectl_server_version} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataKubectlServerVersionConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataKubectlServerVersionConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'kubectl_server_version',
      terraformGeneratorMetadata: {
        providerName: 'kubectl'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // build_date - computed: true, optional: false, required: false
  public get buildDate() {
    return this.getStringAttribute('build_date');
  }

  // git_commit - computed: true, optional: false, required: false
  public get gitCommit() {
    return this.getStringAttribute('git_commit');
  }

  // git_version - computed: true, optional: false, required: false
  public get gitVersion() {
    return this.getStringAttribute('git_version');
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // major - computed: true, optional: false, required: false
  public get major() {
    return this.getStringAttribute('major');
  }

  // minor - computed: true, optional: false, required: false
  public get minor() {
    return this.getStringAttribute('minor');
  }

  // patch - computed: true, optional: false, required: false
  public get patch() {
    return this.getStringAttribute('patch');
  }

  // platform - computed: true, optional: false, required: false
  public get platform() {
    return this.getStringAttribute('platform');
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
    };
  }
}
