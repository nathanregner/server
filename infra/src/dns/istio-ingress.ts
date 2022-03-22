import { Construct } from "constructs";
import { Manifest } from "../common";
import { VirtualService } from "../../target/VirtualService.v1beta1";

export interface IstioIngressConfig {
  namespace: string;
}

export class IstioIngress extends Construct {
  constructor(scope: Construct, id: string, { namespace }: IstioIngressConfig) {
    super(scope, id);

    new Manifest<VirtualService>(this, "test", {
      content: {
        apiVersion: "networking.istio.io/v1beta1",
        kind: "VirtualService",
        metadata: { namespace, name: "test" },
      },
    });
  }
}
