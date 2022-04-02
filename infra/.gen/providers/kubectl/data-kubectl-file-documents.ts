// https://www.terraform.io/docs/providers/kubectl/d/file_documents
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataKubectlFileDocumentsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/d/file_documents#content DataKubectlFileDocuments#content}
  */
  readonly content: string;
}

/**
* Represents a {@link https://www.terraform.io/docs/providers/kubectl/d/file_documents kubectl_file_documents}
*/
export class DataKubectlFileDocuments extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "kubectl_file_documents";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://www.terraform.io/docs/providers/kubectl/d/file_documents kubectl_file_documents} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataKubectlFileDocumentsConfig
  */
  public constructor(scope: Construct, id: string, config: DataKubectlFileDocumentsConfig) {
    super(scope, id, {
      terraformResourceType: 'kubectl_file_documents',
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
    this._content = config.content;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // content - computed: false, optional: false, required: true
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
  }
  // Temporarily expose input value. Use with caution.
  public get contentInput() {
    return this._content;
  }

  // documents - computed: true, optional: false, required: false
  public get documents() {
    return this.getListAttribute('documents');
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // manifests - computed: true, optional: false, required: false
  public manifests(key: string): string | cdktf.IResolvable {
    return new cdktf.StringMap(this, 'manifests').lookup(key);
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      content: cdktf.stringToTerraform(this._content),
    };
  }
}
