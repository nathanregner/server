// https://www.terraform.io/docs/providers/kubectl/r/server_version
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ServerVersionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/server_version#triggers ServerVersion#triggers}
  */
  readonly triggers?: { [key: string]: string };
}

/**
* Represents a {@link https://www.terraform.io/docs/providers/kubectl/r/server_version kubectl_server_version}
*/
export class ServerVersion extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "kubectl_server_version";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://www.terraform.io/docs/providers/kubectl/r/server_version kubectl_server_version} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ServerVersionConfig = {}
  */
  public constructor(scope: Construct, id: string, config: ServerVersionConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'kubectl_server_version',
      terraformGeneratorMetadata: {
        providerName: 'kubectl',
        providerVersion: '1.14.0',
        providerVersionConstraint: '>= 1.13.1'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._triggers = config.triggers;
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

  // triggers - computed: false, optional: true, required: false
  private _triggers?: { [key: string]: string }; 
  public get triggers() {
    return this.getStringMapAttribute('triggers');
  }
  public set triggers(value: { [key: string]: string }) {
    this._triggers = value;
  }
  public resetTriggers() {
    this._triggers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggersInput() {
    return this._triggers;
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
      triggers: cdktf.hashMapper(cdktf.stringToTerraform)(this._triggers),
    };
  }
}
