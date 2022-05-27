import * as k8s from "@pulumi/kubernetes";
import { acid } from "../crds";

function minimalCluster() {
  const labels = { app: "acid-minimal-cluster-pgdata" };
  const pv = new k8s.core.v1.PersistentVolume("data", {
    metadata: { name: "pg", labels },
    spec: {
      accessModes: ["ReadWriteOnce"],
      capacity: { storage: "25Gi" },
      storageClassName: "local-path",
      hostPath: {
        path: "/tmp/pg",
        type: "DirectoryOrCreate",
      },
    },
  });

  new acid.v1.Postgresql("acid", {
    metadata: { name: "acid-minimal-cluster" },
    spec: {
      postgresql: { version: "14" },
      teamId: "acid",
      volume: { size: "10Gi", selector: { matchLabels: labels } },
      numberOfInstances: 1,
      users: {
        postgres: ["superuser", "createdb"],
        foo_user: [],
      },
      databases: {
        foo: "postgres",
      },
      preparedDatabases: {
        bar: {},
      },
    },
  });
}

export function createPostgresOperator() {
  // manifests([
  //   "api-service.yaml",
  //   "configmap.yaml",
  //   "operator-service-account-rbac.yaml",
  //   "postgres-operator.yaml",
  // ]);

  console.log("create");
  // new k8s.helm.v3.Chart("postgres-operator", {
  //   path: "../infrastructure/postgres/postgres-operator/charts/postgres-operator",
  // });
  new k8s.kustomize.Directory("postgres-operator", {
    directory: "../infrastructure/postgres/postgres-operator/manifests",
  });

  minimalCluster();
}

function manifests(names: string[]) {
  for (const name of names) {
    new k8s.yaml.ConfigFile(name, { file: `./pg/manifests/${name}` });
  }
}
