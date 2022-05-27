"use strict";
// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***
Object.defineProperty(exports, "__esModule", { value: true });
const pulumi = require("@pulumi/pulumi");
const utilities = require("../../utilities");
class Elasticsearch extends pulumi.CustomResource {
    /**
     * Create a Elasticsearch resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name, args, opts) {
        let resourceInputs = {};
        opts = opts || {};
        if (!opts.id) {
        }
        else {
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(Elasticsearch.__pulumiType, name, resourceInputs, opts);
    }
    /**
     * Get an existing Elasticsearch resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    static get(name, id, opts) {
        return new Elasticsearch(name, undefined, Object.assign(Object.assign({}, opts), { id: id }));
    }
    /**
     * Returns true if the given object is an instance of Elasticsearch.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    static isInstance(obj) {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === Elasticsearch.__pulumiType;
    }
}
exports.Elasticsearch = Elasticsearch;
/** @internal */
Elasticsearch.__pulumiType = 'kubernetes:elasticsearch.k8s.elastic.co/v1alpha1:Elasticsearch';
//# sourceMappingURL=elasticsearch.js.map