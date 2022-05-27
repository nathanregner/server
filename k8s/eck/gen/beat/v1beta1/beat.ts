// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

/**
 * Beat is the Schema for the Beats API.
 */
export class Beat extends pulumi.CustomResource {
    /**
     * Get an existing Beat resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Beat {
        return new Beat(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:beat.k8s.elastic.co/v1beta1:Beat';

    /**
     * Returns true if the given object is an instance of Beat.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is Beat {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === Beat.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"beat.k8s.elastic.co/v1beta1" | undefined>;
    public readonly kind!: pulumi.Output<"Beat" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
    /**
     * BeatSpec defines the desired state of a Beat.
     */
    public readonly spec!: pulumi.Output<outputs.beat.v1beta1.BeatSpec | undefined>;
    /**
     * BeatStatus defines the observed state of a Beat.
     */
    public readonly status!: pulumi.Output<outputs.beat.v1beta1.BeatStatus | undefined>;

    /**
     * Create a Beat resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: BeatArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "beat.k8s.elastic.co/v1beta1";
            resourceInputs["kind"] = "Beat";
            resourceInputs["metadata"] = args ? args.metadata : undefined;
            resourceInputs["spec"] = args ? args.spec : undefined;
            resourceInputs["status"] = args ? args.status : undefined;
        } else {
            resourceInputs["apiVersion"] = undefined /*out*/;
            resourceInputs["kind"] = undefined /*out*/;
            resourceInputs["metadata"] = undefined /*out*/;
            resourceInputs["spec"] = undefined /*out*/;
            resourceInputs["status"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(Beat.__pulumiType, name, resourceInputs, opts);
    }
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