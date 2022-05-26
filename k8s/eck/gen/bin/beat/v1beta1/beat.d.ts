import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import { ObjectMeta } from "../../meta/v1";
/**
 * Beat is the Schema for the Beats API.
 */
export declare class Beat extends pulumi.CustomResource {
    /**
     * Get an existing Beat resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Beat;
    /**
     * Returns true if the given object is an instance of Beat.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    static isInstance(obj: any): obj is Beat;
    readonly apiVersion: pulumi.Output<"beat.k8s.elastic.co/v1beta1" | undefined>;
    readonly kind: pulumi.Output<"Beat" | undefined>;
    readonly metadata: pulumi.Output<ObjectMeta | undefined>;
    /**
     * BeatSpec defines the desired state of a Beat.
     */
    readonly spec: pulumi.Output<outputs.beat.v1beta1.BeatSpec | undefined>;
    /**
     * BeatStatus defines the observed state of a Beat.
     */
    readonly status: pulumi.Output<outputs.beat.v1beta1.BeatStatus | undefined>;
    /**
     * Create a Beat resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: BeatArgs, opts?: pulumi.CustomResourceOptions);
}
/**
 * The set of arguments for constructing a Beat resource.
 */
export interface BeatArgs {
    apiVersion?: pulumi.Input<"beat.k8s.elastic.co/v1beta1">;
    kind?: pulumi.Input<"Beat">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * BeatSpec defines the desired state of a Beat.
     */
    spec?: pulumi.Input<inputs.beat.v1beta1.BeatSpecArgs>;
    /**
     * BeatStatus defines the observed state of a Beat.
     */
    status?: pulumi.Input<inputs.beat.v1beta1.BeatStatusArgs>;
}
