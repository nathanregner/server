import { App } from "cdktf";
import { RoutingStack } from "./src/routing/index";
import { NoIpStack } from "./src/no-ip/index";

const app = new App();
new NoIpStack(app);
new RoutingStack(app);
app.synth();
