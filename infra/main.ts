import { App } from "cdktf";
import { DnsStack } from "./src/dns/";
import { GitlabStack } from "./src/gitlab";

const app = new App();
new DnsStack(app);
new GitlabStack(app);
console.log("synth...");
app.synth();
