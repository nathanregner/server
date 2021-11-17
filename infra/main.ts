import { Construct } from "constructs";
import { App, Fn, TerraformStack } from "cdktf";
import { k8sBackend, k8sProvider } from "./src/k8s";
// import * as helm from "@cdktf/provider-helm";
import * as k8s from "@cdktf/provider-kubernetes";
import { NoIp } from "./src/no-ip";
import { ReverseProxy } from "./src/ingress";

class InfraStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    k8sBackend(this, "infra");
    k8sProvider(this);

    const noIp = new k8s.Namespace(this, "no-ip", {
      metadata: { name: "no-ip" },
    });
    const domain = "nregner.ddns.net";
    new NoIp(this, {
      namespace: noIp.metadata.name!!,
      domain,
      username: "nathanregner@gmail.com",
      password: Fn.file("../../../secrets/no-ip.password.secret"),
    });

    new ReverseProxy(this, domain);
  }
}

const app = new App();
new InfraStack(app, "infra");
app.synth();
