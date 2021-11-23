import { App } from "cdktf";
import { GitlabStack } from "./src/gitlab";
import { NoIpStack } from "./src/no-ip/index";
import { RoutingStack } from "./src/routing/index";

const app = new App();
new GitlabStack(app);
new NoIpStack(app);
new RoutingStack(app);
app.synth();
