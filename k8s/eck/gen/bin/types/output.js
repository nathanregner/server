"use strict";
// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***
Object.defineProperty(exports, "__esModule", { value: true });
var agent;
(function (agent) {
    let v1alpha1;
    (function (v1alpha1) {
        /**
         * agentSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for AgentSpecHttpServiceSpecPorts
         */
        function agentSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1alpha1.agentSpecHttpServiceSpecPortsProvideDefaults = agentSpecHttpServiceSpecPortsProvideDefaults;
    })(v1alpha1 = agent.v1alpha1 || (agent.v1alpha1 = {}));
})(agent = exports.agent || (exports.agent = {}));
var apm;
(function (apm) {
    let v1;
    (function (v1) {
        /**
         * apmServerSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ApmServerSpecHttpServiceSpecPorts
         */
        function apmServerSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1.apmServerSpecHttpServiceSpecPortsProvideDefaults = apmServerSpecHttpServiceSpecPortsProvideDefaults;
    })(v1 = apm.v1 || (apm.v1 = {}));
    let v1beta1;
    (function (v1beta1) {
        /**
         * apmServerSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ApmServerSpecHttpServiceSpecPorts
         */
        function apmServerSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1beta1.apmServerSpecHttpServiceSpecPortsProvideDefaults = apmServerSpecHttpServiceSpecPortsProvideDefaults;
    })(v1beta1 = apm.v1beta1 || (apm.v1beta1 = {}));
})(apm = exports.apm || (exports.apm = {}));
var elasticsearch;
(function (elasticsearch) {
    let v1;
    (function (v1) {
        /**
         * elasticsearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticsearchSpecHttpServiceSpecPorts
         */
        function elasticsearchSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1.elasticsearchSpecHttpServiceSpecPortsProvideDefaults = elasticsearchSpecHttpServiceSpecPortsProvideDefaults;
        /**
         * elasticsearchSpecTransportServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticsearchSpecTransportServiceSpecPorts
         */
        function elasticsearchSpecTransportServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1.elasticsearchSpecTransportServiceSpecPortsProvideDefaults = elasticsearchSpecTransportServiceSpecPortsProvideDefaults;
    })(v1 = elasticsearch.v1 || (elasticsearch.v1 = {}));
    let v1beta1;
    (function (v1beta1) {
        /**
         * elasticsearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticsearchSpecHttpServiceSpecPorts
         */
        function elasticsearchSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1beta1.elasticsearchSpecHttpServiceSpecPortsProvideDefaults = elasticsearchSpecHttpServiceSpecPortsProvideDefaults;
    })(v1beta1 = elasticsearch.v1beta1 || (elasticsearch.v1beta1 = {}));
})(elasticsearch = exports.elasticsearch || (exports.elasticsearch = {}));
var enterprisesearch;
(function (enterprisesearch) {
    let v1;
    (function (v1) {
        /**
         * enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for EnterpriseSearchSpecHttpServiceSpecPorts
         */
        function enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1.enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults = enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults;
    })(v1 = enterprisesearch.v1 || (enterprisesearch.v1 = {}));
    let v1beta1;
    (function (v1beta1) {
        /**
         * enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for EnterpriseSearchSpecHttpServiceSpecPorts
         */
        function enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1beta1.enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults = enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults;
    })(v1beta1 = enterprisesearch.v1beta1 || (enterprisesearch.v1beta1 = {}));
})(enterprisesearch = exports.enterprisesearch || (exports.enterprisesearch = {}));
var kibana;
(function (kibana) {
    let v1;
    (function (v1) {
        /**
         * kibanaSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for KibanaSpecHttpServiceSpecPorts
         */
        function kibanaSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1.kibanaSpecHttpServiceSpecPortsProvideDefaults = kibanaSpecHttpServiceSpecPortsProvideDefaults;
    })(v1 = kibana.v1 || (kibana.v1 = {}));
    let v1beta1;
    (function (v1beta1) {
        /**
         * kibanaSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for KibanaSpecHttpServiceSpecPorts
         */
        function kibanaSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1beta1.kibanaSpecHttpServiceSpecPortsProvideDefaults = kibanaSpecHttpServiceSpecPortsProvideDefaults;
    })(v1beta1 = kibana.v1beta1 || (kibana.v1beta1 = {}));
})(kibana = exports.kibana || (exports.kibana = {}));
var maps;
(function (maps) {
    let v1alpha1;
    (function (v1alpha1) {
        /**
         * elasticMapsServerSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticMapsServerSpecHttpServiceSpecPorts
         */
        function elasticMapsServerSpecHttpServiceSpecPortsProvideDefaults(val) {
            var _a;
            return Object.assign(Object.assign({}, val), { protocol: (_a = (val.protocol), (_a !== null && _a !== void 0 ? _a : "TCP")) });
        }
        v1alpha1.elasticMapsServerSpecHttpServiceSpecPortsProvideDefaults = elasticMapsServerSpecHttpServiceSpecPortsProvideDefaults;
    })(v1alpha1 = maps.v1alpha1 || (maps.v1alpha1 = {}));
})(maps = exports.maps || (exports.maps = {}));
//# sourceMappingURL=output.js.map