// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

/**
 * Elasticsearch represents an Elasticsearch resource in a Kubernetes cluster.
 */
export class Elasticsearch extends pulumi.CustomResource {
    /**
     * Get an existing Elasticsearch resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Elasticsearch {
        return new Elasticsearch(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:elasticsearch.k8s.elastic.co/v1:Elasticsearch';

    /**
     * Returns true if the given object is an instance of Elasticsearch.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is Elasticsearch {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === Elasticsearch.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"elasticsearch.k8s.elastic.co/v1" | undefined>;
    public readonly kind!: pulumi.Output<"Elasticsearch" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
    /**
     * ElasticsearchSpec holds the specification of an Elasticsearch cluster.
     */
    public readonly spec!: pulumi.Output<outputs.elasticsearch.v1.ElasticsearchSpec | undefined>;
    /**
     * ElasticsearchStatus represents the observed state of Elasticsearch.
     */
    public readonly status!: pulumi.Output<outputs.elasticsearch.v1.ElasticsearchStatus | undefined>;

    /**
     * Create a Elasticsearch resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: ElasticsearchArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "elasticsearch.k8s.elastic.co/v1";
            resourceInputs["kind"] = "Elasticsearch";
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
        super(Elasticsearch.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * The set of arguments for constructing a Elasticsearch resource.
 */
export interface ElasticsearchArgs {
    apiVersion?: pulumi.Input<"elasticsearch.k8s.elastic.co/v1">;
    kind?: pulumi.Input<"Elasticsearch">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * ElasticsearchSpec holds the specification of an Elasticsearch cluster.
     */
    spec?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecArgs>;
    /**
     * ElasticsearchStatus represents the observed state of Elasticsearch.
     */
    status?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusArgs>;
}