// https://www.terraform.io/docs/providers/kubectl/r/manifest.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ManifestConfig extends cdktf.TerraformMetaArguments {
  /**
  * Default to update in-place. Setting to true will delete and create the kubernetes instead.
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#force_new Manifest#force_new}
  */
  readonly forceNew?: boolean | cdktf.IResolvable;
  /**
  * List of yaml keys to ignore changes to. Set these for fields set by Operators or other processes in kubernetes and as such you don't want to update.
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#ignore_fields Manifest#ignore_fields}
  */
  readonly ignoreFields?: string[];
  /**
  * Override the namespace to apply the kubernetes resource to
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#override_namespace Manifest#override_namespace}
  */
  readonly overrideNamespace?: string;
  /**
  * List of yaml keys with sensitive values. Set these for fields which you want obfuscated in the yaml_body output
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#sensitive_fields Manifest#sensitive_fields}
  */
  readonly sensitiveFields?: string[];
  /**
  * Default to client-side-apply. Setting to true will use server-side apply.
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#server_side_apply Manifest#server_side_apply}
  */
  readonly serverSideApply?: boolean | cdktf.IResolvable;
  /**
  * Default to true (validate). Set this flag to not validate the yaml schema before appying.
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#validate_schema Manifest#validate_schema}
  */
  readonly validateSchema?: boolean | cdktf.IResolvable;
  /**
  * Default to false (not waiting). Set this flag to wait or not for any deleted resources to be gone. This waits for finalizers.
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#wait Manifest#wait}
  */
  readonly wait?: boolean | cdktf.IResolvable;
  /**
  * Default to true (waiting). Set this flag to wait or not for Deployments and APIService to complete rollout
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#wait_for_rollout Manifest#wait_for_rollout}
  */
  readonly waitForRollout?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#yaml_body Manifest#yaml_body}
  */
  readonly yamlBody: string;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#timeouts Manifest#timeouts}
  */
  readonly timeouts?: ManifestTimeouts;
}
export interface ManifestTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html#create Manifest#create}
  */
  readonly create?: string;
}

function manifestTimeoutsToTerraform(struct?: ManifestTimeoutsOutputReference | ManifestTimeouts): any {
  if (!cdktf.canInspect(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}

export class ManifestTimeoutsOutputReference extends cdktf.ComplexObject {
  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param isSingleItem True if this is a block, false if it's a list
  */
  public constructor(terraformResource: cdktf.ITerraformResource, terraformAttribute: string, isSingleItem: boolean) {
    super(terraformResource, terraformAttribute, isSingleItem);
  }

  // create - computed: false, optional: true, required: false
  private _create?: string | undefined; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string | undefined) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create
  }
}

