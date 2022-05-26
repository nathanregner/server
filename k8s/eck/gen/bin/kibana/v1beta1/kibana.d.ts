import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import { ObjectMeta } from "../../meta/v1";
/**
 * Kibana represents a Kibana resource in a Kubernetes cluster.
 */
export declare class Kibana extends pulumi.CustomResource {
    /**
     * Get an existing Kibana resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Kibana;
    /**
     * Returns true if the given object is an instance of Kibana.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    static isInstance(obj: any): obj is Kibana;
    readonly apiVersion: pulumi.Output<"kibana.k8s.elastic.co/v1beta1" | undefined>;
    readonly kind: pulumi.Output<"Kibana" | undefined>;
    readonly metadata: pulumi.Output<ObjectMeta | undefined>;
    /**
     * KibanaSpec holds the specification of a Kibana instance.
     */
    readonly spec: pulumi.Output<outputs.kibana.v1beta1.KibanaSpec | undefined>;
    /**
     * KibanaStatus defines the observed state of Kibana
     */
    readonly status: pulumi.Output<outputs.kibana.v1beta1.KibanaStatus | undefined>;
    /**
     * Create a Kibana resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: KibanaArgs, opts?: pulumi.CustomResourceOptions);
}
/**
 * The set of arguments for constructing a Kibana resource.
 */
export interface KibanaArgs {
    apiVersion?: pulumi.Input<"kibana.k8s.elastic.co/v1beta1">;
    kind?: pulumi.Input<"Kibana">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * KibanaSpec holds the specification of a Kibana instance.
     */
    spec?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecArgs>;
    /**
     * KibanaStatus defines the observed state of Kibana
     */
    status?: pulumi.Input<inputs.kibana.v1beta1.KibanaStatusArgs>;
}
