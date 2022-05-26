import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import { ObjectMeta } from "../../meta/v1";
/**
 * ApmServer represents an APM Server resource in a Kubernetes cluster.
 */
export declare class ApmServer extends pulumi.CustomResource {
    /**
     * Get an existing ApmServer resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): ApmServer;
    /**
     * Returns true if the given object is an instance of ApmServer.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    static isInstance(obj: any): obj is ApmServer;
    readonly apiVersion: pulumi.Output<"apm.k8s.elastic.co/v1" | undefined>;
    readonly kind: pulumi.Output<"ApmServer" | undefined>;
    readonly metadata: pulumi.Output<ObjectMeta | undefined>;
    /**
     * ApmServerSpec holds the specification of an APM Server.
     */
    readonly spec: pulumi.Output<outputs.apm.v1.ApmServerSpec | undefined>;
    /**
     * ApmServerStatus defines the observed state of ApmServer
     */
    readonly status: pulumi.Output<outputs.apm.v1.ApmServerStatus | undefined>;
    /**
     * Create a ApmServer resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: ApmServerArgs, opts?: pulumi.CustomResourceOptions);
}
/**
 * The set of arguments for constructing a ApmServer resource.
 */
export interface ApmServerArgs {
    apiVersion?: pulumi.Input<"apm.k8s.elastic.co/v1">;
    kind?: pulumi.Input<"ApmServer">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * ApmServerSpec holds the specification of an APM Server.
     */
    spec?: pulumi.Input<inputs.apm.v1.ApmServerSpecArgs>;
    /**
     * ApmServerStatus defines the observed state of ApmServer
     */
    status?: pulumi.Input<inputs.apm.v1.ApmServerStatusArgs>;
}
