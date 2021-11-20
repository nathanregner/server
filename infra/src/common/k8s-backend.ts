import { TerraformBackend } from "cdktf";
import { Construct } from "constructs";
import { keysToSnakeCase } from "cdktf/lib/util";

/** https://www.terraform.io/docs/language/settings/backends/kubernetes.html */
interface K8sBackendProps {
  secretSuffix: string;
  namespace?: string;
  loadConfigFile?: boolean;
}

export class K8sBackend extends TerraformBackend {
  constructor(scope: Construct, private readonly props: K8sBackendProps) {
    super(scope, "backend", "kubernetes");
    this.props = props;
  }

  synthesizeAttributes() {
    return keysToSnakeCase({ ...this.props });
  }
}
