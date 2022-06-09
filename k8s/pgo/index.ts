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
    /*
    const storageClass = new k8s.storage.v1.StorageClass("local", {
      metadata: { name: "local", labels: { type: "data" } },
      provisioner: "kubernetes.io/no-provisioner",
      reclaimPolicy: "Retain",
      volumeBindingMode: "WaitForFirstConsumer",
      allowVolumeExpansion: true,
    });
    const dataVolume = new k8s.core.v1.PersistentVolume("data", {
      metadata: { name: "pg-data" },
      spec: {
        accessModes: ["ReadWriteOnce"],
        capacity: { storage: "25Gi" },
        persistentVolumeReclaimPolicy: "Retain",
        storageClassName: storageClass.metadata.name,
        local: { path: "/tmp/pg-data" },
        nodeAffinity: {
          required: {
            nodeSelectorTerms: [
              {
                matchExpressions: [
                  {
                    key: "kubernetes.io/hostname",
                    operator: "In",
                    values: ["my-node"],
                  },
                ],
              },
            ],
          },
        },
        // hostPath: {
        //   path: "/tmp/pg-data",
        //   type: "DirectoryOrCreate",
        // },
        // volumeMode: "Filesystem",
      },
    });

    // new k8s.core.v1.PersistentVolumeClaim("data-claim", {
    //   metadata: { name: "data-claim" },
    //   spec: {
    //     accessModes: ["ReadWriteOnce"],
    //     storageClassName: storageClass.metadata.name,
    //     resources: { requests: { storage: "5Gi" } },
    //   },
    // });

    const backupVolume = new k8s.core.v1.PersistentVolume("backup", {
      metadata: { name: "pg-backup" },
      spec: {
        accessModes: ["ReadWriteOnce"],
        capacity: { storage: "25Gi" },
        persistentVolumeReclaimPolicy: "Retain",
        storageClassName: storageClass.metadata.name,
        local: { path: "/tmp/pg-backup" },
        nodeAffinity: {
          required: {
            nodeSelectorTerms: [
              {
                matchExpressions: [
                  {
                    key: "kubernetes.io/hostname",
                    operator: "In",
                    values: ["my-node"],
                  },
                ],
              },
            ],
          },
        },
        // hostPath: {
        //   path: "/tmp/pg-data",
        //   type: "DirectoryOrCreate",
        // },
        // volumeMode: "Filesystem",
      },
    });
*/

    return new pgo.v1beta1.PostgresCluster("craigslist-cluster", {
      metadata: { name: "craigslist" },
      spec: {
        postgresVersion: 14,
        postGISVersion: "3.1",
        users: [
          { databases: ["craigslist"], name: "postgres", options: "SUPERUSER" },
        ],
        instances: [
          {
            name: "instance1",
            dataVolumeClaimSpec: {
              accessModes: ["ReadWriteOnce"],
              resources: { requests: { storage: "1Gi" } },
              // storageClassName: dataVolume.spec.storageClassName,
              // selector: {
              //   matchLabels: { type: "data" },
              //   // matchExpressions: [
              //   //   {
              //   //     key: "name",
              //   //     operator: "In",
              //   //     values: [dataVolume.metadata.name],
              //   //   },
              //   // ],
              // },
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
                    // storageClassName: backupVolume.spec.storageClassName,
                    // selector: {
                    //   matchExpressions: [
                    //     {
                    //       key: "name",
                    //       operator: "In",
                    //       values: [backupVolume.metadata.name],
                    //     },
                    //   ],
                    // },
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
