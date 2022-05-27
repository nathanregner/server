import * as k8s from "@pulumi/kubernetes";
import * as pgo from "../crds/postgresoperator";

// https://access.crunchydata.com/documentation/postgres-operator/v5/quickstart/
export class PgoOperator {
  constructor() {
    // const ns = new k8s.kustomize.Directory("namespace", {
    //   directory: "./pgo/postgres-operator/kustomize/install/namespace",
    // });
    const ns = new k8s.core.v1.Namespace("postgres-operator", {
      metadata: { name: "postgres-operator" },
    });
    const operator = new k8s.kustomize.Directory(
      "operator",
      { directory: "./pgo/postgres-operator/kustomize/install/default" },
      { dependsOn: [ns] }
    );

    this.createTestCluster();
  }

  createTestCluster() {
    const pv = new k8s.core.v1.PersistentVolume("data", {
      metadata: { name: "pg-data" },
      spec: {
        accessModes: ["ReadWriteOnce"],
        capacity: { storage: "25Gi" },
        storageClassName: "local-path",
        hostPath: {
          path: "/tmp/pg-data",
          type: "DirectoryOrCreate",
        },
      },
    });
    const pvb = new k8s.core.v1.PersistentVolume("backup", {
      metadata: { name: "pg-backup" },
      spec: {
        accessModes: ["ReadWriteOnce"],
        capacity: { storage: "25Gi" },
        storageClassName: "local-path",
        hostPath: {
          path: "/tmp/pg-backup",
          type: "DirectoryOrCreate",
        },
      },
    });

    return new pgo.v1beta1.PostgresCluster("test-cluster", {
      metadata: { name: "test" },
      spec: {
        image:
          "registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi8-14.2-1",
        postgresVersion: 14,
        instances: [
          {
            name: "instance1",
            dataVolumeClaimSpec: {
              accessModes: ["ReadWriteOnce"],
              resources: { requests: { storage: "1Gi" } },
              selector: {
                matchExpressions: [
                  { key: "name", operator: "In", values: [pv.metadata.name] },
                ],
              },
            },
          },
        ],
        backups: {
          pgbackrest: {
            image:
              "registry.developers.crunchydata.com/crunchydata/crunchy-pgbackrest:ubi8-2.38-0",
            repos: [
              {
                name: "repo1",
                volume: {
                  volumeClaimSpec: {
                    accessModes: ["ReadWriteOnce"],
                    resources: { requests: { storage: "1Gi" } },
                    selector: {
                      matchExpressions: [
                        {
                          key: "name",
                          operator: "In",
                          values: [pvb.metadata.name],
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    });
  }
}
