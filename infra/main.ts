import { App, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { k8sBackend, k8sProvider } from "./src/common";
import { RoutingStack } from "./src/routing/index";
import { NoIpStack } from "./src/no-ip/index";

const app = new App();
new RoutingStack(app);
new NoIpStack(app);
app.synth();
