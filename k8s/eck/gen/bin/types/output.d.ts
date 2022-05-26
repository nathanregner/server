import { output as outputs } from "../types";
export declare namespace agent {
    namespace v1alpha1 {
        /**
         * AgentSpec defines the desired state of the Agent
         */
        interface AgentSpec {
            /**
             * Config holds the Agent configuration. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            config?: {
                [key: string]: any;
            };
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Agent configuration. Agent settings must be specified as yaml, under a single "agent.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            configRef?: outputs.agent.v1alpha1.AgentSpecConfigRef;
            /**
             * DaemonSet specifies the Agent should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`.
             */
            daemonSet?: outputs.agent.v1alpha1.AgentSpecDaemonSet;
            /**
             * Deployment specifies the Agent should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`.
             */
            deployment?: outputs.agent.v1alpha1.AgentSpecDeployment;
            /**
             * ElasticsearchRefs is a reference to a list of Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single ES cluster is currently supported.
             */
            elasticsearchRefs?: outputs.agent.v1alpha1.AgentSpecElasticsearchRefs[];
            /**
             * FleetServerEnabled determines whether this Agent will launch Fleet Server. Don't set unless `mode` is set to `fleet`.
             */
            fleetServerEnabled?: boolean;
            /**
             * FleetServerRef is a reference to Fleet Server that this Agent should connect to to obtain it's configuration. Don't set unless `mode` is set to `fleet`.
             */
            fleetServerRef?: outputs.agent.v1alpha1.AgentSpecFleetServerRef;
            /**
             * HTTP holds the HTTP layer configuration for the Agent in Fleet mode with Fleet Server enabled.
             */
            http?: outputs.agent.v1alpha1.AgentSpecHttp;
            /**
             * Image is the Agent Docker image to deploy. Version has to match the Agent in the image.
             */
            image?: string;
            /**
             * KibanaRef is a reference to Kibana where Fleet should be set up and this Agent should be enrolled. Don't set unless `mode` is set to `fleet`.
             */
            kibanaRef?: outputs.agent.v1alpha1.AgentSpecKibanaRef;
            /**
             * Mode specifies the source of configuration for the Agent. The configuration can be specified locally through `config` or `configRef` (`standalone` mode), or come from Fleet during runtime (`fleet` mode). Defaults to `standalone` mode.
             */
            mode?: string;
            /**
             * SecureSettings is a list of references to Kubernetes Secrets containing sensitive configuration options for the Agent. Secrets data can be then referenced in the Agent config using the Secret's keys or as specified in `Entries` field of each SecureSetting.
             */
            secureSettings?: outputs.agent.v1alpha1.AgentSpecSecureSettings[];
            /**
             * ServiceAccountName is used to check access from the current resource to an Elasticsearch resource in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Version of the Agent.
             */
            version: string;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Agent configuration. Agent settings must be specified as yaml, under a single "agent.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
         */
        interface AgentSpecConfigRef {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * DaemonSet specifies the Agent should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`.
         */
        interface AgentSpecDaemonSet {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
             */
            updateStrategy?: outputs.agent.v1alpha1.AgentSpecDaemonSetUpdateStrategy;
        }
        /**
         * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
         */
        interface AgentSpecDaemonSetUpdateStrategy {
            /**
             * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
             */
            rollingUpdate?: outputs.agent.v1alpha1.AgentSpecDaemonSetUpdateStrategyRollingUpdate;
            /**
             * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
             */
            type?: string;
        }
        /**
         * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
         */
        interface AgentSpecDaemonSetUpdateStrategyRollingUpdate {
            /**
             * The maximum number of nodes with an existing available DaemonSet pod that can have an updated DaemonSet pod during during an update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up to a minimum of 1. Default value is 0. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their a new pod created before the old pod is marked as deleted. The update starts by launching new pods on 30% of nodes. Once an updated pod is available (Ready for at least minReadySeconds) the old DaemonSet pod on that node is marked deleted. If the old pod becomes unavailable for any reason (Ready transitions to false, is evicted, or is drained) an updated pod is immediatedly created on that node without considering surge limits. Allowing surge implies the possibility that the resources consumed by the daemonset on any given node can double if the readiness check fails, and so resource intensive daemonsets should take into account that they may cause evictions during disruption. This is beta field and enabled/disabled by DaemonSetUpdateSurge feature gate.
             */
            maxSurge?: number | string;
            /**
             * The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0 if MaxSurge is 0 Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.
             */
            maxUnavailable?: number | string;
        }
        /**
         * Deployment specifies the Agent should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`.
         */
        interface AgentSpecDeployment {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: {
                [key: string]: any;
            };
            replicas?: number;
            /**
             * DeploymentStrategy describes how to replace existing pods with new ones.
             */
            strategy?: outputs.agent.v1alpha1.AgentSpecDeploymentStrategy;
        }
        /**
         * DeploymentStrategy describes how to replace existing pods with new ones.
         */
        interface AgentSpecDeploymentStrategy {
            /**
             * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
             */
            rollingUpdate?: outputs.agent.v1alpha1.AgentSpecDeploymentStrategyRollingUpdate;
            /**
             * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
             */
            type?: string;
        }
        /**
         * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
         */
        interface AgentSpecDeploymentStrategyRollingUpdate {
            /**
             * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. Defaults to 25%. Example: when this is set to 30%, the new ReplicaSet can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new ReplicaSet can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
             */
            maxSurge?: number | string;
            /**
             * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. Defaults to 25%. Example: when this is set to 30%, the old ReplicaSet can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old ReplicaSet can be scaled down further, followed by scaling up the new ReplicaSet, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
             */
            maxUnavailable?: number | string;
        }
        interface AgentSpecElasticsearchRefs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            outputName?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * FleetServerRef is a reference to Fleet Server that this Agent should connect to to obtain it's configuration. Don't set unless `mode` is set to `fleet`.
         */
        interface AgentSpecFleetServerRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for the Agent in Fleet mode with Fleet Server enabled.
         */
        interface AgentSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.agent.v1alpha1.AgentSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.agent.v1alpha1.AgentSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface AgentSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.agent.v1alpha1.AgentSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.agent.v1alpha1.AgentSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface AgentSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface AgentSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.agent.v1alpha1.AgentSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.agent.v1alpha1.AgentSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface AgentSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * agentSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for AgentSpecHttpServiceSpecPorts
         */
        function agentSpecHttpServiceSpecPortsProvideDefaults(val: AgentSpecHttpServiceSpecPorts): AgentSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface AgentSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.agent.v1alpha1.AgentSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface AgentSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface AgentSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.agent.v1alpha1.AgentSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.agent.v1alpha1.AgentSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface AgentSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface AgentSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.agent.v1alpha1.AgentSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface AgentSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * KibanaRef is a reference to Kibana where Fleet should be set up and this Agent should be enrolled. Don't set unless `mode` is set to `fleet`.
         */
        interface AgentSpecKibanaRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface AgentSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.agent.v1alpha1.AgentSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface AgentSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * AgentStatus defines the observed state of the Agent
         */
        interface AgentStatus {
            availableNodes?: number;
            /**
             * AssociationStatusMap is the map of association's namespaced name string to its AssociationStatus. For resources that have a single Association of a given type (for ex. single ES reference), this map contains a single entry.
             */
            elasticsearchAssociationsStatus?: {
                [key: string]: string;
            };
            expectedNodes?: number;
            /**
             * AssociationStatus is the status of an association resource.
             */
            fleetServerAssociationStatus?: string;
            health?: string;
            /**
             * AssociationStatus is the status of an association resource.
             */
            kibanaAssociationStatus?: string;
            /**
             * ObservedGeneration is the most recent generation observed for this Elastic Agent. It corresponds to the metadata generation, which is updated on mutation by the API Server. If the generation observed in status diverges from the generation in metadata, the Elastic Agent controller has not yet processed the changes contained in the Elastic Agent specification.
             */
            observedGeneration?: number;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
    }
}
export declare namespace apm {
    namespace v1 {
        /**
         * ApmServerSpec holds the specification of an APM Server.
         */
        interface ApmServerSpec {
            /**
             * Config holds the APM Server configuration. See: https://www.elastic.co/guide/en/apm/server/current/configuring-howto-apm-server.html
             */
            config?: {
                [key: string]: any;
            };
            /**
             * Count of APM Server instances to deploy.
             */
            count?: number;
            /**
             * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.apm.v1.ApmServerSpecElasticsearchRef;
            /**
             * HTTP holds the HTTP layer configuration for the APM Server resource.
             */
            http?: outputs.apm.v1.ApmServerSpecHttp;
            /**
             * Image is the APM Server Docker image to deploy.
             */
            image?: string;
            /**
             * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows APM agent central configuration management in Kibana.
             */
            kibanaRef?: outputs.apm.v1.ApmServerSpecKibanaRef;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the APM Server pods.
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for APM Server.
             */
            secureSettings?: outputs.apm.v1.ApmServerSpecSecureSettings[];
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Version of the APM Server.
             */
            version: string;
        }
        /**
         * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface ApmServerSpecElasticsearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for the APM Server resource.
         */
        interface ApmServerSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.apm.v1.ApmServerSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.apm.v1.ApmServerSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ApmServerSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.apm.v1.ApmServerSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.apm.v1.ApmServerSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ApmServerSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ApmServerSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.apm.v1.ApmServerSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.apm.v1.ApmServerSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ApmServerSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * apmServerSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ApmServerSpecHttpServiceSpecPorts
         */
        function apmServerSpecHttpServiceSpecPortsProvideDefaults(val: ApmServerSpecHttpServiceSpecPorts): ApmServerSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.apm.v1.ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ApmServerSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.apm.v1.ApmServerSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.apm.v1.ApmServerSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ApmServerSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.apm.v1.ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows APM agent central configuration management in Kibana.
         */
        interface ApmServerSpecKibanaRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ApmServerSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.apm.v1.ApmServerSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ApmServerSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * ApmServerStatus defines the observed state of ApmServer
         */
        interface ApmServerStatus {
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: number;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: number;
            /**
             * ElasticsearchAssociationStatus is the status of any auto-linking to Elasticsearch clusters.
             */
            elasticsearchAssociationStatus?: string;
            /**
             * Health of the deployment.
             */
            health?: string;
            /**
             * KibanaAssociationStatus is the status of any auto-linking to Kibana.
             */
            kibanaAssociationStatus?: string;
            /**
             * SecretTokenSecretName is the name of the Secret that contains the secret token
             */
            secretTokenSecret?: string;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: string;
            /**
             * ExternalService is the name of the service the agents should connect to.
             */
            service?: string;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
    }
    namespace v1beta1 {
        /**
         * ApmServerSpec holds the specification of an APM Server.
         */
        interface ApmServerSpec {
            /**
             * Config holds the APM Server configuration. See: https://www.elastic.co/guide/en/apm/server/current/configuring-howto-apm-server.html
             */
            config?: {
                [key: string]: any;
            };
            /**
             * Count of APM Server instances to deploy.
             */
            count?: number;
            /**
             * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.apm.v1beta1.ApmServerSpecElasticsearchRef;
            /**
             * HTTP holds the HTTP layer configuration for the APM Server resource.
             */
            http?: outputs.apm.v1beta1.ApmServerSpecHttp;
            /**
             * Image is the APM Server Docker image to deploy.
             */
            image?: string;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the APM Server pods.
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for APM Server.
             */
            secureSettings?: outputs.apm.v1beta1.ApmServerSpecSecureSettings[];
            /**
             * Version of the APM Server.
             */
            version?: string;
        }
        /**
         * ElasticsearchRef is a reference to the output Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface ApmServerSpecElasticsearchRef {
            /**
             * Name of the Kubernetes object.
             */
            name: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for the APM Server resource.
         */
        interface ApmServerSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.apm.v1beta1.ApmServerSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.apm.v1beta1.ApmServerSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ApmServerSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.apm.v1beta1.ApmServerSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.apm.v1beta1.ApmServerSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ApmServerSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ApmServerSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.apm.v1beta1.ApmServerSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.apm.v1beta1.ApmServerSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ApmServerSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * apmServerSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ApmServerSpecHttpServiceSpecPorts
         */
        function apmServerSpecHttpServiceSpecPortsProvideDefaults(val: ApmServerSpecHttpServiceSpecPorts): ApmServerSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.apm.v1beta1.ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ApmServerSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ApmServerSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.apm.v1beta1.ApmServerSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.apm.v1beta1.ApmServerSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ApmServerSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.apm.v1beta1.ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ApmServerSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ApmServerSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.apm.v1beta1.ApmServerSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ApmServerSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * ApmServerStatus defines the observed state of ApmServer
         */
        interface ApmServerStatus {
            /**
             * Association is the status of any auto-linking to Elasticsearch clusters.
             */
            associationStatus?: string;
            availableNodes?: number;
            /**
             * ApmServerHealth expresses the status of the Apm Server instances.
             */
            health?: string;
            /**
             * SecretTokenSecretName is the name of the Secret that contains the secret token
             */
            secretTokenSecret?: string;
            /**
             * ExternalService is the name of the service the agents should connect to.
             */
            service?: string;
        }
    }
}
export declare namespace beat {
    namespace v1beta1 {
        /**
         * BeatSpec defines the desired state of a Beat.
         */
        interface BeatSpec {
            /**
             * Config holds the Beat configuration. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            config?: {
                [key: string]: any;
            };
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Beat configuration. Beat settings must be specified as yaml, under a single "beat.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
             */
            configRef?: outputs.beat.v1beta1.BeatSpecConfigRef;
            /**
             * DaemonSet specifies the Beat should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`. If both are absent a default for the Type is used.
             */
            daemonSet?: outputs.beat.v1beta1.BeatSpecDaemonSet;
            /**
             * Deployment specifies the Beat should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`. If both are absent a default for the Type is used.
             */
            deployment?: outputs.beat.v1beta1.BeatSpecDeployment;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.beat.v1beta1.BeatSpecElasticsearchRef;
            /**
             * Image is the Beat Docker image to deploy. Version and Type have to match the Beat in the image.
             */
            image?: string;
            /**
             * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows automatic setup of dashboards and visualizations.
             */
            kibanaRef?: outputs.beat.v1beta1.BeatSpecKibanaRef;
            /**
             * SecureSettings is a list of references to Kubernetes Secrets containing sensitive configuration options for the Beat. Secrets data can be then referenced in the Beat config using the Secret's keys or as specified in `Entries` field of each SecureSetting.
             */
            secureSettings?: outputs.beat.v1beta1.BeatSpecSecureSettings[];
            /**
             * ServiceAccountName is used to check access from the current resource to Elasticsearch resource in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Type is the type of the Beat to deploy (filebeat, metricbeat, heartbeat, auditbeat, journalbeat, packetbeat, and so on). Any string can be used, but well-known types will have the image field defaulted and have the appropriate Elasticsearch roles created automatically. It also allows for dashboard setup when combined with a `KibanaRef`.
             */
            type: string;
            /**
             * Version of the Beat.
             */
            version: string;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Beat configuration. Beat settings must be specified as yaml, under a single "beat.yml" entry. At most one of [`Config`, `ConfigRef`] can be specified.
         */
        interface BeatSpecConfigRef {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * DaemonSet specifies the Beat should be deployed as a DaemonSet, and allows providing its spec. Cannot be used along with `deployment`. If both are absent a default for the Type is used.
         */
        interface BeatSpecDaemonSet {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
             */
            updateStrategy?: outputs.beat.v1beta1.BeatSpecDaemonSetUpdateStrategy;
        }
        /**
         * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
         */
        interface BeatSpecDaemonSetUpdateStrategy {
            /**
             * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
             */
            rollingUpdate?: outputs.beat.v1beta1.BeatSpecDaemonSetUpdateStrategyRollingUpdate;
            /**
             * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
             */
            type?: string;
        }
        /**
         * Rolling update config params. Present only if type = "RollingUpdate". --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be. Same as Deployment `strategy.rollingUpdate`. See https://github.com/kubernetes/kubernetes/issues/35345
         */
        interface BeatSpecDaemonSetUpdateStrategyRollingUpdate {
            /**
             * The maximum number of nodes with an existing available DaemonSet pod that can have an updated DaemonSet pod during during an update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up to a minimum of 1. Default value is 0. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their a new pod created before the old pod is marked as deleted. The update starts by launching new pods on 30% of nodes. Once an updated pod is available (Ready for at least minReadySeconds) the old DaemonSet pod on that node is marked deleted. If the old pod becomes unavailable for any reason (Ready transitions to false, is evicted, or is drained) an updated pod is immediatedly created on that node without considering surge limits. Allowing surge implies the possibility that the resources consumed by the daemonset on any given node can double if the readiness check fails, and so resource intensive daemonsets should take into account that they may cause evictions during disruption. This is beta field and enabled/disabled by DaemonSetUpdateSurge feature gate.
             */
            maxSurge?: number | string;
            /**
             * The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0 if MaxSurge is 0 Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.
             */
            maxUnavailable?: number | string;
        }
        /**
         * Deployment specifies the Beat should be deployed as a Deployment, and allows providing its spec. Cannot be used along with `daemonSet`. If both are absent a default for the Type is used.
         */
        interface BeatSpecDeployment {
            /**
             * PodTemplateSpec describes the data a pod should have when created from a template
             */
            podTemplate?: {
                [key: string]: any;
            };
            replicas?: number;
            /**
             * DeploymentStrategy describes how to replace existing pods with new ones.
             */
            strategy?: outputs.beat.v1beta1.BeatSpecDeploymentStrategy;
        }
        /**
         * DeploymentStrategy describes how to replace existing pods with new ones.
         */
        interface BeatSpecDeploymentStrategy {
            /**
             * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
             */
            rollingUpdate?: outputs.beat.v1beta1.BeatSpecDeploymentStrategyRollingUpdate;
            /**
             * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
             */
            type?: string;
        }
        /**
         * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate. --- TODO: Update this to follow our convention for oneOf, whatever we decide it to be.
         */
        interface BeatSpecDeploymentStrategyRollingUpdate {
            /**
             * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. Defaults to 25%. Example: when this is set to 30%, the new ReplicaSet can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new ReplicaSet can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
             */
            maxSurge?: number | string;
            /**
             * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. Defaults to 25%. Example: when this is set to 30%, the old ReplicaSet can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old ReplicaSet can be scaled down further, followed by scaling up the new ReplicaSet, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
             */
            maxUnavailable?: number | string;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface BeatSpecElasticsearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * KibanaRef is a reference to a Kibana instance running in the same Kubernetes cluster. It allows automatic setup of dashboards and visualizations.
         */
        interface BeatSpecKibanaRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface BeatSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.beat.v1beta1.BeatSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface BeatSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * BeatStatus defines the observed state of a Beat.
         */
        interface BeatStatus {
            availableNodes?: number;
            /**
             * AssociationStatus is the status of an association resource.
             */
            elasticsearchAssociationStatus?: string;
            expectedNodes?: number;
            health?: string;
            /**
             * AssociationStatus is the status of an association resource.
             */
            kibanaAssociationStatus?: string;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
    }
}
export declare namespace elasticsearch {
    namespace v1 {
        /**
         * ElasticsearchSpec holds the specification of an Elasticsearch cluster.
         */
        interface ElasticsearchSpec {
            /**
             * Auth contains user authentication and authorization security settings for Elasticsearch.
             */
            auth?: outputs.elasticsearch.v1.ElasticsearchSpecAuth;
            /**
             * HTTP holds HTTP layer settings for Elasticsearch.
             */
            http?: outputs.elasticsearch.v1.ElasticsearchSpecHttp;
            /**
             * Image is the Elasticsearch Docker image to deploy.
             */
            image?: string;
            /**
             * Monitoring enables you to collect and ship log and monitoring data of this Elasticsearch cluster. See https://www.elastic.co/guide/en/elasticsearch/reference/current/monitor-elasticsearch-cluster.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
             */
            monitoring?: outputs.elasticsearch.v1.ElasticsearchSpecMonitoring;
            /**
             * NodeSets allow specifying groups of Elasticsearch nodes sharing the same configuration and Pod templates.
             */
            nodeSets: outputs.elasticsearch.v1.ElasticsearchSpecNodeSets[];
            /**
             * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
             */
            podDisruptionBudget?: outputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudget;
            /**
             * RemoteClusters enables you to establish uni-directional connections to a remote Elasticsearch cluster.
             */
            remoteClusters?: outputs.elasticsearch.v1.ElasticsearchSpecRemoteClusters[];
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Elasticsearch.
             */
            secureSettings?: outputs.elasticsearch.v1.ElasticsearchSpecSecureSettings[];
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. a remote Elasticsearch cluster) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Transport holds transport layer settings for Elasticsearch.
             */
            transport?: outputs.elasticsearch.v1.ElasticsearchSpecTransport;
            /**
             * UpdateStrategy specifies how updates to the cluster should be performed.
             */
            updateStrategy?: outputs.elasticsearch.v1.ElasticsearchSpecUpdateStrategy;
            /**
             * Version of Elasticsearch.
             */
            version: string;
            /**
             * VolumeClaimDeletePolicy sets the policy for handling deletion of PersistentVolumeClaims for all NodeSets. Possible values are DeleteOnScaledownOnly and DeleteOnScaledownAndClusterDeletion. Defaults to DeleteOnScaledownAndClusterDeletion.
             */
            volumeClaimDeletePolicy?: string;
        }
        /**
         * Auth contains user authentication and authorization security settings for Elasticsearch.
         */
        interface ElasticsearchSpecAuth {
            /**
             * FileRealm to propagate to the Elasticsearch cluster.
             */
            fileRealm?: outputs.elasticsearch.v1.ElasticsearchSpecAuthFileRealm[];
            /**
             * Roles to propagate to the Elasticsearch cluster.
             */
            roles?: outputs.elasticsearch.v1.ElasticsearchSpecAuthRoles[];
        }
        /**
         * FileRealmSource references users to create in the Elasticsearch cluster.
         */
        interface ElasticsearchSpecAuthFileRealm {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * RoleSource references roles to create in the Elasticsearch cluster.
         */
        interface ElasticsearchSpecAuthRoles {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * HTTP holds HTTP layer settings for Elasticsearch.
         */
        interface ElasticsearchSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.elasticsearch.v1.ElasticsearchSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.elasticsearch.v1.ElasticsearchSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticsearchSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.elasticsearch.v1.ElasticsearchSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticsearchSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticsearchSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * elasticsearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticsearchSpecHttpServiceSpecPorts
         */
        function elasticsearchSpecHttpServiceSpecPortsProvideDefaults(val: ElasticsearchSpecHttpServiceSpecPorts): ElasticsearchSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.elasticsearch.v1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ElasticsearchSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.elasticsearch.v1.ElasticsearchSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.elasticsearch.v1.ElasticsearchSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ElasticsearchSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.elasticsearch.v1.ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * Monitoring enables you to collect and ship log and monitoring data of this Elasticsearch cluster. See https://www.elastic.co/guide/en/elasticsearch/reference/current/monitor-elasticsearch-cluster.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
         */
        interface ElasticsearchSpecMonitoring {
            /**
             * Logs holds references to Elasticsearch clusters which receive log data from this Elasticsearch cluster.
             */
            logs?: outputs.elasticsearch.v1.ElasticsearchSpecMonitoringLogs;
            /**
             * Metrics holds references to Elasticsearch clusters which receive monitoring data from this Elasticsearch cluster.
             */
            metrics?: outputs.elasticsearch.v1.ElasticsearchSpecMonitoringMetrics;
        }
        /**
         * Logs holds references to Elasticsearch clusters which receive log data from this Elasticsearch cluster.
         */
        interface ElasticsearchSpecMonitoringLogs {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: outputs.elasticsearch.v1.ElasticsearchSpecMonitoringLogsElasticsearchRefs[];
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface ElasticsearchSpecMonitoringLogsElasticsearchRefs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * Metrics holds references to Elasticsearch clusters which receive monitoring data from this Elasticsearch cluster.
         */
        interface ElasticsearchSpecMonitoringMetrics {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: outputs.elasticsearch.v1.ElasticsearchSpecMonitoringMetricsElasticsearchRefs[];
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface ElasticsearchSpecMonitoringMetricsElasticsearchRefs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * NodeSet is the specification for a group of Elasticsearch nodes sharing the same configuration and a Pod template.
         */
        interface ElasticsearchSpecNodeSets {
            /**
             * Config holds the Elasticsearch configuration.
             */
            config?: {
                [key: string]: any;
            };
            /**
             * Count of Elasticsearch nodes to deploy. If the node set is managed by an autoscaling policy the initial value is automatically set by the autoscaling controller.
             */
            count?: number;
            /**
             * Name of this set of nodes. Becomes a part of the Elasticsearch node.name setting.
             */
            name: string;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Pods belonging to this NodeSet.
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * VolumeClaimTemplates is a list of persistent volume claims to be used by each Pod in this NodeSet. Every claim in this list must have a matching volumeMount in one of the containers defined in the PodTemplate. Items defined here take precedence over any default claims added by the operator with the same name.
             */
            volumeClaimTemplates?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplates[];
        }
        /**
         * PersistentVolumeClaim is a user's request for and claim to a persistent volume
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplates {
            /**
             * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
             */
            apiVersion?: string;
            /**
             * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
             */
            kind?: string;
            /**
             * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
             */
            metadata?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadata;
            /**
             * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            spec?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpec;
            /**
             * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            status?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatus;
        }
        /**
         * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpec {
            /**
             * AccessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: string[];
            /**
             * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
             */
            dataSource?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSource;
            /**
             * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
             */
            dataSourceRef?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRef;
            /**
             * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
             */
            resources?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResources;
            /**
             * A label query over volumes to consider for binding.
             */
            selector?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelector;
            /**
             * Name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
             */
            storageClassName?: string;
            /**
             * volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec.
             */
            volumeMode?: string;
            /**
             * VolumeName is the binding reference to the PersistentVolume backing this claim.
             */
            volumeName?: string;
        }
        /**
         * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSource {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: string;
            /**
             * Kind is the type of resource being referenced
             */
            kind: string;
            /**
             * Name is the name of resource being referenced
             */
            name: string;
        }
        /**
         * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRef {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: string;
            /**
             * Kind is the type of resource being referenced
             */
            kind: string;
            /**
             * Name is the name of resource being referenced
             */
            name: string;
        }
        /**
         * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResources {
            /**
             * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            limits?: {
                [key: string]: number | string;
            };
            /**
             * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            requests?: {
                [key: string]: number | string;
            };
        }
        /**
         * A label query over volumes to consider for binding.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelector {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressions[];
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: {
                [key: string]: string;
            };
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressions {
            /**
             * key is the label key that the selector applies to.
             */
            key: string;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: string;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: string[];
        }
        /**
         * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatus {
            /**
             * AccessModes contains the actual access modes the volume backing the PVC has. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: string[];
            /**
             * The storage resource within AllocatedResources tracks the capacity allocated to a PVC. It may be larger than the actual capacity when a volume expansion operation is requested. For storage quota, the larger value from allocatedResources and PVC.spec.resources is used. If allocatedResources is not set, PVC.spec.resources alone is used for quota calculation. If a volume expansion capacity request is lowered, allocatedResources is only lowered if there are no expansion operations in progress and if the actual volume capacity is equal or lower than the requested capacity. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            allocatedResources?: {
                [key: string]: number | string;
            };
            /**
             * Represents the actual resources of the underlying volume.
             */
            capacity?: {
                [key: string]: number | string;
            };
            /**
             * Current Condition of persistent volume claim. If underlying persistent volume is being resized then the Condition will be set to 'ResizeStarted'.
             */
            conditions?: outputs.elasticsearch.v1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditions[];
            /**
             * Phase represents the current phase of PersistentVolumeClaim.
             */
            phase?: string;
            /**
             * ResizeStatus stores status of resize operation. ResizeStatus is not set by default but when expansion is complete resizeStatus is set to empty string by resize controller or kubelet. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            resizeStatus?: string;
        }
        /**
         * PersistentVolumeClaimCondition contails details about state of pvc
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditions {
            /**
             * Last time we probed the condition.
             */
            lastProbeTime?: string;
            /**
             * Last time the condition transitioned from one status to another.
             */
            lastTransitionTime?: string;
            /**
             * Human-readable message indicating details about last transition.
             */
            message?: string;
            /**
             * Unique, this should be a short, machine understandable string that gives the reason for condition's last transition. If it reports "ResizeStarted" that means the underlying persistent volume is being resized.
             */
            reason?: string;
            status: string;
            /**
             * PersistentVolumeClaimConditionType is a valid value of PersistentVolumeClaimCondition.Type
             */
            type: string;
        }
        /**
         * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
         */
        interface ElasticsearchSpecPodDisruptionBudget {
            /**
             * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetMetadata;
            /**
             * Spec is the specification of the PDB.
             */
            spec?: outputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetSpec;
        }
        /**
         * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecPodDisruptionBudgetMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the PDB.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpec {
            /**
             * An eviction is allowed if at most "maxUnavailable" pods selected by "selector" are unavailable after the eviction, i.e. even in absence of the evicted pod. For example, one can prevent all voluntary evictions by specifying 0. This is a mutually exclusive setting with "minAvailable".
             */
            maxUnavailable?: number | string;
            /**
             * An eviction is allowed if at least "minAvailable" pods selected by "selector" will still be available after the eviction, i.e. even in the absence of the evicted pod.  So for example you can prevent all voluntary evictions by specifying "100%".
             */
            minAvailable?: number | string;
            /**
             * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
             */
            selector?: outputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetSpecSelector;
        }
        /**
         * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelector {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: outputs.elasticsearch.v1.ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressions[];
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: {
                [key: string]: string;
            };
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressions {
            /**
             * key is the label key that the selector applies to.
             */
            key: string;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: string;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: string[];
        }
        /**
         * RemoteCluster declares a remote Elasticsearch cluster connection.
         */
        interface ElasticsearchSpecRemoteClusters {
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running within the same k8s cluster.
             */
            elasticsearchRef?: outputs.elasticsearch.v1.ElasticsearchSpecRemoteClustersElasticsearchRef;
            /**
             * Name is the name of the remote cluster as it is set in the Elasticsearch settings. The name is expected to be unique for each remote clusters.
             */
            name: string;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running within the same k8s cluster.
         */
        interface ElasticsearchSpecRemoteClustersElasticsearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ElasticsearchSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.elasticsearch.v1.ElasticsearchSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ElasticsearchSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * Transport holds transport layer settings for Elasticsearch.
         */
        interface ElasticsearchSpecTransport {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.elasticsearch.v1.ElasticsearchSpecTransportService;
            /**
             * TLS defines options for configuring TLS on the transport layer.
             */
            tls?: outputs.elasticsearch.v1.ElasticsearchSpecTransportTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticsearchSpecTransportService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.elasticsearch.v1.ElasticsearchSpecTransportServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecTransportServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticsearchSpecTransportServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticsearchSpecTransportServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * elasticsearchSpecTransportServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticsearchSpecTransportServiceSpecPorts
         */
        function elasticsearchSpecTransportServiceSpecPortsProvideDefaults(val: ElasticsearchSpecTransportServiceSpecPorts): ElasticsearchSpecTransportServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticsearchSpecTransportServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.elasticsearch.v1.ElasticsearchSpecTransportServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticsearchSpecTransportServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS on the transport layer.
         */
        interface ElasticsearchSpecTransportTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the CA certificate and private key for generating node certificates. The referenced secret should contain the following:
             *  - `ca.crt`: The CA certificate in PEM format. - `ca.key`: The private key for the CA certificate in PEM format.
             */
            certificate?: outputs.elasticsearch.v1.ElasticsearchSpecTransportTlsCertificate;
            /**
             * OtherNameSuffix when defined will be prefixed with the Pod name and used as the common name, and the first DNSName, as well as an OtherName required by Elasticsearch in the Subject Alternative Name extension of each Elasticsearch node's transport TLS certificate. Example: if set to "node.cluster.local", the generated certificate will have its otherName set to "<pod_name>.node.cluster.local".
             */
            otherNameSuffix?: string;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated node transport TLS certificates.
             */
            subjectAltNames?: outputs.elasticsearch.v1.ElasticsearchSpecTransportTlsSubjectAltNames[];
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the CA certificate and private key for generating node certificates. The referenced secret should contain the following:
         *  - `ca.crt`: The CA certificate in PEM format. - `ca.key`: The private key for the CA certificate in PEM format.
         */
        interface ElasticsearchSpecTransportTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticsearchSpecTransportTlsSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * UpdateStrategy specifies how updates to the cluster should be performed.
         */
        interface ElasticsearchSpecUpdateStrategy {
            /**
             * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
             */
            changeBudget?: outputs.elasticsearch.v1.ElasticsearchSpecUpdateStrategyChangeBudget;
        }
        /**
         * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
         */
        interface ElasticsearchSpecUpdateStrategyChangeBudget {
            /**
             * MaxSurge is the maximum number of new pods that can be created exceeding the original number of pods defined in the specification. MaxSurge is only taken into consideration when scaling up. Setting a negative value will disable the restriction. Defaults to unbounded if not specified.
             */
            maxSurge?: number;
            /**
             * MaxUnavailable is the maximum number of pods that can be unavailable (not ready) during the update due to circumstances under the control of the operator. Setting a negative value will disable this restriction. Defaults to 1 if not specified.
             */
            maxUnavailable?: number;
        }
        /**
         * ElasticsearchStatus represents the observed state of Elasticsearch.
         */
        interface ElasticsearchStatus {
            /**
             * AvailableNodes is the number of available instances.
             */
            availableNodes?: number;
            /**
             * Conditions holds the current service state of an Elasticsearch cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            conditions?: outputs.elasticsearch.v1.ElasticsearchStatusConditions[];
            /**
             * ElasticsearchHealth is the health of the cluster as returned by the health API.
             */
            health?: string;
            /**
             * InProgressOperations represents changes being applied by the operator to the Elasticsearch cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            inProgressOperations?: outputs.elasticsearch.v1.ElasticsearchStatusInProgressOperations;
            /**
             * AssociationStatusMap is the map of association's namespaced name string to its AssociationStatus. For resources that have a single Association of a given type (for ex. single ES reference), this map contains a single entry.
             */
            monitoringAssociationStatus?: {
                [key: string]: string;
            };
            /**
             * ObservedGeneration is the most recent generation observed for this Elasticsearch cluster. It corresponds to the metadata generation, which is updated on mutation by the API Server. If the generation observed in status diverges from the generation in metadata, the Elasticsearch controller has not yet processed the changes contained in the Elasticsearch specification.
             */
            observedGeneration?: number;
            /**
             * ElasticsearchOrchestrationPhase is the phase Elasticsearch is in from the controller point of view.
             */
            phase?: string;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
        /**
         * Condition represents Elasticsearch resource's condition. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusConditions {
            lastTransitionTime?: string;
            message?: string;
            status: string;
            /**
             * ConditionType defines the condition of an Elasticsearch resource.
             */
            type: string;
        }
        /**
         * InProgressOperations represents changes being applied by the operator to the Elasticsearch cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperations {
            /**
             * DownscaleOperation provides details about in progress downscale operations. **This API is in technical preview and may be changed or removed in a future release.**
             */
            downscale: outputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsDownscale;
            /**
             * UpgradeOperation provides an overview of the pending or in progress changes applied by the operator to update the Elasticsearch nodes in the cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            upgrade: outputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpgrade;
            /**
             * UpscaleOperation provides an overview of in progress changes applied by the operator to add Elasticsearch nodes to the cluster. **This API is in technical preview and may be changed or removed in a future release.**
             */
            upscale: outputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpscale;
        }
        /**
         * DownscaleOperation provides details about in progress downscale operations. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsDownscale {
            lastUpdatedTime?: string;
            /**
             * Nodes which are scheduled to be removed from the cluster.
             */
            nodes?: outputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsDownscaleNodes[];
            /**
             * Stalled represents a state where no progress can be made. It is only available for clusters managed with the Elasticsearch shutdown API.
             */
            stalled?: boolean;
        }
        /**
         * DownscaledNode provides an overview of in progress changes applied by the operator to remove Elasticsearch nodes from the cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsDownscaleNodes {
            /**
             * Explanation provides details about an in progress node shutdown. It is only available for clusters managed with the Elasticsearch shutdown API.
             */
            explanation?: string;
            /**
             * Name of the Elasticsearch node that should be removed.
             */
            name: string;
            /**
             * Shutdown status as returned by the Elasticsearch shutdown API. If the Elasticsearch shutdown API is not available, the shutdown status is then inferred from the remaining shards on the nodes, as observed by the operator.
             */
            shutdownStatus: string;
        }
        /**
         * UpgradeOperation provides an overview of the pending or in progress changes applied by the operator to update the Elasticsearch nodes in the cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsUpgrade {
            lastUpdatedTime?: string;
            /**
             * Nodes that must be restarted for upgrade.
             */
            nodes?: outputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpgradeNodes[];
        }
        /**
         * UpgradedNode provides details about the status of nodes which are expected to be updated. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsUpgradeNodes {
            /**
             * Optional message to explain why a node may not be immediately restarted for upgrade.
             */
            message?: string;
            /**
             * Name of the Elasticsearch node that should be upgraded.
             */
            name: string;
            /**
             * Predicate is the name of the predicate currently preventing this node from being deleted for an upgrade.
             */
            predicate?: string;
            /**
             * Status states if the node is either in the process of being deleted for an upgrade, or blocked by a predicate or another condition stated in the message field.
             */
            status: string;
        }
        /**
         * UpscaleOperation provides an overview of in progress changes applied by the operator to add Elasticsearch nodes to the cluster. **This API is in technical preview and may be changed or removed in a future release.**
         */
        interface ElasticsearchStatusInProgressOperationsUpscale {
            lastUpdatedTime?: string;
            /**
             * Nodes expected to be added by the operator.
             */
            nodes?: outputs.elasticsearch.v1.ElasticsearchStatusInProgressOperationsUpscaleNodes[];
        }
        interface ElasticsearchStatusInProgressOperationsUpscaleNodes {
            /**
             * Optional message to explain why a node may not be immediately added.
             */
            message?: string;
            /**
             * Name of the Elasticsearch node that should be added to the cluster.
             */
            name: string;
            /**
             * NewNodeStatus states if a new node is being created, or if the upscale is delayed.
             */
            status: string;
        }
    }
    namespace v1beta1 {
        /**
         * ElasticsearchSpec holds the specification of an Elasticsearch cluster.
         */
        interface ElasticsearchSpec {
            /**
             * HTTP holds HTTP layer settings for Elasticsearch.
             */
            http?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttp;
            /**
             * Image is the Elasticsearch Docker image to deploy.
             */
            image?: string;
            /**
             * NodeSets allow specifying groups of Elasticsearch nodes sharing the same configuration and Pod templates.
             */
            nodeSets: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSets[];
            /**
             * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
             */
            podDisruptionBudget?: outputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudget;
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Elasticsearch.
             */
            secureSettings?: outputs.elasticsearch.v1beta1.ElasticsearchSpecSecureSettings[];
            /**
             * UpdateStrategy specifies how updates to the cluster should be performed.
             */
            updateStrategy?: outputs.elasticsearch.v1beta1.ElasticsearchSpecUpdateStrategy;
            /**
             * Version of Elasticsearch.
             */
            version?: string;
        }
        /**
         * HTTP holds HTTP layer settings for Elasticsearch.
         */
        interface ElasticsearchSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticsearchSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticsearchSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticsearchSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * elasticsearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticsearchSpecHttpServiceSpecPorts
         */
        function elasticsearchSpecHttpServiceSpecPortsProvideDefaults(val: ElasticsearchSpecHttpServiceSpecPorts): ElasticsearchSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticsearchSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ElasticsearchSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ElasticsearchSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.elasticsearch.v1beta1.ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticsearchSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * NodeSet is the specification for a group of Elasticsearch nodes sharing the same configuration and a Pod template.
         */
        interface ElasticsearchSpecNodeSets {
            /**
             * Config holds the Elasticsearch configuration.
             */
            config?: {
                [key: string]: any;
            };
            /**
             * Count of Elasticsearch nodes to deploy.
             */
            count: number;
            /**
             * Name of this set of nodes. Becomes a part of the Elasticsearch node.name setting.
             */
            name: string;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Pods belonging to this NodeSet.
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * VolumeClaimTemplates is a list of persistent volume claims to be used by each Pod in this NodeSet. Every claim in this list must have a matching volumeMount in one of the containers defined in the PodTemplate. Items defined here take precedence over any default claims added by the operator with the same name.
             */
            volumeClaimTemplates?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplates[];
        }
        /**
         * PersistentVolumeClaim is a user's request for and claim to a persistent volume
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplates {
            /**
             * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
             */
            apiVersion?: string;
            /**
             * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
             */
            kind?: string;
            /**
             * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
             */
            metadata?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadata;
            /**
             * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            spec?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpec;
            /**
             * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
             */
            status?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatus;
        }
        /**
         * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpec {
            /**
             * AccessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: string[];
            /**
             * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
             */
            dataSource?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSource;
            /**
             * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
             */
            dataSourceRef?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRef;
            /**
             * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
             */
            resources?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResources;
            /**
             * A label query over volumes to consider for binding.
             */
            selector?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelector;
            /**
             * Name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
             */
            storageClassName?: string;
            /**
             * volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec.
             */
            volumeMode?: string;
            /**
             * VolumeName is the binding reference to the PersistentVolume backing this claim.
             */
            volumeName?: string;
        }
        /**
         * This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSource {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: string;
            /**
             * Kind is the type of resource being referenced
             */
            kind: string;
            /**
             * Name is the name of resource being referenced
             */
            name: string;
        }
        /**
         * Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Alpha) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecDataSourceRef {
            /**
             * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
             */
            apiGroup?: string;
            /**
             * Kind is the type of resource being referenced
             */
            kind: string;
            /**
             * Name is the name of resource being referenced
             */
            name: string;
        }
        /**
         * Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecResources {
            /**
             * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            limits?: {
                [key: string]: number | string;
            };
            /**
             * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            requests?: {
                [key: string]: number | string;
            };
        }
        /**
         * A label query over volumes to consider for binding.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelector {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressions[];
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: {
                [key: string]: string;
            };
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesSpecSelectorMatchExpressions {
            /**
             * key is the label key that the selector applies to.
             */
            key: string;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: string;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: string[];
        }
        /**
         * Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatus {
            /**
             * AccessModes contains the actual access modes the volume backing the PVC has. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: string[];
            /**
             * The storage resource within AllocatedResources tracks the capacity allocated to a PVC. It may be larger than the actual capacity when a volume expansion operation is requested. For storage quota, the larger value from allocatedResources and PVC.spec.resources is used. If allocatedResources is not set, PVC.spec.resources alone is used for quota calculation. If a volume expansion capacity request is lowered, allocatedResources is only lowered if there are no expansion operations in progress and if the actual volume capacity is equal or lower than the requested capacity. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            allocatedResources?: {
                [key: string]: number | string;
            };
            /**
             * Represents the actual resources of the underlying volume.
             */
            capacity?: {
                [key: string]: number | string;
            };
            /**
             * Current Condition of persistent volume claim. If underlying persistent volume is being resized then the Condition will be set to 'ResizeStarted'.
             */
            conditions?: outputs.elasticsearch.v1beta1.ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditions[];
            /**
             * Phase represents the current phase of PersistentVolumeClaim.
             */
            phase?: string;
            /**
             * ResizeStatus stores status of resize operation. ResizeStatus is not set by default but when expansion is complete resizeStatus is set to empty string by resize controller or kubelet. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
             */
            resizeStatus?: string;
        }
        /**
         * PersistentVolumeClaimCondition contails details about state of pvc
         */
        interface ElasticsearchSpecNodeSetsVolumeClaimTemplatesStatusConditions {
            /**
             * Last time we probed the condition.
             */
            lastProbeTime?: string;
            /**
             * Last time the condition transitioned from one status to another.
             */
            lastTransitionTime?: string;
            /**
             * Human-readable message indicating details about last transition.
             */
            message?: string;
            /**
             * Unique, this should be a short, machine understandable string that gives the reason for condition's last transition. If it reports "ResizeStarted" that means the underlying persistent volume is being resized.
             */
            reason?: string;
            status: string;
            /**
             * PersistentVolumeClaimConditionType is a valid value of PersistentVolumeClaimCondition.Type
             */
            type: string;
        }
        /**
         * PodDisruptionBudget provides access to the default pod disruption budget for the Elasticsearch cluster. The default budget selects all cluster pods and sets `maxUnavailable` to 1. To disable, set `PodDisruptionBudget` to the empty value (`{}` in YAML).
         */
        interface ElasticsearchSpecPodDisruptionBudget {
            /**
             * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetMetadata;
            /**
             * Spec is the specification of the PDB.
             */
            spec?: outputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetSpec;
        }
        /**
         * ObjectMeta is the metadata of the PDB. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticsearchSpecPodDisruptionBudgetMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the PDB.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpec {
            /**
             * An eviction is allowed if at most "maxUnavailable" pods selected by "selector" are unavailable after the eviction, i.e. even in absence of the evicted pod. For example, one can prevent all voluntary evictions by specifying 0. This is a mutually exclusive setting with "minAvailable".
             */
            maxUnavailable?: number | string;
            /**
             * An eviction is allowed if at least "minAvailable" pods selected by "selector" will still be available after the eviction, i.e. even in the absence of the evicted pod.  So for example you can prevent all voluntary evictions by specifying "100%".
             */
            minAvailable?: number | string;
            /**
             * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
             */
            selector?: outputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetSpecSelector;
        }
        /**
         * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelector {
            /**
             * matchExpressions is a list of label selector requirements. The requirements are ANDed.
             */
            matchExpressions?: outputs.elasticsearch.v1beta1.ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressions[];
            /**
             * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
             */
            matchLabels?: {
                [key: string]: string;
            };
        }
        /**
         * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
         */
        interface ElasticsearchSpecPodDisruptionBudgetSpecSelectorMatchExpressions {
            /**
             * key is the label key that the selector applies to.
             */
            key: string;
            /**
             * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: string;
            /**
             * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
             */
            values?: string[];
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface ElasticsearchSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.elasticsearch.v1beta1.ElasticsearchSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface ElasticsearchSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * UpdateStrategy specifies how updates to the cluster should be performed.
         */
        interface ElasticsearchSpecUpdateStrategy {
            /**
             * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
             */
            changeBudget?: outputs.elasticsearch.v1beta1.ElasticsearchSpecUpdateStrategyChangeBudget;
        }
        /**
         * ChangeBudget defines the constraints to consider when applying changes to the Elasticsearch cluster.
         */
        interface ElasticsearchSpecUpdateStrategyChangeBudget {
            /**
             * MaxSurge is the maximum number of new pods that can be created exceeding the original number of pods defined in the specification. MaxSurge is only taken into consideration when scaling up. Setting a negative value will disable the restriction. Defaults to unbounded if not specified.
             */
            maxSurge?: number;
            /**
             * MaxUnavailable is the maximum number of pods that can be unavailable (not ready) during the update due to circumstances under the control of the operator. Setting a negative value will disable this restriction. Defaults to 1 if not specified.
             */
            maxUnavailable?: number;
        }
        /**
         * ElasticsearchStatus defines the observed state of Elasticsearch
         */
        interface ElasticsearchStatus {
            availableNodes?: number;
            /**
             * ElasticsearchHealth is the health of the cluster as returned by the health API.
             */
            health?: string;
            /**
             * ElasticsearchOrchestrationPhase is the phase Elasticsearch is in from the controller point of view.
             */
            phase?: string;
        }
    }
}
export declare namespace enterprisesearch {
    namespace v1 {
        /**
         * EnterpriseSearchSpec holds the specification of an Enterprise Search resource.
         */
        interface EnterpriseSearchSpec {
            /**
             * Config holds the Enterprise Search configuration.
             */
            config?: {
                [key: string]: any;
            };
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
             */
            configRef?: outputs.enterprisesearch.v1.EnterpriseSearchSpecConfigRef;
            /**
             * Count of Enterprise Search instances to deploy.
             */
            count?: number;
            /**
             * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.enterprisesearch.v1.EnterpriseSearchSpecElasticsearchRef;
            /**
             * HTTP holds the HTTP layer configuration for Enterprise Search resource.
             */
            http?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttp;
            /**
             * Image is the Enterprise Search Docker image to deploy.
             */
            image?: string;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Enterprise Search pods.
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Version of Enterprise Search.
             */
            version?: string;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
         */
        interface EnterpriseSearchSpecConfigRef {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface EnterpriseSearchSpecElasticsearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for Enterprise Search resource.
         */
        interface EnterpriseSearchSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface EnterpriseSearchSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface EnterpriseSearchSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface EnterpriseSearchSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface EnterpriseSearchSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for EnterpriseSearchSpecHttpServiceSpecPorts
         */
        function enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults(val: EnterpriseSearchSpecHttpServiceSpecPorts): EnterpriseSearchSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface EnterpriseSearchSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface EnterpriseSearchSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.enterprisesearch.v1.EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * EnterpriseSearchStatus defines the observed state of EnterpriseSearch
         */
        interface EnterpriseSearchStatus {
            /**
             * Association is the status of any auto-linking to Elasticsearch clusters.
             */
            associationStatus?: string;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: number;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: number;
            /**
             * Health of the deployment.
             */
            health?: string;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: string;
            /**
             * ExternalService is the name of the service associated to the Enterprise Search Pods.
             */
            service?: string;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
    }
    namespace v1beta1 {
        /**
         * EnterpriseSearchSpec holds the specification of an Enterprise Search resource.
         */
        interface EnterpriseSearchSpec {
            /**
             * Config holds the Enterprise Search configuration.
             */
            config?: {
                [key: string]: any;
            };
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
             */
            configRef?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecConfigRef;
            /**
             * Count of Enterprise Search instances to deploy.
             */
            count?: number;
            /**
             * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecElasticsearchRef;
            /**
             * HTTP holds the HTTP layer configuration for Enterprise Search resource.
             */
            http?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttp;
            /**
             * Image is the Enterprise Search Docker image to deploy.
             */
            image?: string;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Enterprise Search pods.
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Version of Enterprise Search.
             */
            version?: string;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Enterprise Search configuration. Configuration settings are merged and have precedence over settings specified in `config`.
         */
        interface EnterpriseSearchSpecConfigRef {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * ElasticsearchRef is a reference to the Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface EnterpriseSearchSpecElasticsearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for Enterprise Search resource.
         */
        interface EnterpriseSearchSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface EnterpriseSearchSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface EnterpriseSearchSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface EnterpriseSearchSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface EnterpriseSearchSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for EnterpriseSearchSpecHttpServiceSpecPorts
         */
        function enterpriseSearchSpecHttpServiceSpecPortsProvideDefaults(val: EnterpriseSearchSpecHttpServiceSpecPorts): EnterpriseSearchSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface EnterpriseSearchSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface EnterpriseSearchSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface EnterpriseSearchSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.enterprisesearch.v1beta1.EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface EnterpriseSearchSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * EnterpriseSearchStatus defines the observed state of EnterpriseSearch
         */
        interface EnterpriseSearchStatus {
            /**
             * Association is the status of any auto-linking to Elasticsearch clusters.
             */
            associationStatus?: string;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: number;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: number;
            /**
             * Health of the deployment.
             */
            health?: string;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: string;
            /**
             * ExternalService is the name of the service associated to the Enterprise Search Pods.
             */
            service?: string;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
    }
}
export declare namespace kibana {
    namespace v1 {
        /**
         * KibanaSpec holds the specification of a Kibana instance.
         */
        interface KibanaSpec {
            /**
             * Config holds the Kibana configuration. See: https://www.elastic.co/guide/en/kibana/current/settings.html
             */
            config?: {
                [key: string]: any;
            };
            /**
             * Count of Kibana instances to deploy.
             */
            count?: number;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.kibana.v1.KibanaSpecElasticsearchRef;
            /**
             * EnterpriseSearchRef is a reference to an EnterpriseSearch running in the same Kubernetes cluster. Kibana provides the default Enterprise Search UI starting version 7.14.
             */
            enterpriseSearchRef?: outputs.kibana.v1.KibanaSpecEnterpriseSearchRef;
            /**
             * HTTP holds the HTTP layer configuration for Kibana.
             */
            http?: outputs.kibana.v1.KibanaSpecHttp;
            /**
             * Image is the Kibana Docker image to deploy.
             */
            image?: string;
            /**
             * Monitoring enables you to collect and ship log and monitoring data of this Kibana. See https://www.elastic.co/guide/en/kibana/current/xpack-monitoring.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
             */
            monitoring?: outputs.kibana.v1.KibanaSpecMonitoring;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Kibana pods
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Kibana.
             */
            secureSettings?: outputs.kibana.v1.KibanaSpecSecureSettings[];
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Version of Kibana.
             */
            version: string;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface KibanaSpecElasticsearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * EnterpriseSearchRef is a reference to an EnterpriseSearch running in the same Kubernetes cluster. Kibana provides the default Enterprise Search UI starting version 7.14.
         */
        interface KibanaSpecEnterpriseSearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for Kibana.
         */
        interface KibanaSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.kibana.v1.KibanaSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.kibana.v1.KibanaSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface KibanaSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.kibana.v1.KibanaSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.kibana.v1.KibanaSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface KibanaSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface KibanaSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.kibana.v1.KibanaSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.kibana.v1.KibanaSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface KibanaSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * kibanaSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for KibanaSpecHttpServiceSpecPorts
         */
        function kibanaSpecHttpServiceSpecPortsProvideDefaults(val: KibanaSpecHttpServiceSpecPorts): KibanaSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.kibana.v1.KibanaSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface KibanaSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.kibana.v1.KibanaSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.kibana.v1.KibanaSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface KibanaSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.kibana.v1.KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * Monitoring enables you to collect and ship log and monitoring data of this Kibana. See https://www.elastic.co/guide/en/kibana/current/xpack-monitoring.html. Metricbeat and Filebeat are deployed in the same Pod as sidecars and each one sends data to one or two different Elasticsearch monitoring clusters running in the same Kubernetes cluster.
         */
        interface KibanaSpecMonitoring {
            /**
             * Logs holds references to Elasticsearch clusters which will receive log data from this Kibana.
             */
            logs?: outputs.kibana.v1.KibanaSpecMonitoringLogs;
            /**
             * Metrics holds references to Elasticsearch clusters which will receive monitoring data from this Kibana.
             */
            metrics?: outputs.kibana.v1.KibanaSpecMonitoringMetrics;
        }
        /**
         * Logs holds references to Elasticsearch clusters which will receive log data from this Kibana.
         */
        interface KibanaSpecMonitoringLogs {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: outputs.kibana.v1.KibanaSpecMonitoringLogsElasticsearchRefs[];
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface KibanaSpecMonitoringLogsElasticsearchRefs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * Metrics holds references to Elasticsearch clusters which will receive monitoring data from this Kibana.
         */
        interface KibanaSpecMonitoringMetrics {
            /**
             * ElasticsearchRefs is a reference to a list of monitoring Elasticsearch clusters running in the same Kubernetes cluster. Due to existing limitations, only a single Elasticsearch cluster is currently supported.
             */
            elasticsearchRefs?: outputs.kibana.v1.KibanaSpecMonitoringMetricsElasticsearchRefs[];
        }
        /**
         * ObjectSelector defines a reference to a Kubernetes object which can be an Elastic resource managed by the operator or a Secret describing an external Elastic resource not managed by the operator.
         */
        interface KibanaSpecMonitoringMetricsElasticsearchRefs {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface KibanaSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.kibana.v1.KibanaSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface KibanaSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * KibanaStatus defines the observed state of Kibana
         */
        interface KibanaStatus {
            /**
             * AssociationStatus is the status of any auto-linking to Elasticsearch clusters. This field is deprecated and will be removed in a future release. Use ElasticsearchAssociationStatus instead.
             */
            associationStatus?: string;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: number;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: number;
            /**
             * ElasticsearchAssociationStatus is the status of any auto-linking to Elasticsearch clusters.
             */
            elasticsearchAssociationStatus?: string;
            /**
             * EnterpriseSearchAssociationStatus is the status of any auto-linking to Enterprise Search.
             */
            enterpriseSearchAssociationStatus?: string;
            /**
             * Health of the deployment.
             */
            health?: string;
            /**
             * MonitoringAssociationStatus is the status of any auto-linking to monitoring Elasticsearch clusters.
             */
            monitoringAssociationStatus?: {
                [key: string]: string;
            };
            /**
             * ObservedGeneration is the most recent generation observed for this Kibana instance. It corresponds to the metadata generation, which is updated on mutation by the API Server. If the generation observed in status diverges from the generation in metadata, the Kibana controller has not yet processed the changes contained in the Kibana specification.
             */
            observedGeneration?: number;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: string;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
    }
    namespace v1beta1 {
        /**
         * KibanaSpec holds the specification of a Kibana instance.
         */
        interface KibanaSpec {
            /**
             * Config holds the Kibana configuration. See: https://www.elastic.co/guide/en/kibana/current/settings.html
             */
            config?: {
                [key: string]: any;
            };
            /**
             * Count of Kibana instances to deploy.
             */
            count?: number;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.kibana.v1beta1.KibanaSpecElasticsearchRef;
            /**
             * HTTP holds the HTTP layer configuration for Kibana.
             */
            http?: outputs.kibana.v1beta1.KibanaSpecHttp;
            /**
             * Image is the Kibana Docker image to deploy.
             */
            image?: string;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Kibana pods
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * SecureSettings is a list of references to Kubernetes secrets containing sensitive configuration options for Kibana.
             */
            secureSettings?: outputs.kibana.v1beta1.KibanaSpecSecureSettings[];
            /**
             * Version of Kibana.
             */
            version?: string;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface KibanaSpecElasticsearchRef {
            /**
             * Name of the Kubernetes object.
             */
            name: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for Kibana.
         */
        interface KibanaSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.kibana.v1beta1.KibanaSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.kibana.v1beta1.KibanaSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface KibanaSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.kibana.v1beta1.KibanaSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.kibana.v1beta1.KibanaSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface KibanaSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface KibanaSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.kibana.v1beta1.KibanaSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.kibana.v1beta1.KibanaSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface KibanaSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * kibanaSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for KibanaSpecHttpServiceSpecPorts
         */
        function kibanaSpecHttpServiceSpecPortsProvideDefaults(val: KibanaSpecHttpServiceSpecPorts): KibanaSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.kibana.v1beta1.KibanaSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface KibanaSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface KibanaSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.kibana.v1beta1.KibanaSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.kibana.v1beta1.KibanaSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface KibanaSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.kibana.v1beta1.KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface KibanaSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * SecretSource defines a data source based on a Kubernetes Secret.
         */
        interface KibanaSpecSecureSettings {
            /**
             * Entries define how to project each key-value pair in the secret to filesystem paths. If not defined, all keys will be projected to similarly named paths in the filesystem. If defined, only the specified keys will be projected to the corresponding paths.
             */
            entries?: outputs.kibana.v1beta1.KibanaSpecSecureSettingsEntries[];
            /**
             * SecretName is the name of the secret.
             */
            secretName: string;
        }
        /**
         * KeyToPath defines how to map a key in a Secret object to a filesystem path.
         */
        interface KibanaSpecSecureSettingsEntries {
            /**
             * Key is the key contained in the secret.
             */
            key: string;
            /**
             * Path is the relative file path to map the key to. Path must not be an absolute file path and must not contain any ".." components.
             */
            path?: string;
        }
        /**
         * KibanaStatus defines the observed state of Kibana
         */
        interface KibanaStatus {
            /**
             * AssociationStatus is the status of an association resource.
             */
            associationStatus?: string;
            availableNodes?: number;
            /**
             * KibanaHealth expresses the status of the Kibana instances.
             */
            health?: string;
        }
    }
}
export declare namespace maps {
    namespace v1alpha1 {
        /**
         * MapsSpec holds the specification of an Elastic Maps Server instance.
         */
        interface ElasticMapsServerSpec {
            /**
             * Config holds the ElasticMapsServer configuration. See: https://www.elastic.co/guide/en/kibana/current/maps-connect-to-ems.html#elastic-maps-server-configuration
             */
            config?: {
                [key: string]: any;
            };
            /**
             * ConfigRef contains a reference to an existing Kubernetes Secret holding the Elastic Maps Server configuration. Configuration settings are merged and have precedence over settings specified in `config`.
             */
            configRef?: outputs.maps.v1alpha1.ElasticMapsServerSpecConfigRef;
            /**
             * Count of Elastic Maps Server instances to deploy.
             */
            count?: number;
            /**
             * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
             */
            elasticsearchRef?: outputs.maps.v1alpha1.ElasticMapsServerSpecElasticsearchRef;
            /**
             * HTTP holds the HTTP layer configuration for Elastic Maps Server.
             */
            http?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttp;
            /**
             * Image is the Elastic Maps Server Docker image to deploy.
             */
            image?: string;
            /**
             * PodTemplate provides customisation options (labels, annotations, affinity rules, resource requests, and so on) for the Elastic Maps Server pods
             */
            podTemplate?: {
                [key: string]: any;
            };
            /**
             * ServiceAccountName is used to check access from the current resource to a resource (for ex. Elasticsearch) in a different namespace. Can only be used if ECK is enforcing RBAC on references.
             */
            serviceAccountName?: string;
            /**
             * Version of Elastic Maps Server.
             */
            version: string;
        }
        /**
         * ConfigRef contains a reference to an existing Kubernetes Secret holding the Elastic Maps Server configuration. Configuration settings are merged and have precedence over settings specified in `config`.
         */
        interface ElasticMapsServerSpecConfigRef {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * ElasticsearchRef is a reference to an Elasticsearch cluster running in the same Kubernetes cluster.
         */
        interface ElasticMapsServerSpecElasticsearchRef {
            /**
             * Name of an existing Kubernetes object corresponding to an Elastic resource managed by ECK.
             */
            name?: string;
            /**
             * Namespace of the Kubernetes object. If empty, defaults to the current namespace.
             */
            namespace?: string;
            /**
             * SecretName is the name of an existing Kubernetes secret that contains connection information for associating an Elastic resource not managed by the operator. The referenced secret must contain the following: - `url`: the URL to reach the Elastic resource - `username`: the username of the user to be authenticated to the Elastic resource - `password`: the password of the user to be authenticated to the Elastic resource - `ca.crt`: the CA certificate in PEM format (optional). This field cannot be used in combination with the other fields name, namespace or serviceName.
             */
            secretName?: string;
            /**
             * ServiceName is the name of an existing Kubernetes service which is used to make requests to the referenced object. It has to be in the same namespace as the referenced resource. If left empty, the default HTTP service of the referenced resource is used.
             */
            serviceName?: string;
        }
        /**
         * HTTP holds the HTTP layer configuration for Elastic Maps Server.
         */
        interface ElasticMapsServerSpecHttp {
            /**
             * Service defines the template for the associated Kubernetes Service object.
             */
            service?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpService;
            /**
             * TLS defines options for configuring TLS for HTTP.
             */
            tls?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpTls;
        }
        /**
         * Service defines the template for the associated Kubernetes Service object.
         */
        interface ElasticMapsServerSpecHttpService {
            /**
             * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
             */
            metadata?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceMetadata;
            /**
             * Spec is the specification of the service.
             */
            spec?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpec;
        }
        /**
         * ObjectMeta is the metadata of the service. The name and namespace provided here are managed by ECK and will be ignored.
         */
        interface ElasticMapsServerSpecHttpServiceMetadata {
            annotations?: {
                [key: string]: string;
            };
            finalizers?: string[];
            labels?: {
                [key: string]: string;
            };
            name?: string;
            namespace?: string;
        }
        /**
         * Spec is the specification of the service.
         */
        interface ElasticMapsServerSpecHttpServiceSpec {
            /**
             * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type. This field is beta-level and is only honored by servers that enable the ServiceLBNodePortControl feature.
             */
            allocateLoadBalancerNodePorts?: boolean;
            /**
             * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIP?: string;
            /**
             * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
             *  This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            clusterIPs?: string[];
            /**
             * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
             */
            externalIPs?: string[];
            /**
             * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
             */
            externalName?: string;
            /**
             * externalTrafficPolicy denotes if this Service desires to route external traffic to node-local or cluster-wide endpoints. "Local" preserves the client source IP and avoids a second hop for LoadBalancer and Nodeport type services, but risks potentially imbalanced traffic spreading. "Cluster" obscures the client source IP and may cause a second hop to another node, but should have good overall load-spreading.
             */
            externalTrafficPolicy?: string;
            /**
             * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type).
             */
            healthCheckNodePort?: number;
            /**
             * InternalTrafficPolicy specifies if the cluster internal traffic should be routed to all endpoints or node-local endpoints only. "Cluster" routes internal traffic to a Service to all endpoints. "Local" routes traffic to node-local endpoints only, traffic is dropped if no node-local endpoints are ready. The default value is "Cluster".
             */
            internalTrafficPolicy?: string;
            /**
             * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
             *  This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
             */
            ipFamilies?: string[];
            /**
             * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
             */
            ipFamilyPolicy?: string;
            /**
             * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
             */
            loadBalancerClass?: string;
            /**
             * Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
             */
            loadBalancerIP?: string;
            /**
             * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
             */
            loadBalancerSourceRanges?: string[];
            /**
             * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            ports?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpecPorts[];
            /**
             * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
             */
            publishNotReadyAddresses?: boolean;
            /**
             * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
             */
            selector?: {
                [key: string]: string;
            };
            /**
             * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
             */
            sessionAffinity?: string;
            /**
             * sessionAffinityConfig contains the configurations of session affinity.
             */
            sessionAffinityConfig?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfig;
            /**
             * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
             */
            type?: string;
        }
        /**
         * ServicePort contains information on service's port.
         */
        interface ElasticMapsServerSpecHttpServiceSpecPorts {
            /**
             * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and http://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
             */
            appProtocol?: string;
            /**
             * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
             */
            name?: string;
            /**
             * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
             */
            nodePort?: number;
            /**
             * The port that will be exposed by this service.
             */
            port: number;
            /**
             * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
             */
            protocol?: string;
            /**
             * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
             */
            targetPort?: number | string;
        }
        /**
         * elasticMapsServerSpecHttpServiceSpecPortsProvideDefaults sets the appropriate defaults for ElasticMapsServerSpecHttpServiceSpecPorts
         */
        function elasticMapsServerSpecHttpServiceSpecPortsProvideDefaults(val: ElasticMapsServerSpecHttpServiceSpecPorts): ElasticMapsServerSpecHttpServiceSpecPorts;
        /**
         * sessionAffinityConfig contains the configurations of session affinity.
         */
        interface ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfig {
            /**
             * clientIP contains the configurations of Client IP based session affinity.
             */
            clientIP?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfigClientIP;
        }
        /**
         * clientIP contains the configurations of Client IP based session affinity.
         */
        interface ElasticMapsServerSpecHttpServiceSpecSessionAffinityConfigClientIP {
            /**
             * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
             */
            timeoutSeconds?: number;
        }
        /**
         * TLS defines options for configuring TLS for HTTP.
         */
        interface ElasticMapsServerSpecHttpTls {
            /**
             * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
             *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
             */
            certificate?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpTlsCertificate;
            /**
             * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
             */
            selfSignedCertificate?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpTlsSelfSignedCertificate;
        }
        /**
         * Certificate is a reference to a Kubernetes secret that contains the certificate and private key for enabling TLS. The referenced secret should contain the following:
         *  - `ca.crt`: The certificate authority (optional). - `tls.crt`: The certificate (or a chain). - `tls.key`: The private key to the first certificate in the certificate chain.
         */
        interface ElasticMapsServerSpecHttpTlsCertificate {
            /**
             * SecretName is the name of the secret.
             */
            secretName?: string;
        }
        /**
         * SelfSignedCertificate allows configuring the self-signed certificate generated by the operator.
         */
        interface ElasticMapsServerSpecHttpTlsSelfSignedCertificate {
            /**
             * Disabled indicates that the provisioning of the self-signed certifcate should be disabled.
             */
            disabled?: boolean;
            /**
             * SubjectAlternativeNames is a list of SANs to include in the generated HTTP TLS certificate.
             */
            subjectAltNames?: outputs.maps.v1alpha1.ElasticMapsServerSpecHttpTlsSelfSignedCertificateSubjectAltNames[];
        }
        /**
         * SubjectAlternativeName represents a SAN entry in a x509 certificate.
         */
        interface ElasticMapsServerSpecHttpTlsSelfSignedCertificateSubjectAltNames {
            /**
             * DNS is the DNS name of the subject.
             */
            dns?: string;
            /**
             * IP is the IP address of the subject.
             */
            ip?: string;
        }
        /**
         * MapsStatus defines the observed state of Elastic Maps Server
         */
        interface ElasticMapsServerStatus {
            /**
             * AssociationStatus is the status of an association resource.
             */
            associationStatus?: string;
            /**
             * AvailableNodes is the number of available replicas in the deployment.
             */
            availableNodes?: number;
            /**
             * Count corresponds to Scale.Status.Replicas, which is the actual number of observed instances of the scaled object.
             */
            count?: number;
            /**
             * Health of the deployment.
             */
            health?: string;
            /**
             * Selector is the label selector used to find all pods.
             */
            selector?: string;
            /**
             * Version of the stack resource currently running. During version upgrades, multiple versions may run in parallel: this value specifies the lowest version currently running.
             */
            version?: string;
        }
    }
}
