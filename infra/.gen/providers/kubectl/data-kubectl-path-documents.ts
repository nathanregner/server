// https://www.terraform.io/docs/providers/kubectl/d/path_documents.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataKubectlPathDocumentsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Flag to disable template parsing of the loaded documents
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/d/path_documents.html#disable_template DataKubectlPathDocuments#disable_template}
  */
  readonly disableTemplate?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/d/path_documents.html#pattern DataKubectlPathDocuments#pattern}
  */
  readonly pattern: string;
  /**
  * Sensitive variables to substitute, allowing for hiding sensitive variables in terraform output
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/d/path_documents.html#sensitive_vars DataKubectlPathDocuments#sensitive_vars}
  */
  readonly sensitiveVars?: { [key: string]: string } | cdktf.IResolvable;
  /**
  * Variables to substitute
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/d/path_documents.html#vars DataKubectlPathDocuments#vars}
  */
  readonly vars?: { [key: string]: string } | cdktf.IResolvable;
}

/**
* Represents a {@link https://www.terraform.io/docs/providers/kubectl/d/path_documents.html kubectl_path_documents}
*/
export class DataKubectlPathDocuments extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType: string = "kubectl_path_documents";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://www.terraform.io/docs/providers/kubectl/d/path_documents.html kubectl_path_documents} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataKubectlPathDocumentsConfig
  */
  public constructor(scope: Construct, id: string, config: DataKubectlPathDocumentsConfig) {
    super(scope, id, {
      terraformResourceType: 'kubectl_path_documents',
      terraformGeneratorMetadata: {
        providerName: 'kubectl'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._disableTemplate = config.disableTemplate;
    this._pattern = config.pattern;
    this._sensitiveVars = config.sensitiveVars;
    this._vars = config.vars;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // disable_template - computed: false, optional: true, required: false
  private _disableTemplate?: boolean | cdktf.IResolvable | undefined; 
  public get disableTemplate() {
    return this.getBooleanAttribute('disable_template') as any;
  }
  public set disableTemplate(value: boolean | cdktf.IResolvable | undefined) {
    this._disableTemplate = value;
  }
  public resetDisableTemplate() {
    this._disableTemplate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disableTemplateInput() {
    return this._disableTemplate
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
  public manifests(key: string): string {
    return new cdktf.StringMap(this, 'manifests').lookup(key);
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

  // sensitive_vars - computed: false, optional: true, required: false
  private _sensitiveVars?: { [key: string]: string } | cdktf.IResolvable | undefined; 
  public get sensitiveVars() {
    // Getting the computed value is not yet implemented
    return this.interpolationForAttribute('sensitive_vars') as any;
  }
  public set sensitiveVars(value: { [key: string]: string } | cdktf.IResolvable | undefined) {
    this._sensitiveVars = value;
  }
  public resetSensitiveVars() {
    this._sensitiveVars = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sensitiveVarsInput() {
    return this._sensitiveVars
  }

  // vars - computed: false, optional: true, required: false
  private _vars?: { [key: string]: string } | cdktf.IResolvable | undefined; 
  public get vars() {
    // Getting the computed value is not yet implemented
    return this.interpolationForAttribute('vars') as any;
  }
  public set vars(value: { [key: string]: string } | cdktf.IResolvable | undefined) {
    this._vars = value;
  }
  public resetVars() {
    this._vars = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varsInput() {
    return this._vars
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      disable_template: cdktf.booleanToTerraform(this._disableTemplate),
      pattern: cdktf.stringToTerraform(this._pattern),
      sensitive_vars: cdktf.hashMapper(cdktf.anyToTerraform)(this._sensitiveVars),
      vars: cdktf.hashMapper(cdktf.anyToTerraform)(this._vars),
    };
  }
}
