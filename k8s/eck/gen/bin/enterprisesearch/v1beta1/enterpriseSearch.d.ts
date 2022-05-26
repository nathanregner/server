import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import { ObjectMeta } from "../../meta/v1";
/**
 * EnterpriseSearch is a Kubernetes CRD to represent Enterprise Search.
 */
export declare class EnterpriseSearch extends pulumi.CustomResource {
    /**
     * Get an existing EnterpriseSearch resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): EnterpriseSearch;
    /**
     * Returns true if the given object is an instance of EnterpriseSearch.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    static isInstance(obj: any): obj is EnterpriseSearch;
    readonly apiVersion: pulumi.Output<"enterprisesearch.k8s.elastic.co/v1beta1" | undefined>;
    readonly kind: pulumi.Output<"EnterpriseSearch" | undefined>;
    readonly metadata: pulumi.Output<ObjectMeta | undefined>;
    /**
     * EnterpriseSearchSpec holds the specification of an Enterprise Search resource.
     */
    readonly spec: pulumi.Output<outputs.enterprisesearch.v1beta1.EnterpriseSearchSpec | undefined>;
    /**
     * EnterpriseSearchStatus defines the observed state of EnterpriseSearch
     */
    readonly status: pulumi.Output<outputs.enterprisesearch.v1beta1.EnterpriseSearchStatus | undefined>;
    /**
     * Create a EnterpriseSearch resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: EnterpriseSearchArgs, opts?: pulumi.CustomResourceOptions);
}
/**
 * The set of arguments for constructing a EnterpriseSearch resource.
 */
export interface EnterpriseSearchArgs {
    apiVersion?: pulumi.Input<"enterprisesearch.k8s.elastic.co/v1beta1">;
    kind?: pulumi.Input<"EnterpriseSearch">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * EnterpriseSearchSpec holds the specification of an Enterprise Search resource.
     */
    spec?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecArgs>;
    /**
     * EnterpriseSearchStatus defines the observed state of EnterpriseSearch
     */
    status?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchStatusArgs>;
}