/**
* Represents a {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html kubectl_manifest}
*/
export class Manifest extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType: string = "kubectl_manifest";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://www.terraform.io/docs/providers/kubectl/r/manifest.html kubectl_manifest} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ManifestConfig
  */
  public constructor(scope: Construct, id: string, config: ManifestConfig) {
    super(scope, id, {
      terraformResourceType: 'kubectl_manifest',
      terraformGeneratorMetadata: {
        providerName: 'kubectl'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._forceNew = config.forceNew;
    this._ignoreFields = config.ignoreFields;
    this._overrideNamespace = config.overrideNamespace;
    this._sensitiveFields = config.sensitiveFields;
    this._serverSideApply = config.serverSideApply;
    this._validateSchema = config.validateSchema;
    this._wait = config.wait;
    this._waitForRollout = config.waitForRollout;
    this._yamlBody = config.yamlBody;
    this._timeouts = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // api_version - computed: true, optional: false, required: false
  public get apiVersion() {
    return this.getStringAttribute('api_version');
  }

  // force_new - computed: false, optional: true, required: false
  private _forceNew?: boolean | cdktf.IResolvable | undefined; 
  public get forceNew() {
    return this.getBooleanAttribute('force_new') as any;
  }
  public set forceNew(value: boolean | cdktf.IResolvable | undefined) {
    this._forceNew = value;
  }
  public resetForceNew() {
    this._forceNew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forceNewInput() {
    return this._forceNew
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ignore_fields - computed: false, optional: true, required: false
  private _ignoreFields?: string[] | undefined; 
  public get ignoreFields() {
    return this.getListAttribute('ignore_fields');
  }
  public set ignoreFields(value: string[] | undefined) {
    this._ignoreFields = value;
  }
  public resetIgnoreFields() {
    this._ignoreFields = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ignoreFieldsInput() {
    return this._ignoreFields
  }

  // kind - computed: true, optional: false, required: false
  public get kind() {
    return this.getStringAttribute('kind');
  }

  // live_manifest_incluster - computed: true, optional: false, required: false
  public get liveManifestIncluster() {
    return this.getStringAttribute('live_manifest_incluster');
  }

  // live_uid - computed: true, optional: false, required: false
  public get liveUid() {
    return this.getStringAttribute('live_uid');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // namespace - computed: true, optional: false, required: false
  public get namespace() {
    return this.getStringAttribute('namespace');
  }

  // override_namespace - computed: false, optional: true, required: false
  private _overrideNamespace?: string | undefined; 
  public get overrideNamespace() {
    return this.getStringAttribute('override_namespace');
  }
  public set overrideNamespace(value: string | undefined) {
    this._overrideNamespace = value;
  }
  public resetOverrideNamespace() {
    this._overrideNamespace = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get overrideNamespaceInput() {
    return this._overrideNamespace
  }

  // sensitive_fields - computed: false, optional: true, required: false
  private _sensitiveFields?: string[] | undefined; 
  public get sensitiveFields() {
    return this.getListAttribute('sensitive_fields');
  }
  public set sensitiveFields(value: string[] | undefined) {
    this._sensitiveFields = value;
  }
  public resetSensitiveFields() {
    this._sensitiveFields = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sensitiveFieldsInput() {
    return this._sensitiveFields
  }

  // server_side_apply - computed: false, optional: true, required: false
  private _serverSideApply?: boolean | cdktf.IResolvable | undefined; 
  public get serverSideApply() {
    return this.getBooleanAttribute('server_side_apply') as any;
  }
  public set serverSideApply(value: boolean | cdktf.IResolvable | undefined) {
    this._serverSideApply = value;
  }
  public resetServerSideApply() {
    this._serverSideApply = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serverSideApplyInput() {
    return this._serverSideApply
  }

  // uid - computed: true, optional: false, required: false
  public get uid() {
    return this.getStringAttribute('uid');
  }

  // validate_schema - computed: false, optional: true, required: false
  private _validateSchema?: boolean | cdktf.IResolvable | undefined; 
  public get validateSchema() {
    return this.getBooleanAttribute('validate_schema') as any;
  }
  public set validateSchema(value: boolean | cdktf.IResolvable | undefined) {
    this._validateSchema = value;
  }
  public resetValidateSchema() {
    this._validateSchema = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get validateSchemaInput() {
    return this._validateSchema
  }

  // wait - computed: false, optional: true, required: false
  private _wait?: boolean | cdktf.IResolvable | undefined; 
  public get wait() {
    return this.getBooleanAttribute('wait') as any;
  }
  public set wait(value: boolean | cdktf.IResolvable | undefined) {
    this._wait = value;
  }
  public resetWait() {
    this._wait = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get waitInput() {
    return this._wait
  }

  // wait_for_rollout - computed: false, optional: true, required: false
  private _waitForRollout?: boolean | cdktf.IResolvable | undefined; 
  public get waitForRollout() {
    return this.getBooleanAttribute('wait_for_rollout') as any;
  }
  public set waitForRollout(value: boolean | cdktf.IResolvable | undefined) {
    this._waitForRollout = value;
  }
  public resetWaitForRollout() {
    this._waitForRollout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get waitForRolloutInput() {
    return this._waitForRollout
  }

  // yaml_body - computed: false, optional: false, required: true
  private _yamlBody?: string; 
  public get yamlBody() {
    return this.getStringAttribute('yaml_body');
  }
  public set yamlBody(value: string) {
    this._yamlBody = value;
  }
  // Temporarily expose input value. Use with caution.
  public get yamlBodyInput() {
    return this._yamlBody
  }

  // yaml_body_parsed - computed: true, optional: false, required: false
  public get yamlBodyParsed() {
    return this.getStringAttribute('yaml_body_parsed');
  }

  // yaml_incluster - computed: true, optional: false, required: false
  public get yamlIncluster() {
    return this.getStringAttribute('yaml_incluster');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts?: ManifestTimeouts | undefined; 
  private __timeoutsOutput = new ManifestTimeoutsOutputReference(this as any, "timeouts", true);
  public get timeouts() {
    return this.__timeoutsOutput;
  }
  public putTimeouts(value: ManifestTimeouts | undefined) {
    this._timeouts = value;
  }
  public resetTimeouts() {
    this._timeouts = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      force_new: cdktf.booleanToTerraform(this._forceNew),
      ignore_fields: cdktf.listMapper(cdktf.stringToTerraform)(this._ignoreFields),
      override_namespace: cdktf.stringToTerraform(this._overrideNamespace),
      sensitive_fields: cdktf.listMapper(cdktf.stringToTerraform)(this._sensitiveFields),
      server_side_apply: cdktf.booleanToTerraform(this._serverSideApply),
      validate_schema: cdktf.booleanToTerraform(this._validateSchema),
      wait: cdktf.booleanToTerraform(this._wait),
      wait_for_rollout: cdktf.booleanToTerraform(this._waitForRollout),
      yaml_body: cdktf.stringToTerraform(this._yamlBody),
      timeouts: manifestTimeoutsToTerraform(this._timeouts),
    };
  }
}
