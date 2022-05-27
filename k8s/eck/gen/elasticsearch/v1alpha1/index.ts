// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

// Export members:
export * from "./elasticsearch";

// Import resources to register:
import { Elasticsearch } from "./elasticsearch";

const _module = {
    version: utilities.getVersion(),
    construct: (name: string, type: string, urn: string): pulumi.Resource => {
        switch (type) {
            case "kubernetes:elasticsearch.k8s.elastic.co/v1alpha1:Elasticsearch":
                return new Elasticsearch(name, <any>undefined, { urn })
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    },
};
pulumi.runtime.registerResourceModule("eck", "elasticsearch.k8s.elastic.co/v1alpha1", _module)