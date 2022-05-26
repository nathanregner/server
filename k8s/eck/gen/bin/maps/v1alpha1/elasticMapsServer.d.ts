import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import { ObjectMeta } from "../../meta/v1";
/**
 * ElasticMapsServer represents an Elastic Map Server resource in a Kubernetes cluster.
 */
export declare class ElasticMapsServer extends pulumi.CustomResource {
    /**
     * Get an existing ElasticMapsServer resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): ElasticMapsServer;
    /**
     * Returns true if the given object is an instance of ElasticMapsServer.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    static isInstance(obj: any): obj is ElasticMapsServer;
    readonly apiVersion: pulumi.Output<"maps.k8s.elastic.co/v1alpha1" | undefined>;
    readonly kind: pulumi.Output<"ElasticMapsServer" | undefined>;
    readonly metadata: pulumi.Output<ObjectMeta | undefined>;
    /**
     * MapsSpec holds the specification of an Elastic Maps Server instance.
     */
    readonly spec: pulumi.Output<outputs.maps.v1alpha1.ElasticMapsServerSpec | undefined>;
    /**
     * MapsStatus defines the observed state of Elastic Maps Server
     */
    readonly status: pulumi.Output<outputs.maps.v1alpha1.ElasticMapsServerStatus | undefined>;
    /**
     * Create a ElasticMapsServer resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: ElasticMapsServerArgs, opts?: pulumi.CustomResourceOptions);
}
/**
 * The set of arguments for constructing a ElasticMapsServer resource.
 */
export interface ElasticMapsServerArgs {
    apiVersion?: pulumi.Input<"maps.k8s.elastic.co/v1alpha1">;
    kind?: pulumi.Input<"ElasticMapsServer">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * MapsSpec holds the specification of an Elastic Maps Server instance.
     */
    spec?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecArgs>;
    /**
     * MapsStatus defines the observed state of Elastic Maps Server
     */
    status?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerStatusArgs>;
}
