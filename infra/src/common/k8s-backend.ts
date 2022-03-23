import {
  DataTerraformRemoteStateLocal,
  TerraformBackend,
  TerraformRemoteState,
} from "cdktf";
import { Construct } from "constructs";
import { keysToSnakeCase } from "cdktf/lib/util";

/** https://www.terraform.io/docs/language/settings/backends/kubernetes.html */
export interface K8sBackendConfig {
  secretSuffix: string;
  namespace?: string;
  loadConfigFile?: boolean;
}

export class K8sBackend extends TerraformBackend {
  constructor(scope: Construct, private readonly config: K8sBackendConfig) {
    super(scope, "backend", "kubernetes");
  }

  synthesizeAttributes() {
    return keysToSnakeCase({ ...this.config });
  }

  getRemoteStateDataSource(
    scope: Construct,
    name: string,
    fromStack: string
  ): TerraformRemoteState {
    return new K8sRemoteState(this, this.config);
  }
}

class K8sRemoteState extends TerraformRemoteState {
  constructor(scope: Construct, config: K8sBackendConfig) {
    super(scope, "remote-state", "backend", config as any);
  }
}
