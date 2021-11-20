// https://www.terraform.io/docs/providers/kubectl/d/filename_list.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataKubectlFilenameListConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/d/filename_list.html#pattern DataKubectlFilenameList#pattern}
  */
  readonly pattern: string;
}

/**
* Represents a {@link https://www.terraform.io/docs/providers/kubectl/d/filename_list.html kubectl_filename_list}
*/
export class DataKubectlFilenameList extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType: string = "kubectl_filename_list";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://www.terraform.io/docs/providers/kubectl/d/filename_list.html kubectl_filename_list} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataKubectlFilenameListConfig
  */
  public constructor(scope: Construct, id: string, config: DataKubectlFilenameListConfig) {
    super(scope, id, {
      terraformResourceType: 'kubectl_filename_list',
      terraformGeneratorMetadata: {
        providerName: 'kubectl'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._pattern = config.pattern;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // basenames - computed: true, optional: false, required: false
  public get basenames() {
    return this.getListAttribute('basenames');
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // matches - computed: true, optional: false, required: false
  public get matches() {
    return this.getListAttribute('matches');
  }

  // pattern - computed: false, optional: false, required: true
  private _pattern?: string; 
  public get pattern() {
    return this.getStringAttribute('pattern');
  }
  public set pattern(value: string) {
    this._pattern = value;
  }
  // Temporarily expose input value. Use with caution.
  public get patternInput() {
    return this._pattern
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      pattern: cdktf.stringToTerraform(this._pattern),
    };
  }
}
