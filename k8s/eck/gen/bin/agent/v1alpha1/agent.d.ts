import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import { ObjectMeta } from "../../meta/v1";
/**
 * Agent is the Schema for the Agents API.
 */
export declare class Agent extends pulumi.CustomResource {
    /**
     * Get an existing Agent resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Agent;
    /**
     * Returns true if the given object is an instance of Agent.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    static isInstance(obj: any): obj is Agent;
    readonly apiVersion: pulumi.Output<"agent.k8s.elastic.co/v1alpha1" | undefined>;
    readonly kind: pulumi.Output<"Agent" | undefined>;
    readonly metadata: pulumi.Output<ObjectMeta | undefined>;
    /**
     * AgentSpec defines the desired state of the Agent
     */
    readonly spec: pulumi.Output<outputs.agent.v1alpha1.AgentSpec | undefined>;
    /**
     * AgentStatus defines the observed state of the Agent
     */
    readonly status: pulumi.Output<outputs.agent.v1alpha1.AgentStatus | undefined>;
    /**
     * Create a Agent resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: AgentArgs, opts?: pulumi.CustomResourceOptions);
}
/**
 * The set of arguments for constructing a Agent resource.
 */
export interface AgentArgs {
    apiVersion?: pulumi.Input<"agent.k8s.elastic.co/v1alpha1">;
    kind?: pulumi.Input<"Agent">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * AgentSpec defines the desired state of the Agent
     */
    spec?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecArgs>;
    /**
     * AgentStatus defines the observed state of the Agent
     */
    status?: pulumi.Input<inputs.agent.v1alpha1.AgentStatusArgs>;
}
