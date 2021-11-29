import { App } from "cdktf";
import { DnsStack } from "./src/dns/index";
import { GitlabStack } from "./src/gitlab";
import { RoutingStack } from "./src/routing/index";

const app = new App();
new DnsStack(app);
new GitlabStack(app);
new RoutingStack(app);
app.synth();
