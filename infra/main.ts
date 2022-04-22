import { App } from "cdktf";
import { DnsStack } from "./src/dns/";
import { EckStack } from "./src/eck";
import { GitlabStack } from "./src/gitlab";

const app = new App();
new DnsStack(app);
new EckStack(app);
new GitlabStack(app);
console.log("synth...");
app.synth();
