resource "kubernetes_service" "elasticsearch" {
  metadata {
    name      = "elasticsearch"
    namespace = var.namespace
    labels    = { app = "elasticsearch" }
  }
  spec {
    selector = { app = "elasticsearch" }
    port {
      port = 9200
      name = "rest"
    }
    port {
      port = 9300
      name = "inter-node"
    }
  }
}

resource "kubernetes_stateful_set" "elasticsearch" {
  metadata {
    name      = "elasticsearch"
    namespace = var.namespace
  }
  spec {
    service_name = "elasticsearch"
    selector {
      match_labels = { app = "elasticsearch" }
    }
    template {
      metadata {
        labels = { app = "elasticsearch" }
      }
      spec {
        container {
          name  = "elasticsearch"
          image = "elasticsearch:7.12.0"
          port {
            container_port = 9200
            name           = "rest"
          }
          port {
            container_port = 9300
            name           = "inter-node"
          }
          //          TODO
          //          volume_mount {
          //            mount_path = "/usr/share/elasticsearch/data"
          //            name       = "data"
          //          }
          env {
            name  = "cluster.name"
            value = "k8s-logs"
          }
          env {
            name = "node.name"
            value_from {
              field_ref {
                field_path = "metadata.name"
              }
            }
          }
          env {
            name  = "network.host"
            value = "0.0.0.0"
          }
          env {
            name  = "discovery.type"
            value = "single-node"
          }
          env {
            name  = "ES_JAVA_OPTS"
            value = var.java_opts
          }
        }

        // TODO
        //        init_container {
        //          name    = "filesystem-permissions"
        //          image   = "busybox"
        //          command = ["sh", "-c", "chown -R 1000:1000 /usr/share/elasticsearch/data"]
        //          security_context {
        //            privileged = true
        //          }
        //          volume_mount {
        //            mount_path = "/usr/share/elasticsearch/data"
        //            name       = "data"
        //          }
        //        }
        init_container {
          name    = "increase-vm-max-map"
          image   = "busybox"
          command = ["sysctl", "-w", "vm.max_map_count=262144"]
          security_context {
            privileged = true
          }
        }
        init_container {
          name    = "increase-fd-ulimit"
          image   = "busybox"
          command = ["sh", "-c", "ulimit -n 65536"]
          security_context {
            privileged = true
          }
        }
      }
    }

    // TODO
    //    volume_claim_template {
    //      metadata {
    //        name = "data"
    //        labels = {
    //          app = "elasticsearch"
    //        }
    //      }
    //      spec {
    //        access_modes       = ["ReadWriteOnce"]
    //        storage_class_name = "local-storage"
    //        resources {
    //          requests = {
    //            storage = var.storage
    //          }
    //        }
    //      }
    //    }
  }
}

//resource "kubernetes_persistent_volume_claim" "elasticsearch" {
//  metadata {
//    generate_name = "elasticsearch"
//  }
//  spec {
//    access_modes = ["ReadWriteOnce"]
//    resources {
//      requests = {
//        storage = "100Gi"
//      }
//    }
//  }
//}
//
//resource "kubernetes_persistent_volume" "elasticsearch" {
//  metadata {
//    name = "elasticsearch"
//  }
//  spec {
//    access_modes = ["ReadWriteOnce"]
//    capacity = {}
//    persistent_volume_source {}
//  }
//}
