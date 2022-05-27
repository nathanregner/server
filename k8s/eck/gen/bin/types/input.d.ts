import * as pulumi from "@pulumi/pulumi";
import { input as inputs } from "../types";
export declare namespace agent {
    namespace v1alpha1 {
        /**
         * AgentSpec defines the desired state of the Agent
         */
        interface AgentSpecArgs {
            /**
             * Config holds the Agent configuration. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Agent configuration. Agent settings must be specified as yaml, under a single "agent.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            configRef?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecConfigRefArgs>;
            /**
             * DaemonSet specifies the Agent should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`.
             */
            daemonSet?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecDaemonSetArgs>;
            /**
             * Deployment specifies the Agent should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`.
             */
            deployment?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecDeploymentArgs>;
            /**
             * ElasticsearchRefs is a reference to a list of Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single ES cluster is currently supported.
             */
            elasticsearchRefs?: pulumi.Input<pulumi.Input<inputs.agent.v1alpha1.AgentSpecElasticsearchRefsArgs>[]>;
            /**
             * FleetServerEnabled determines whether this Agent will launch Fleet Server. Don't set unless `mode` is set to `fleet`.
             */
            fleetServerEnabled?: pulumi.Input<boolean>;
            /**
             * FleetServerRef is a reference to Fleet Server that this Agent should connect to to obtain it's configuration. Don't set unless `mode` is set to `fleet`.
             */
            fleetServerRef?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecFleetServerRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for the Agent in Fleet mode with Fleet Server enabled.
             */
            http?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpArgs>;
            /**
             * Image is the Agent Docker image to deploy. Version has to match the Agent in the image.
             */
            image?: pulumi.Input<string>;
            /**
             * KibanaRef is a reference to Kibana where Fleet should be set up and this Agent should be enrolled. Don't set unless `mode` is set to `fleet`.
             */
            kibanaRef?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecKibanaRefArgs>;
            /**
             * Mode specifies the source of configuration for the Agent. The configuration can be specified locally through `config` or `configRef` (`standalone` mode), or come from Fleet during runtime (`fleet` mode). Defaults to `standalone` mode.
             */
            mode?: pulumi.Input<string>;
            /**
             * SecureSettings is a list of references to Kubernetes Secrets containing sensitive configuration options for the Agent. Secrets data can be then referenced in the Agent config using the Secret's keys or as specified in `Entries` field of each SecureSetting.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.agent.v1alpha1.AgentSpecSecureSettingsArgs>[]>;
            /**
             * ServiceAccountName is used to check access from the current resource to an Elasticsearch resource in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Version of the Agent.
             */
            version: pulumi.Input<string>;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Agent configuration. Agent settings must be specified as yaml, under a single "agent.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
         */
        interface AgentSpecConfigRefArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * DaemonSet specifies the Agent should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`.
         */
        interface AgentSpecDaemonSetArgs {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
             */
            updateStrategy?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecDaemonSetUpdateStrategyArgs>;
        }
        /**
         * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
         */
        interface AgentSpecDaemonSetUpdateStrategyArgs {
            /**
             * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
             */
            rollingUpdate?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecDaemonSetUpdateStrategyRollingUpdateArgs>;
            /**
             * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
             */
            type?: pulumi.Input<string>;
        }
        /**
         * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
         */
        interface AgentSpecDaemonSetUpdateStrategyRollingUpdateArgs {
            /**
             * The maximum number of nodes with an existing available DaemonSet pod that can have an updated DaemonSet pod during during an update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up to a minimum of 1. Default value is 0. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their a new pod created before the old pod is marked as deleted. The update starts by launching new pods on 30% of nodes. Once an updated pod is available (Ready for at least minReadySeconds) the old DaemonSet pod on that node is marked deleted. If the old pod becomes unavailable for any reason (Ready transitions to false, is evicted, or is drained) an updated pod is immediatedly created on that node without considering surge limits. Allowing surge implies the possibility that the resources consumed by the daemonset on any given node can double if the readiness check fails, and so resource intensive daemonsets should take into account that they may cause evictions during disruption. This is beta field and enabled/disabled by DaemonSetUpdateSurge feature gate.
             */
            maxSurge?: pulumi.Input<number | string>;
            /**
             * The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0 if MaxSurge is 0 Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.
             */
            maxUnavailable?: pulumi.Input<number | string>;
        }
        /**
         * Deployment specifies the Agent should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`.
         */
        interface AgentSpecDeploymentArgs {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            replicas?: pulumi.Input<number>;
            /**
             * DeploymentStrategy describes how to replace existing pods with new ones.
             */
            strategy?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecDeploymentStrategyArgs>;
        }
        /**
         * DeploymentStrategy describes how to replace existing pods with new ones.
         */
        interface AgentSpecDeploymentStrategyArgs {
            /**
             * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
             */
            rollingUpdate?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecDeploymentStrategyRollingUpdateArgs>;
            /**
             * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
             */
            type?: pulumi.Input<string>;
        }
        /**
         * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
         */
        interface AgentSpecDeploymentStrategyRollingUpdateArgs {
            /**
             * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. Defaults to 25%. Example: when this is set to 30%, the new ReplicaSet can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new ReplicaSet can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
             */
            maxSurge?: pulumi.Input<number | string>;
            /**
             * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. Defaults to 25%. Example: when this is set to 30%, the old ReplicaSet can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old ReplicaSet can be scaled down further, followed by scaling up the new ReplicaSet, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
             */
            maxUnavailable?: pulumi.Input<number | string>;
        }
        interface AgentSpecElasticsearchRefsArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            outputName?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * FleetServerRef is a reference to Fleet Server that this Agent should connect to to obtain it's configuration. Don't set unless `mode` is set to `fleet`.
         */
        interface AgentSpecFleetServerRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for the Agent in Fleet mode with Fleet Server enabled.
         */
        interface AgentSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface AgentSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface AgentSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface AgentSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface AgentSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * agentSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for AgentSpecHttpServiceSpecPortsArgs
         */
        function agentSpecHttpServiceSpecPortsArgsProvideDefaults(val: AgentSpecHttpServiceSpecPortsArgs): AgentSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface AgentSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface AgentSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface AgentSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface AgentSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface AgentSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.agent.v1alpha1.AgentSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface AgentSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * KibanaRef is a reference to Kibana where Fleet should be set up and this Agent should be enrolled. Don't set unless `mode` is set to `fleet`.
         */
        interface AgentSpecKibanaRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface AgentSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.agent.v1alpha1.AgentSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface AgentSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * AgentStatus defines the observed state of the Agent
         */
        interface AgentStatusArgs {
            availableNodes?: pulumi.Input<number>;
            /**
             * AssociationStatusMap is the map of association's namespaced name string to its AssociationStatus. For resources that have a single Association of a given type (for ex. single ES reference), this map contains a single entry.
             */
            elasticsearchAssociationsStatus?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            expectedNodes?: pulumi.Input<number>;
            /**
             * AssociationStatus is the status of an association resource.
             */
            fleetServerAssociationStatus?: pulumi.Input<string>;
            health?: pulumi.Input<string>;
            /**
             * AssociationStatus is the status of an association resource.
             */
            kibanaAssociationStatus?: pulumi.Input<string>;
            /**
             * ObservedGeneration is the most recent generation observed for this Elastic Agent. It corresponds to the metadata generation, which is updated on mutation by the API Server. If the generation observed in status diverges from the generation in metadata, the Elastic Agent controller has not yet processed the changes contained in the Elastic Agent specification.
             */
            observedGeneration?: pulumi.Input<number>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
    }
}
export declare namespace apm {
    namespace v1 {
        /**
         * ApmServerSpec holds the specification of an APM Server.
         */
        interface ApmServerSpecArgs {
            /**
             * Config holds the APM Server configuration. See: https://www.elastic.co/guide/en/apm/server/current/configuring-howto-apm-server.html
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * Count of APM Server instances to deploy.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.apm.v1.ApmServerSpecElasticsearchRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for the APM Server resource.
             */
            http?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpArgs>;
            /**
             * Image is the APM Server Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows APM agent central configuration management in Kibana.
             */
            kibanaRef?: pulumi.Input<inputs.apm.v1.ApmServerSpecKibanaRefArgs>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the APM Server pods.
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for APM Server.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.apm.v1.ApmServerSpecSecureSettingsArgs>[]>;
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Version of the APM Server.
             */
            version: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface ApmServerSpecElasticsearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for the APM Server resource.
         */
        interface ApmServerSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ApmServerSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ApmServerSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ApmServerSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.apm.v1.ApmServerSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ApmServerSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * apmServerSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for ApmServerSpecHttpServiceSpecPortsArgs
         */
        function apmServerSpecHttpServiceSpecPortsArgsProvideDefaults(val: ApmServerSpecHttpServiceSpecPortsArgs): ApmServerSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ApmServerSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.apm.v1.ApmServerSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ApmServerSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.apm.v1.ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows APM agent central configuration management in Kibana.
         */
        interface ApmServerSpecKibanaRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ApmServerSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.apm.v1.ApmServerSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ApmServerSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * ApmServerStatus defines the observed state of ApmServer
         */
        interface ApmServerStatusArgs {
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: pulumi.Input<number>;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchAssociationStatus is the status of any auto-linking to Elasticsearch clusters.
             */
            elasticsearchAssociationStatus?: pulumi.Input<string>;
            /**
             * Health of the deployment.
             */
            health?: pulumi.Input<string>;
            /**
             * KibanaAssociationStatus is the status of any auto-linking to Kibana.
             */
            kibanaAssociationStatus?: pulumi.Input<string>;
            /**
             * SecretTokenSecretName is the name of the Secret that contains the secret token
             */
            secretTokenSecret?: pulumi.Input<string>;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: pulumi.Input<string>;
            /**
             * ExternalService is the name of the service the agents should connect to.
             */
            service?: pulumi.Input<string>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
    }
    namespace v1beta1 {
        /**
         * ApmServerSpec holds the specification of an APM Server.
         */
        interface ApmServerSpecArgs {
            /**
             * Config holds the APM Server configuration. See: https://www.elastic.co/guide/en/apm/server/current/configuring-howto-apm-server.html
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * Count of APM Server instances to deploy.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecElasticsearchRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for the APM Server resource.
             */
            http?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpArgs>;
            /**
             * Image is the APM Server Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the APM Server pods.
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for APM Server.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.apm.v1beta1.ApmServerSpecSecureSettingsArgs>[]>;
            /**
             * Version of the APM Server.
             */
            version?: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface ApmServerSpecElasticsearchRefArgs {
            /**
             * Name of the Kubernetes object.
             */
            name: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for the APM Server resource.
         */
        interface ApmServerSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ApmServerSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ApmServerSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ApmServerSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ApmServerSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * apmServerSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for ApmServerSpecHttpServiceSpecPortsArgs
         */
        function apmServerSpecHttpServiceSpecPortsArgsProvideDefaults(val: ApmServerSpecHttpServiceSpecPortsArgs): ApmServerSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ApmServerSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ApmServerSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.apm.v1beta1.ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ApmServerSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.apm.v1beta1.ApmServerSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ApmServerSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * ApmServerStatus defines the observed state of ApmServer
         */
        interface ApmServerStatusArgs {
            /**
             * Association is the status of any auto-linking to Elasticsearch clusters.
             */
            associationStatus?: pulumi.Input<string>;
            availableNodes?: pulumi.Input<number>;
            /**
             * ApmServerHealth expresses the status of the Apm Server instances.
             */
            health?: pulumi.Input<string>;
            /**
             * SecretTokenSecretName is the name of the Secret that contains the secret token
             */
            secretTokenSecret?: pulumi.Input<string>;
            /**
             * ExternalService is the name of the service the agents should connect to.
             */
            service?: pulumi.Input<string>;
        }
    }
}
export declare namespace beat {
    namespace v1beta1 {
        /**
         * BeatSpec defines the desired state of a Beat.
         */
        interface BeatSpecArgs {
            /**
             * Config holds the Beat configuration. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Beat configuration. Beat settings must be specified as yaml, under a single "beat.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            configRef?: pulumi.Input<inputs.beat.v1beta1.BeatSpecConfigRefArgs>;
            /**
             * DaemonSet specifies the Beat should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`. If both are absent a default for the Type is used.
             */
            daemonSet?: pulumi.Input<inputs.beat.v1beta1.BeatSpecDaemonSetArgs>;
            /**
             * Deployment specifies the Beat should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`. If both are absent a default for the Type is used.
             */
            deployment?: pulumi.Input<inputs.beat.v1beta1.BeatSpecDeploymentArgs>;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.beat.v1beta1.BeatSpecElasticsearchRefArgs>;
            /**
             * Image is the Beat Docker image to deploy. Version and Type have to match the Beat in the image.
             */
            image?: pulumi.Input<string>;
            /**
             * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows automatic setup of dashboards and visualizations.
             */
            kibanaRef?: pulumi.Input<inputs.beat.v1beta1.BeatSpecKibanaRefArgs>;
            /**
             * SecureSettings is a list of references to Kubernetes Secrets containing sensitive configuration options for the Beat. Secrets data can be then referenced in the Beat config using the Secret's keys or as specified in `Entries` field of each SecureSetting.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.beat.v1beta1.BeatSpecSecureSettingsArgs>[]>;
            /**
             * ServiceAccountName is used to check access from the current resource to Elasticsearch resource in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Type is the type of the Beat to deploy (filebeat, metricbeat, heartbeat, auditbeat, journalbeat, packetbeat, and so on). Any string can be used, but well-known types will have the image field defaulted and have the appropriate Elasticsearch roles created automatically. It also allows for dashboard setup when combined with a `KibanaRef`.
             */
            type: pulumi.Input<string>;
            /**
             * Version of the Beat.
             */
            version: pulumi.Input<string>;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Beat configuration. Beat settings must be specified as yaml, under a single "beat.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
         */
        interface BeatSpecConfigRefArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * DaemonSet specifies the Beat should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`. If both are absent a default for the Type is used.
         */
        interface BeatSpecDaemonSetArgs {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
             */
            updateStrategy?: pulumi.Input<inputs.beat.v1beta1.BeatSpecDaemonSetUpdateStrategyArgs>;
        }
        /**
         * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
         */
        interface BeatSpecDaemonSetUpdateStrategyArgs {
            /**
             * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
             */
            rollingUpdate?: pulumi.Input<inputs.beat.v1beta1.BeatSpecDaemonSetUpdateStrategyRollingUpdateArgs>;
            /**
             * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
             */
            type?: pulumi.Input<string>;
        }
        /**
         * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
         */
        interface BeatSpecDaemonSetUpdateStrategyRollingUpdateArgs {
            /**
             * The maximum number of nodes with an existing available DaemonSet pod that can have an updated DaemonSet pod during during an update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up to a minimum of 1. Default value is 0. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their a new pod created before the old pod is marked as deleted. The update starts by launching new pods on 30% of nodes. Once an updated pod is available (Ready for at least minReadySeconds) the old DaemonSet pod on that node is marked deleted. If the old pod becomes unavailable for any reason (Ready transitions to false, is evicted, or is drained) an updated pod is immediatedly created on that node without considering surge limits. Allowing surge implies the possibility that the resources consumed by the daemonset on any given node can double if the readiness check fails, and so resource intensive daemonsets should take into account that they may cause evictions during disruption. This is beta field and enabled/disabled by DaemonSetUpdateSurge feature gate.
             */
            maxSurge?: pulumi.Input<number | string>;
            /**
             * The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0 if MaxSurge is 0 Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.
             */
            maxUnavailable?: pulumi.Input<number | string>;
        }
        /**
         * Deployment specifies the Beat should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`. If both are absent a default for the Type is used.
         */
        interface BeatSpecDeploymentArgs {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            replicas?: pulumi.Input<number>;
            /**
             * DeploymentStrategy describes how to replace existing pods with new ones.
             */
            strategy?: pulumi.Input<inputs.beat.v1beta1.BeatSpecDeploymentStrategyArgs>;
        }
        /**
         * DeploymentStrategy describes how to replace existing pods with new ones.
         */
        interface BeatSpecDeploymentStrategyArgs {
            /**
             * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
             */
            rollingUpdate?: pulumi.Input<inputs.beat.v1beta1.BeatSpecDeploymentStrategyRollingUpdateArgs>;
            /**
             * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
             */
            type?: pulumi.Input<string>;
        }
        /**
         * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
         */
        interface BeatSpecDeploymentStrategyRollingUpdateArgs {
            /**
             * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. Defaults to 25%. Example: when this is set to 30%, the new ReplicaSet can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new ReplicaSet can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
             */
            maxSurge?: pulumi.Input<number | string>;
            /**
             * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. Defaults to 25%. Example: when this is set to 30%, the old ReplicaSet can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old ReplicaSet can be scaled down further, followed by scaling up the new ReplicaSet, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
             */
            maxUnavailable?: pulumi.Input<number | string>;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface BeatSpecElasticsearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows automatic setup of dashboards and visualizations.
         */
        interface BeatSpecKibanaRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface BeatSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.beat.v1beta1.BeatSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface BeatSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * BeatStatus defines the observed state of a Beat.
         */
        interface BeatStatusArgs {
            availableNodes?: pulumi.Input<number>;
            /**
             * AssociationStatus is the status of an association resource.
             */
            elasticsearchAssociationStatus?: pulumi.Input<string>;
            expectedNodes?: pulumi.Input<number>;
            health?: pulumi.Input<string>;
            /**
             * AssociationStatus is the status of an association resource.
             */
            kibanaAssociationStatus?: pulumi.Input<string>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
    }
}
export declare namespace elasticsearch {
    namespace v1 {
        /**
         * ElasticsearchSpec holds the specification of an Elasticsearch cluster.
         */
        interface ElasticsearchSpecArgs {
            /**
             * Auth contains user authentication and authorization security settings for Elasticsearch.
             */
            auth?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecAuthArgs>;
            /**
             * HTTP holds HTTP layer settings for Elasticsearch.
             */
            http?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpArgs>;
            /**
             * Image is the Elasticsearch Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * Monitoring enables you to collect and ship log and monitoring data of this Elasticsearch cluster. See https://www.elastic.co/guide/en/elasticsearch/reference/current/monitor-elasticsearch-cluster.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
             */
            monitoring?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecMonitoringArgs>;
            /**
             * NodeSets allow specifying groups of Elasticsearch nodes sharing the same configuration and Pod templates.
             */
            nodeSets: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsArgs>[]>;
            /**
             * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
             */
            podDisruptionBudget?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetArgs>;
            /**
             * RemoteClusters enables you to establish uni-directional connections to a remote Elasticsearch cluster.
             */
            remoteClusters?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecRemoteClustersArgs>[]>;
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Elasticsearch.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecSecureSettingsArgs>[]>;
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. a remote Elasticsearch cluster) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Transport holds transport layer settings for Elasticsearch.
             */
            transport?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportArgs>;
            /**
             * UpdateStrategy specifies how updates to the cluster should be performed.
             */
            updateStrategy?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecUpdateStrategyArgs>;
            /**
             * Version of Elasticsearch.
             */
            version: pulumi.Input<string>;
            /**
             * VolumeClaimDeletePolicy sets the policy for handling deletion of PersistentVolumeClaims for all NodeSets. Possible values are DeleteOnScaledownOnly and DeleteOnScaledownAndClusterDeletion. Defaults to DeleteOnScaledownAndClusterDeletion.
             */
            volumeClaimDeletePolicy?: pulumi.Input<string>;
        }
        /**
         * Auth contains user authentication and authorization security settings for Elasticsearch.
         */
        interface ElasticsearchSpecAuthArgs {
            /**
             * FileRealm to propagate to the Elasticsearch cluster.
             */
            fileRealm?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecAuthFileRealmArgs>[]>;
            /**
             * Roles to propagate to the Elasticsearch cluster.
             */
            roles?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecAuthRolesArgs>[]>;
        }
        /**
         * FileRealmSource references users to create in the Elasticsearch cluster.
         */
        interface ElasticsearchSpecAuthFileRealmArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * RoleSource references roles to create in the Elasticsearch cluster.
         */
        interface ElasticsearchSpecAuthRolesArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * HTTP holds HTTP layer settings for Elasticsearch.
         */
        interface ElasticsearchSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticsearchSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticsearchSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticsearchSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * elasticsearchSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for ElasticsearchSpecHttpServiceSpecPortsArgs
         */
        function elasticsearchSpecHttpServiceSpecPortsArgsProvideDefaults(val: ElasticsearchSpecHttpServiceSpecPortsArgs): ElasticsearchSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ElasticsearchSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ElasticsearchSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * Monitoring enables you to collect and ship log and monitoring data of this Elasticsearch cluster. See https://www.elastic.co/guide/en/elasticsearch/reference/current/monitor-elasticsearch-cluster.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
         */
        interface ElasticsearchSpecMonitoringArgs {
            /**
             * Logs holds references to Elasticsearch clusters which receive log data from this Elasticsearch cluster.
             */
            logs?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecMonitoringLogsArgs>;
            /**
             * Metrics holds references to Elasticsearch clusters which receive monitoring data from this Elasticsearch cluster.
             */
            metrics?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecMonitoringMetricsArgs>;
        }
        /**
         * Logs holds references to Elasticsearch clusters which receive log data from this Elasticsearch cluster.
         */
        interface ElasticsearchSpecMonitoringLogsArgs {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecMonitoringLogsElasticsearchRefsArgs>[]>;
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface ElasticsearchSpecMonitoringLogsElasticsearchRefsArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * Metrics holds references to Elasticsearch clusters which receive monitoring data from this Elasticsearch cluster.
         */
        interface ElasticsearchSpecMonitoringMetricsArgs {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecMonitoringMetricsElasticsearchRefsArgs>[]>;
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface ElasticsearchSpecMonitoringMetricsElasticsearchRefsArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * NodeSet is the specification for a group of Elasticsearch nodes sharing the same configuration and a Pod template.
         */
        interface ElasticsearchSpecNodeSetsArgs {
            /**
             * Config holds the Elasticsearch configuration.
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * Count of Elasticsearch nodes to deploy. If the node set is managed by an autoscaling policy the initial value is automatically set by the autoscaling controller.
             */
            count?: pulumi.Input<number>;
            /**
             * Name of this set of nodes. Becomes a part of the Elasticsearch node.name setting.
             */
            name: pulumi.Input<string>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Pods belonging to this NodeSet.
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * VolumeClaimTemplates is a list of persistent volume claims to be used by each Pod in this NodeSet. Every claim in this list must have a matching volumeMount in one of the containers defined in the PodTemplate. Items defined here take precedence over any default claims added by the operator with the same name.
             */
            volumeClaimTemplates?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesArgs>[]>;
        }
        /**
         * PersistentVolumeClaim is a user's request for and claim to a persistent volume
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesArgs {
            /**
             * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
             */
            apiVersion?: pulumi.Input<string>;
            /**
             * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
             */
            kind?: pulumi.Input<string>;
            /**
             * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
             */
            metadata?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadataArgs>;
            /**
             * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            spec?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecArgs>;
            /**
             * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            status?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusArgs>;
        }
        /**
         * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecArgs {
            /**
             * AccessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
             */
            dataSource?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceArgs>;
            /**
             * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
             */
            dataSourceRef?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRefArgs>;
            /**
             * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
             */
            resources?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResourcesArgs>;
            /**
             * A label query over volumes to consider for binding.
             */
            selector?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorArgs>;
            /**
             * Name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
             */
            storageClassName?: pulumi.Input<string>;
            /**
             * volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec.
             */
            volumeMode?: pulumi.Input<string>;
            /**
             * VolumeName is the binding reference to the PersistentVolume backing this claim.
             */
            volumeName?: pulumi.Input<string>;
        }
        /**
         * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceArgs {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: pulumi.Input<string>;
            /**
             * Kind is the type of resource being referenced
             */
            kind: pulumi.Input<string>;
            /**
             * Name is the name of resource being referenced
             */
            name: pulumi.Input<string>;
        }
        /**
         * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRefArgs {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: pulumi.Input<string>;
            /**
             * Kind is the type of resource being referenced
             */
            kind: pulumi.Input<string>;
            /**
             * Name is the name of resource being referenced
             */
            name: pulumi.Input<string>;
        }
        /**
         * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResourcesArgs {
            /**
             * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            limits?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
            /**
             * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            requests?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
        }
        /**
         * A label query over volumes to consider for binding.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorArgs {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressionsArgs>[]>;
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressionsArgs {
            /**
             * key is the label key that the selector applies to.
             */
            key: pulumi.Input<string>;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: pulumi.Input<string>;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: pulumi.Input<pulumi.Input<string>[]>;
        }
        /**
         * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusArgs {
            /**
             * AccessModes contains the actual access modes the volume backing the PVC has. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The storage resource within AllocatedResources tracks the capacity allocated to a PVC. It may be larger than the actual capacity when a volume expansion operation is requested. For storage quota, the larger value from allocatedResources and PVC.spec.resources is used. If allocatedResources is not set, PVC.spec.resources alone is used for quota calculation. If a volume expansion capacity request is lowered, allocatedResources is only lowered if there are no expansion operations in progress and if the actual volume capacity is equal or lower than the requested capacity. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            allocatedResources?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
            /**
             * Represents the actual resources of the underlying volume.
             */
            capacity?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
            /**
             * Current Condition of persistent volume claim. If underlying persistent volume is being resized then the Condition will be set to 'ResizeStarted'.
             */
            conditions?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditionsArgs>[]>;
            /**
             * Phase represents the current phase of PersistentVolumeClaim.
             */
            phase?: pulumi.Input<string>;
            /**
             * ResizeStatus stores status of resize operation. ResizeStatus is not set by default but when expansion is complete resizeStatus is set to empty string by resize controller or kubelet. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            resizeStatus?: pulumi.Input<string>;
        }
        /**
         * PersistentVolumeClaimCondition contails details about state of pvc
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditionsArgs {
            /**
             * Last time we probed the condition.
             */
            lastProbeTime?: pulumi.Input<string>;
            /**
             * Last time the condition transitioned from one status to another.
             */
            lastTransitionTime?: pulumi.Input<string>;
            /**
             * Human-readable message indicating details about last transition.
             */
            message?: pulumi.Input<string>;
            /**
             * Unique, this should be a short, machine understandable string that gives the reason for condition's last transition. If it reports "ResizeStarted" that means the underlying persistent volume is being resized.
             */
            reason?: pulumi.Input<string>;
            status: pulumi.Input<string>;
            /**
             * PersistentVolumeClaimConditionType is a valid value of PersistentVolumeClaimCondition.Type
             */
            type: pulumi.Input<string>;
        }
        /**
         * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
         */
        interface ElasticsearchSpecPodDisruptionBudgetArgs {
            /**
             * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetMetadataArgs>;
            /**
             * Spec is the specification of the PDB.
             */
            spec?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecPodDisruptionBudgetMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the PDB.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecArgs {
            /**
             * An eviction is allowed if at most "maxUnavailable" pods selected by "selector" are unavailable after the eviction, i.e. even in absence of the evicted pod. For example, one can prevent all voluntary evictions by specifying 0. This is a mutually exclusive setting with "minAvailable".
             */
            maxUnavailable?: pulumi.Input<number | string>;
            /**
             * An eviction is allowed if at least "minAvailable" pods selected by "selector" will still be available after the eviction, i.e. even in the absence of the evicted pod.  So for example you can prevent all voluntary evictions by specifying "100%".
             */
            minAvailable?: pulumi.Input<number | string>;
            /**
             * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
             */
            selector?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetSpecSelectorArgs>;
        }
        /**
         * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelectorArgs {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressionsArgs>[]>;
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressionsArgs {
            /**
             * key is the label key that the selector applies to.
             */
            key: pulumi.Input<string>;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: pulumi.Input<string>;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: pulumi.Input<pulumi.Input<string>[]>;
        }
        /**
         * RemoteCluster declares a remote Elasticsearch cluster connection.
         */
        interface ElasticsearchSpecRemoteClustersArgs {
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running within the same k8s cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecRemoteClustersElasticsearchRefArgs>;
            /**
             * Name is the name of the remote cluster as it is set in the Elasticsearch settings. The name is expected to be unique for each remote clusters.
             */
            name: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running within the same k8s cluster.
         */
        interface ElasticsearchSpecRemoteClustersElasticsearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ElasticsearchSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ElasticsearchSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * Transport holds transport layer settings for Elasticsearch.
         */
        interface ElasticsearchSpecTransportArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportServiceArgs>;
            /**
             * TLS defines options for configuring TLS on the transport layer.
             */
            tls?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticsearchSpecTransportServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecTransportServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticsearchSpecTransportServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticsearchSpecTransportServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * elasticsearchSpecTransportServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for ElasticsearchSpecTransportServiceSpecPortsArgs
         */
        function elasticsearchSpecTransportServiceSpecPortsArgsProvideDefaults(val: ElasticsearchSpecTransportServiceSpecPortsArgs): ElasticsearchSpecTransportServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticsearchSpecTransportServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticsearchSpecTransportServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS on the transport layer.
         */
        interface ElasticsearchSpecTransportTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the CA certificate and private key for generating node certificates. The referenced secret should contain the following:
             *  - `ca.crt`: The CA certificate in PEM format. - `ca.key`: The private key for the CA certificate in PEM format.
             */
            certificate?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportTlsCertificateArgs>;
            /**
             * OtherNameSuffix when defined will be prefixed with the Pod name and used as the common name, and the first DNSName, as well as an OtherName required by Elasticsearch in the Subject Alternative Name extension of each Elasticsearch node's transport TLS certificate. Example: if set to "node.cluster.local", the generated certificate will have its otherName set to "<pod_name>.node.cluster.local".
             */
            otherNameSuffix?: pulumi.Input<string>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated node transport TLS certificates.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecTransportTlsSubjectAltNamesArgs>[]>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the CA certificate and private key for generating node certificates. The referenced secret should contain the following:
         *  - `ca.crt`: The CA certificate in PEM format. - `ca.key`: The private key for the CA certificate in PEM format.
         */
        interface ElasticsearchSpecTransportTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticsearchSpecTransportTlsSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * UpdateStrategy specifies how updates to the cluster should be performed.
         */
        interface ElasticsearchSpecUpdateStrategyArgs {
            /**
             * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
             */
            changeBudget?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchSpecUpdateStrategyChangeBudgetArgs>;
        }
        /**
         * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
         */
        interface ElasticsearchSpecUpdateStrategyChangeBudgetArgs {
            /**
             * MaxSurge is the maximum number of new pods that can be created exceeding the original number of pods defined in the specification. MaxSurge is only taken into consideration when scaling up. Setting a negative value will disable the restriction. Defaults to unbounded if not specified.
             */
            maxSurge?: pulumi.Input<number>;
            /**
             * MaxUnavailable is the maximum number of pods that can be unavailable (not ready) during the update due to circumstances under the control of the operator. Setting a negative value will disable this restriction. Defaults to 1 if not specified.
             */
            maxUnavailable?: pulumi.Input<number>;
        }
        /**
         * ElasticsearchStatus represents the observed state of Elasticsearch.
         */
        interface ElasticsearchStatusArgs {
            /**
             * AvailableNodes is the number of available instances.
             */
            availableNodes?: pulumi.Input<number>;
            /**
             * Conditions holds the current service state of an Elasticsearch cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            conditions?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusConditionsArgs>[]>;
            /**
             * ElasticsearchHealth is the health of the cluster as returned by the health API.
             */
            health?: pulumi.Input<string>;
            /**
             * InProgressOperations represents changes being applied by the operator to the Elasticsearch cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            inProgressOperations?: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsArgs>;
            /**
             * AssociationStatusMap is the map of association's namespaced name string to its AssociationStatus. For resources that have a single Association of a given type (for ex. single ES reference), this map contains a single entry.
             */
            monitoringAssociationStatus?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * ObservedGeneration is the most recent generation observed for this Elasticsearch cluster. It corresponds to the metadata generation, which is updated on mutation by the API Server. If the generation observed in status diverges from the generation in metadata, the Elasticsearch controller has not yet processed the changes contained in the Elasticsearch specification.
             */
            observedGeneration?: pulumi.Input<number>;
            /**
             * ElasticsearchOrchestrationPhase is the phase Elasticsearch is in from the controller point of view.
             */
            phase?: pulumi.Input<string>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
        /**
         * Condition represents Elasticsearch resource's condition. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusConditionsArgs {
            lastTransitionTime?: pulumi.Input<string>;
            message?: pulumi.Input<string>;
            status: pulumi.Input<string>;
            /**
             * ConditionType defines the condition of an Elasticsearch resource.
             */
            type: pulumi.Input<string>;
        }
        /**
         * InProgressOperations represents changes being applied by the operator to the Elasticsearch cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsArgs {
            /**
             * DownscaleOperation provides details about in progress downscale operations. **This API is in technical preview and may be changed or removed in a future release.**
             */
            downscale: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsDownscaleArgs>;
            /**
             * UpgradeOperation provides an overview of the pending or in progress changes applied by the operator to update the Elasticsearch nodes in the cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            upgrade: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpgradeArgs>;
            /**
             * UpscaleOperation provides an overview of in progress changes applied by the operator to add Elasticsearch nodes to the cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            upscale: pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpscaleArgs>;
        }
        /**
         * DownscaleOperation provides details about in progress downscale operations. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsDownscaleArgs {
            lastUpdatedTime?: pulumi.Input<string>;
            /**
             * Nodes which are scheduled to be removed from the cluster.
             */
            nodes?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsDownscaleNodesArgs>[]>;
            /**
             * Stalled represents a state where no progress can be made. It is only available for clusters managed with the Elasticsearch shutdown API.
             */
            stalled?: pulumi.Input<boolean>;
        }
        /**
         * DownscaledNode provides an overview of in progress changes applied by the operator to remove Elasticsearch nodes from the cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsDownscaleNodesArgs {
            /**
             * Explanation provides details about an in progress node shutdown. It is only available for clusters managed with the Elasticsearch shutdown API.
             */
            explanation?: pulumi.Input<string>;
            /**
             * Name of the Elasticsearch node that should be removed.
             */
            name: pulumi.Input<string>;
            /**
             * Shutdown status as returned by the Elasticsearch shutdown API. If the Elasticsearch shutdown API is not available, the shutdown status is then inferred from the remaining shards on the nodes, as observed by the operator.
             */
            shutdownStatus: pulumi.Input<string>;
        }
        /**
         * UpgradeOperation provides an overview of the pending or in progress changes applied by the operator to update the Elasticsearch nodes in the cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsUpgradeArgs {
            lastUpdatedTime?: pulumi.Input<string>;
            /**
             * Nodes that must be restarted for upgrade.
             */
            nodes?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpgradeNodesArgs>[]>;
        }
        /**
         * UpgradedNode provides details about the status of nodes which are expected to be updated. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsUpgradeNodesArgs {
            /**
             * Optional message to explain why a node may not be immediately restarted for upgrade.
             */
            message?: pulumi.Input<string>;
            /**
             * Name of the Elasticsearch node that should be upgraded.
             */
            name: pulumi.Input<string>;
            /**
             * Predicate is the name of the predicate currently preventing this node from being deleted for an upgrade.
             */
            predicate?: pulumi.Input<string>;
            /**
             * Status states if the node is either in the process of being deleted for an upgrade, or blocked by a predicate or another condition stated in the message field.
             */
            status: pulumi.Input<string>;
        }
        /**
         * UpscaleOperation provides an overview of in progress changes applied by the operator to add Elasticsearch nodes to the cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsUpscaleArgs {
            lastUpdatedTime?: pulumi.Input<string>;
            /**
             * Nodes expected to be added by the operator.
             */
            nodes?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpscaleNodesArgs>[]>;
        }
        interface ElasticsearchStatusInProgressOperationsUpscaleNodesArgs {
            /**
             * Optional message to explain why a node may not be immediately added.
             */
            message?: pulumi.Input<string>;
            /**
             * Name of the Elasticsearch node that should be added to the cluster.
             */
            name: pulumi.Input<string>;
            /**
             * NewNodeStatus states if a new node is being created, or if the upscale is delayed.
             */
            status: pulumi.Input<string>;
        }
    }
    namespace v1beta1 {
        /**
         * ElasticsearchSpec holds the specification of an Elasticsearch cluster.
         */
        interface ElasticsearchSpecArgs {
            /**
             * HTTP holds HTTP layer settings for Elasticsearch.
             */
            http?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpArgs>;
            /**
             * Image is the Elasticsearch Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * NodeSets allow specifying groups of Elasticsearch nodes sharing the same configuration and Pod templates.
             */
            nodeSets: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsArgs>[]>;
            /**
             * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
             */
            podDisruptionBudget?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetArgs>;
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Elasticsearch.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecSecureSettingsArgs>[]>;
            /**
             * UpdateStrategy specifies how updates to the cluster should be performed.
             */
            updateStrategy?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecUpdateStrategyArgs>;
            /**
             * Version of Elasticsearch.
             */
            version?: pulumi.Input<string>;
        }
        /**
         * HTTP holds HTTP layer settings for Elasticsearch.
         */
        interface ElasticsearchSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticsearchSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticsearchSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticsearchSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * elasticsearchSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for ElasticsearchSpecHttpServiceSpecPortsArgs
         */
        function elasticsearchSpecHttpServiceSpecPortsArgsProvideDefaults(val: ElasticsearchSpecHttpServiceSpecPortsArgs): ElasticsearchSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ElasticsearchSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ElasticsearchSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * NodeSet is the specification for a group of Elasticsearch nodes sharing the same configuration and a Pod template.
         */
        interface ElasticsearchSpecNodeSetsArgs {
            /**
             * Config holds the Elasticsearch configuration.
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * Count of Elasticsearch nodes to deploy.
             */
            count: pulumi.Input<number>;
            /**
             * Name of this set of nodes. Becomes a part of the Elasticsearch node.name setting.
             */
            name: pulumi.Input<string>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Pods belonging to this NodeSet.
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * VolumeClaimTemplates is a list of persistent volume claims to be used by each Pod in this NodeSet. Every claim in this list must have a matching volumeMount in one of the containers defined in the PodTemplate. Items defined here take precedence over any default claims added by the operator with the same name.
             */
            volumeClaimTemplates?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesArgs>[]>;
        }
        /**
         * PersistentVolumeClaim is a user's request for and claim to a persistent volume
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesArgs {
            /**
             * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
             */
            apiVersion?: pulumi.Input<string>;
            /**
             * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
             */
            kind?: pulumi.Input<string>;
            /**
             * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
             */
            metadata?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadataArgs>;
            /**
             * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            spec?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecArgs>;
            /**
             * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            status?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusArgs>;
        }
        /**
         * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecArgs {
            /**
             * AccessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
             */
            dataSource?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceArgs>;
            /**
             * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
             */
            dataSourceRef?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRefArgs>;
            /**
             * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
             */
            resources?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResourcesArgs>;
            /**
             * A label query over volumes to consider for binding.
             */
            selector?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorArgs>;
            /**
             * Name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
             */
            storageClassName?: pulumi.Input<string>;
            /**
             * volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec.
             */
            volumeMode?: pulumi.Input<string>;
            /**
             * VolumeName is the binding reference to the PersistentVolume backing this claim.
             */
            volumeName?: pulumi.Input<string>;
        }
        /**
         * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceArgs {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: pulumi.Input<string>;
            /**
             * Kind is the type of resource being referenced
             */
            kind: pulumi.Input<string>;
            /**
             * Name is the name of resource being referenced
             */
            name: pulumi.Input<string>;
        }
        /**
         * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRefArgs {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: pulumi.Input<string>;
            /**
             * Kind is the type of resource being referenced
             */
            kind: pulumi.Input<string>;
            /**
             * Name is the name of resource being referenced
             */
            name: pulumi.Input<string>;
        }
        /**
         * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResourcesArgs {
            /**
             * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            limits?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
            /**
             * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            requests?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
        }
        /**
         * A label query over volumes to consider for binding.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorArgs {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressionsArgs>[]>;
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressionsArgs {
            /**
             * key is the label key that the selector applies to.
             */
            key: pulumi.Input<string>;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: pulumi.Input<string>;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: pulumi.Input<pulumi.Input<string>[]>;
        }
        /**
         * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusArgs {
            /**
             * AccessModes contains the actual access modes the volume backing the PVC has. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The storage resource within AllocatedResources tracks the capacity allocated to a PVC. It may be larger than the actual capacity when a volume expansion operation is requested. For storage quota, the larger value from allocatedResources and PVC.spec.resources is used. If allocatedResources is not set, PVC.spec.resources alone is used for quota calculation. If a volume expansion capacity request is lowered, allocatedResources is only lowered if there are no expansion operations in progress and if the actual volume capacity is equal or lower than the requested capacity. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            allocatedResources?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
            /**
             * Represents the actual resources of the underlying volume.
             */
            capacity?: pulumi.Input<{
                [key: string]: pulumi.Input<number | string>;
            }>;
            /**
             * Current Condition of persistent volume claim. If underlying persistent volume is being resized then the Condition will be set to 'ResizeStarted'.
             */
            conditions?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditionsArgs>[]>;
            /**
             * Phase represents the current phase of PersistentVolumeClaim.
             */
            phase?: pulumi.Input<string>;
            /**
             * ResizeStatus stores status of resize operation. ResizeStatus is not set by default but when expansion is complete resizeStatus is set to empty string by resize controller or kubelet. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            resizeStatus?: pulumi.Input<string>;
        }
        /**
         * PersistentVolumeClaimCondition contails details about state of pvc
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditionsArgs {
            /**
             * Last time we probed the condition.
             */
            lastProbeTime?: pulumi.Input<string>;
            /**
             * Last time the condition transitioned from one status to another.
             */
            lastTransitionTime?: pulumi.Input<string>;
            /**
             * Human-readable message indicating details about last transition.
             */
            message?: pulumi.Input<string>;
            /**
             * Unique, this should be a short, machine understandable string that gives the reason for condition's last transition. If it reports "ResizeStarted" that means the underlying persistent volume is being resized.
             */
            reason?: pulumi.Input<string>;
            status: pulumi.Input<string>;
            /**
             * PersistentVolumeClaimConditionType is a valid value of PersistentVolumeClaimCondition.Type
             */
            type: pulumi.Input<string>;
        }
        /**
         * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
         */
        interface ElasticsearchSpecPodDisruptionBudgetArgs {
            /**
             * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetMetadataArgs>;
            /**
             * Spec is the specification of the PDB.
             */
            spec?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecPodDisruptionBudgetMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the PDB.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecArgs {
            /**
             * An eviction is allowed if at most "maxUnavailable" pods selected by "selector" are unavailable after the eviction, i.e. even in absence of the evicted pod. For example, one can prevent all voluntary evictions by specifying 0. This is a mutually exclusive setting with "minAvailable".
             */
            maxUnavailable?: pulumi.Input<number | string>;
            /**
             * An eviction is allowed if at least "minAvailable" pods selected by "selector" will still be available after the eviction, i.e. even in the absence of the evicted pod.  So for example you can prevent all voluntary evictions by specifying "100%".
             */
            minAvailable?: pulumi.Input<number | string>;
            /**
             * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
             */
            selector?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetSpecSelectorArgs>;
        }
        /**
         * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelectorArgs {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressionsArgs>[]>;
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressionsArgs {
            /**
             * key is the label key that the selector applies to.
             */
            key: pulumi.Input<string>;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: pulumi.Input<string>;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: pulumi.Input<pulumi.Input<string>[]>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ElasticsearchSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ElasticsearchSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * UpdateStrategy specifies how updates to the cluster should be performed.
         */
        interface ElasticsearchSpecUpdateStrategyArgs {
            /**
             * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
             */
            changeBudget?: pulumi.Input<inputs.elasticsearch.v1beta1.ElasticsearchSpecUpdateStrategyChangeBudgetArgs>;
        }
        /**
         * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
         */
        interface ElasticsearchSpecUpdateStrategyChangeBudgetArgs {
            /**
             * MaxSurge is the maximum number of new pods that can be created exceeding the original number of pods defined in the specification. MaxSurge is only taken into consideration when scaling up. Setting a negative value will disable the restriction. Defaults to unbounded if not specified.
             */
            maxSurge?: pulumi.Input<number>;
            /**
             * MaxUnavailable is the maximum number of pods that can be unavailable (not ready) during the update due to circumstances under the control of the operator. Setting a negative value will disable this restriction. Defaults to 1 if not specified.
             */
            maxUnavailable?: pulumi.Input<number>;
        }
        /**
         * ElasticsearchStatus defines the observed state of Elasticsearch
         */
        interface ElasticsearchStatusArgs {
            availableNodes?: pulumi.Input<number>;
            /**
             * ElasticsearchHealth is the health of the cluster as returned by the health API.
             */
            health?: pulumi.Input<string>;
            /**
             * ElasticsearchOrchestrationPhase is the phase Elasticsearch is in from the controller point of view.
             */
            phase?: pulumi.Input<string>;
        }
    }
}
export declare namespace enterprisesearch {
    namespace v1 {
        /**
         * EnterpriseSearchSpec holds the specification of an Enterprise Search resource.
         */
        interface EnterpriseSearchSpecArgs {
            /**
             * Config holds the Enterprise Search configuration.
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
             */
            configRef?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecConfigRefArgs>;
            /**
             * Count of Enterprise Search instances to deploy.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecElasticsearchRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for Enterprise Search resource.
             */
            http?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpArgs>;
            /**
             * Image is the Enterprise Search Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Enterprise Search pods.
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Version of Enterprise Search.
             */
            version?: pulumi.Input<string>;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
         */
        interface EnterpriseSearchSpecConfigRefArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface EnterpriseSearchSpecElasticsearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for Enterprise Search resource.
         */
        interface EnterpriseSearchSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface EnterpriseSearchSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface EnterpriseSearchSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface EnterpriseSearchSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface EnterpriseSearchSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * enterpriseSearchSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for EnterpriseSearchSpecHttpServiceSpecPortsArgs
         */
        function enterpriseSearchSpecHttpServiceSpecPortsArgsProvideDefaults(val: EnterpriseSearchSpecHttpServiceSpecPortsArgs): EnterpriseSearchSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface EnterpriseSearchSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface EnterpriseSearchSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * EnterpriseSearchStatus defines the observed state of EnterpriseSearch
         */
        interface EnterpriseSearchStatusArgs {
            /**
             * Association is the status of any auto-linking to Elasticsearch clusters.
             */
            associationStatus?: pulumi.Input<string>;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: pulumi.Input<number>;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: pulumi.Input<number>;
            /**
             * Health of the deployment.
             */
            health?: pulumi.Input<string>;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: pulumi.Input<string>;
            /**
             * ExternalService is the name of the service associated to the Enterprise Search Pods.
             */
            service?: pulumi.Input<string>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
    }
    namespace v1beta1 {
        /**
         * EnterpriseSearchSpec holds the specification of an Enterprise Search resource.
         */
        interface EnterpriseSearchSpecArgs {
            /**
             * Config holds the Enterprise Search configuration.
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
             */
            configRef?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecConfigRefArgs>;
            /**
             * Count of Enterprise Search instances to deploy.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecElasticsearchRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for Enterprise Search resource.
             */
            http?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpArgs>;
            /**
             * Image is the Enterprise Search Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Enterprise Search pods.
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Version of Enterprise Search.
             */
            version?: pulumi.Input<string>;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
         */
        interface EnterpriseSearchSpecConfigRefArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface EnterpriseSearchSpecElasticsearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for Enterprise Search resource.
         */
        interface EnterpriseSearchSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface EnterpriseSearchSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface EnterpriseSearchSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface EnterpriseSearchSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface EnterpriseSearchSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * enterpriseSearchSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for EnterpriseSearchSpecHttpServiceSpecPortsArgs
         */
        function enterpriseSearchSpecHttpServiceSpecPortsArgsProvideDefaults(val: EnterpriseSearchSpecHttpServiceSpecPortsArgs): EnterpriseSearchSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface EnterpriseSearchSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface EnterpriseSearchSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * EnterpriseSearchStatus defines the observed state of EnterpriseSearch
         */
        interface EnterpriseSearchStatusArgs {
            /**
             * Association is the status of any auto-linking to Elasticsearch clusters.
             */
            associationStatus?: pulumi.Input<string>;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: pulumi.Input<number>;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: pulumi.Input<number>;
            /**
             * Health of the deployment.
             */
            health?: pulumi.Input<string>;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: pulumi.Input<string>;
            /**
             * ExternalService is the name of the service associated to the Enterprise Search Pods.
             */
            service?: pulumi.Input<string>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
    }
}
export declare namespace kibana {
    namespace v1 {
        /**
         * KibanaSpec holds the specification of a Kibana instance.
         */
        interface KibanaSpecArgs {
            /**
             * Config holds the Kibana configuration. See: https://www.elastic.co/guide/en/kibana/current/settings.html
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * Count of Kibana instances to deploy.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.kibana.v1.KibanaSpecElasticsearchRefArgs>;
            /**
             * EnterpriseSearchRef is a reference to an EnterpriseSearch running in the same Kubernetes cluster. Kibana provides the default Enterprise Search UI starting version 7.14.
             */
            enterpriseSearchRef?: pulumi.Input<inputs.kibana.v1.KibanaSpecEnterpriseSearchRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for Kibana.
             */
            http?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpArgs>;
            /**
             * Image is the Kibana Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * Monitoring enables you to collect and ship log and monitoring data of this Kibana. See https://www.elastic.co/guide/en/kibana/current/xpack-monitoring.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
             */
            monitoring?: pulumi.Input<inputs.kibana.v1.KibanaSpecMonitoringArgs>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Kibana pods
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Kibana.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.kibana.v1.KibanaSpecSecureSettingsArgs>[]>;
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Version of Kibana.
             */
            version: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface KibanaSpecElasticsearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * EnterpriseSearchRef is a reference to an EnterpriseSearch running in the same Kubernetes cluster. Kibana provides the default Enterprise Search UI starting version 7.14.
         */
        interface KibanaSpecEnterpriseSearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for Kibana.
         */
        interface KibanaSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface KibanaSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface KibanaSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface KibanaSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.kibana.v1.KibanaSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface KibanaSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * kibanaSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for KibanaSpecHttpServiceSpecPortsArgs
         */
        function kibanaSpecHttpServiceSpecPortsArgsProvideDefaults(val: KibanaSpecHttpServiceSpecPortsArgs): KibanaSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface KibanaSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.kibana.v1.KibanaSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface KibanaSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.kibana.v1.KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * Monitoring enables you to collect and ship log and monitoring data of this Kibana. See https://www.elastic.co/guide/en/kibana/current/xpack-monitoring.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
         */
        interface KibanaSpecMonitoringArgs {
            /**
             * Logs holds references to Elasticsearch clusters which will receive log data from this Kibana.
             */
            logs?: pulumi.Input<inputs.kibana.v1.KibanaSpecMonitoringLogsArgs>;
            /**
             * Metrics holds references to Elasticsearch clusters which will receive monitoring data from this Kibana.
             */
            metrics?: pulumi.Input<inputs.kibana.v1.KibanaSpecMonitoringMetricsArgs>;
        }
        /**
         * Logs holds references to Elasticsearch clusters which will receive log data from this Kibana.
         */
        interface KibanaSpecMonitoringLogsArgs {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: pulumi.Input<pulumi.Input<inputs.kibana.v1.KibanaSpecMonitoringLogsElasticsearchRefsArgs>[]>;
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface KibanaSpecMonitoringLogsElasticsearchRefsArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * Metrics holds references to Elasticsearch clusters which will receive monitoring data from this Kibana.
         */
        interface KibanaSpecMonitoringMetricsArgs {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: pulumi.Input<pulumi.Input<inputs.kibana.v1.KibanaSpecMonitoringMetricsElasticsearchRefsArgs>[]>;
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface KibanaSpecMonitoringMetricsElasticsearchRefsArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface KibanaSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.kibana.v1.KibanaSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface KibanaSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * KibanaStatus defines the observed state of Kibana
         */
        interface KibanaStatusArgs {
            /**
             * AssociationStatus is the status of any auto-linking to Elasticsearch clusters. This field is deprecated and will be removed in a future release. Use ElasticsearchAssociationStatus instead.
             */
            associationStatus?: pulumi.Input<string>;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: pulumi.Input<number>;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchAssociationStatus is the status of any auto-linking to Elasticsearch clusters.
             */
            elasticsearchAssociationStatus?: pulumi.Input<string>;
            /**
             * EnterpriseSearchAssociationStatus is the status of any auto-linking to Enterprise Search.
             */
            enterpriseSearchAssociationStatus?: pulumi.Input<string>;
            /**
             * Health of the deployment.
             */
            health?: pulumi.Input<string>;
            /**
             * MonitoringAssociationStatus is the status of any auto-linking to monitoring Elasticsearch clusters.
             */
            monitoringAssociationStatus?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * ObservedGeneration is the most recent generation observed for this Kibana instance. It corresponds to the metadata generation, which is updated on mutation by the API Server. If the generation observed in status diverges from the generation in metadata, the Kibana controller has not yet processed the changes contained in the Kibana specification.
             */
            observedGeneration?: pulumi.Input<number>;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: pulumi.Input<string>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
    }
    namespace v1beta1 {
        /**
         * KibanaSpec holds the specification of a Kibana instance.
         */
        interface KibanaSpecArgs {
            /**
             * Config holds the Kibana configuration. See: https://www.elastic.co/guide/en/kibana/current/settings.html
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * Count of Kibana instances to deploy.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecElasticsearchRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for Kibana.
             */
            http?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpArgs>;
            /**
             * Image is the Kibana Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Kibana pods
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Kibana.
             */
            secureSettings?: pulumi.Input<pulumi.Input<inputs.kibana.v1beta1.KibanaSpecSecureSettingsArgs>[]>;
            /**
             * Version of Kibana.
             */
            version?: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface KibanaSpecElasticsearchRefArgs {
            /**
             * Name of the Kubernetes object.
             */
            name: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for Kibana.
         */
        interface KibanaSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface KibanaSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface KibanaSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface KibanaSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface KibanaSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * kibanaSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for KibanaSpecHttpServiceSpecPortsArgs
         */
        function kibanaSpecHttpServiceSpecPortsArgsProvideDefaults(val: KibanaSpecHttpServiceSpecPortsArgs): KibanaSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface KibanaSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface KibanaSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.kibana.v1beta1.KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface KibanaSpecSecureSettingsArgs {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: pulumi.Input<pulumi.Input<inputs.kibana.v1beta1.KibanaSpecSecureSettingsEntriesArgs>[]>;
            /**
             * SecretName is the name of the secret.
             */
            secretName: pulumi.Input<string>;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface KibanaSpecSecureSettingsEntriesArgs {
            /**
             * Key is the key contained in the secret.
             */
            key: pulumi.Input<string>;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: pulumi.Input<string>;
        }
        /**
         * KibanaStatus defines the observed state of Kibana
         */
        interface KibanaStatusArgs {
            /**
             * AssociationStatus is the status of an association resource.
             */
            associationStatus?: pulumi.Input<string>;
            availableNodes?: pulumi.Input<number>;
            /**
             * KibanaHealth expresses the status of the Kibana instances.
             */
            health?: pulumi.Input<string>;
        }
    }
}
export declare namespace maps {
    namespace v1alpha1 {
        /**
         * MapsSpec holds the specification of an Elastic Maps Server instance.
         */
        interface ElasticMapsServerSpecArgs {
            /**
             * Config holds the ElasticMapsServer configuration. See: https://www.elastic.co/guide/en/kibana/current/maps-connect-to-ems.html#elastic-maps-server-configuration
             */
            config?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Elastic Maps Server configuration. Configuration settings are merged and have precedence over settings specified in `config`.
             */
            configRef?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecConfigRefArgs>;
            /**
             * Count of Elastic Maps Server instances to deploy.
             */
            count?: pulumi.Input<number>;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecElasticsearchRefArgs>;
            /**
             * HTTP holds the HTTP layer configuration for Elastic Maps Server.
             */
            http?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpArgs>;
            /**
             * Image is the Elastic Maps Server Docker image to deploy.
             */
            image?: pulumi.Input<string>;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Elastic Maps Server pods
             */
            podTemplate?: pulumi.Input<{
                [key: string]: any;
            }>;
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: pulumi.Input<string>;
            /**
             * Version of Elastic Maps Server.
             */
            version: pulumi.Input<string>;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Elastic Maps Server configuration. Configuration settings are merged and have precedence over settings specified in `config`.
         */
        interface ElasticMapsServerSpecConfigRefArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface ElasticMapsServerSpecElasticsearchRefArgs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: pulumi.Input<string>;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: pulumi.Input<string>;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: pulumi.Input<string>;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: pulumi.Input<string>;
        }
        /**
         * HTTP holds the HTTP layer configuration for Elastic Maps Server.
         */
        interface ElasticMapsServerSpecHttpArgs {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceArgs>;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpTlsArgs>;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticMapsServerSpecHttpServiceArgs {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceMetadataArgs>;
            /**
             * Spec is the specification of the service.
             */
            spec?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpecArgs>;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticMapsServerSpecHttpServiceMetadataArgs {
            annotations?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            finalizers?: pulumi.Input<pulumi.Input<string>[]>;
            labels?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            name?: pulumi.Input<string>;
            namespace?: pulumi.Input<string>;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticMapsServerSpecHttpServiceSpecArgs {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: pulumi.Input<boolean>;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: pulumi.Input<string>;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: pulumi.Input<string>;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: pulumi.Input<string>;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: pulumi.Input<number>;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: pulumi.Input<string>;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: pulumi.Input<string>;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: pulumi.Input<string>;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: pulumi.Input<string>;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: pulumi.Input<pulumi.Input<string>[]>;
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: pulumi.Input<pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpecPortsArgs>[]>;
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: pulumi.Input<boolean>;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: pulumi.Input<{
                [key: string]: pulumi.Input<string>;
            }>;
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: pulumi.Input<string>;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfigArgs>;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: pulumi.Input<string>;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticMapsServerSpecHttpServiceSpecPortsArgs {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: pulumi.Input<string>;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: pulumi.Input<string>;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: pulumi.Input<number>;
            /**
             * The port that will be exposed by this service.
             */
            port: pulumi.Input<number>;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: pulumi.Input<string>;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: pulumi.Input<number | string>;
        }
        /**
         * elasticMapsServerSpecHttpServiceSpecPortsArgsProvideDefaults sets the appropriate defaults for ElasticMapsServerSpecHttpServiceSpecPortsArgs
         */
        function elasticMapsServerSpecHttpServiceSpecPortsArgsProvideDefaults(val: ElasticMapsServerSpecHttpServiceSpecPortsArgs): ElasticMapsServerSpecHttpServiceSpecPortsArgs;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfigArgs {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfigClientIPArgs>;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfigClientIPArgs {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: pulumi.Input<number>;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ElasticMapsServerSpecHttpTlsArgs {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpTlsCertificateArgs>;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpTlsSelfSignedCertificateArgs>;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ElasticMapsServerSpecHttpTlsCertificateArgs {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: pulumi.Input<string>;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ElasticMapsServerSpecHttpTlsSelfSignedCertificateArgs {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: pulumi.Input<boolean>;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: pulumi.Input<pulumi.Input<inputs.maps.v1alpha1.ElasticMapsServerSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs>[]>;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticMapsServerSpecHttpTlsSelfSignedCertificateSubjectAltNamesArgs {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: pulumi.Input<string>;
            /**
             * IP is the IP address of the subject.
             */
            ip?: pulumi.Input<string>;
        }
        /**
         * MapsStatus defines the observed state of Elastic Maps Server
         */
        interface ElasticMapsServerStatusArgs {
            /**
             * AssociationStatus is the status of an association resource.
             */
            associationStatus?: pulumi.Input<string>;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: pulumi.Input<number>;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: pulumi.Input<number>;
            /**
             * Health of the deployment.
             */
            health?: pulumi.Input<string>;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: pulumi.Input<string>;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: pulumi.Input<string>;
        }
    }
}