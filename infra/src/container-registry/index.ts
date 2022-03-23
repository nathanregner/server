import { Construct } from "constructs";
import { Fn, TerraformStack } from "cdktf";
import * as k8s from "@cdktf/provider-kubernetes";
import { k8sBackend, k8sProvider } from "../common";
import { Password, RandomProvider } from "../../.gen/providers/random";

export class ContainerRegistry extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, "container-registry");

    // providers/backend
    new RandomProvider(this, "random");
    k8sProvider(this);
    k8sBackend(this, "container-registry");

    const username = "nregner";

    const ns = new k8s.Namespace(this, "ns", {
      metadata: { name: "container-registry" },
    });
    const port = 5000;
    const nodePort = 31500;
    const name = "container-registry"; // TODO: From service....
    const registryHosts = [
      `nregner.ddns.net:${nodePort}`,
      `nregner.net:${nodePort}`,
      `${name}.${ns.metadata.name}.svc.cluster.local:${port}`,
    ];

    const password = new Password(this, "password", { length: 32 });
    const htpasswd = new k8s.Secret(this, "htpasswd", {
      metadata: {
        namespace: ns.metadata.name!!,
        generateName: "htpasswd",
      },
      data: {
        htpasswd: `${username}:${Fn.bcrypt(password.result)}`,
      },
    });

    const allNs = new k8s.DataKubernetesAllNamespaces(this, "all-ns", {});

    const regcred = new k8s.Secret(this, "regcred", {
      metadata: {
        namespace: ns.metadata.name!!,
        generateName: "regcred",
      },
      type: "kubernetes.io/dockerconfigjson",
      data: {
        ".dockerconfigjson": Fn.jsonencode(
          registryHosts.reduce((acc, host) => {
            const auth = Fn.base64encode(`${username}:${password.result}`);
            acc[host] = { auth };
            return acc;
          }, {} as any)
        ),
      },
    });

    for (const namespace of allNs.namespaces) {
      console.log(namespace);
      // new k8s.DefaultServiceAccount(this, `${namespace}-default-svc-account`, {
      //   metadata: { namespace },
      //   imagePullSecret: [{ name: regcred.metadata.name }],
      // });
    }

    const labels = {
      app: "container-registry",
    };
    const metadata = {
      namespace: ns.metadata.name!!,
      name: "container-registry",
      labels,
    };
    const container = {
      name: "registry",
      image: "registry:2.7.1",
      port: [{ containerPort: 5000 }],
      readinessProbe: {
        httpGet: { path: "/", port: "5000", scheme: "HTTP" },
      },
      env: env({
        REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: "/var/lib/registry",
        REGISTRY_AUTH: "htpasswd",
        REGISTRY_AUTH_HTPASSWD_REALM: "Registry Realm",
        REGISTRY_AUTH_HTPASSWD_PATH: "/auth/htpasswd",
      }),
      volumeMount: [
        { name: "htpasswd", mountPath: "/auth" },
        { name: "data", mountPath: "/var/lib/registry" },
      ],
    };
    new k8s.Deployment(this, "container-registry-deployment", {
      metadata,
      spec: {
        selector: { matchLabels: labels },
        template: {
          metadata,
          spec: {
            container: [container],
            volume: [
              {
                name: "htpassws",
                secret: { secretName: htpasswd.metadata.name },
              },
              {
                name: "data",
                hostPath: {
                  path: "/var/lib/registry",
                  type: "DirectoryOrCreate",
                },
              },
            ],
          },
        },
      },
    });
  }
}

type Env = Record<string, string>;
function env(env: Env) {
  return Object.entries(env).map(([name, value]) => ({ name, value }));
}
