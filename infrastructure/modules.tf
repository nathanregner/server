locals {
  name      = "elasticsearch"
  namespace = "default"
}

resource "kubernetes_stateful_set" "elasticsearch" {
  metadata {
    name      = local.name
    namespace = local.namespace
    labels    = { app = "elasticsearch" }
  }
  spec {
    service_name = local.name
    replicas     = 1
    selector {
      match_labels = { app = "elasticsearch" }
    }
    template {
      metadata {
        labels = { app = "elasticsearch" }
      }
      spec {
        container {
          name  = local.name
          image = "elasticsearch:7.1.1"
          //          port {
          //            container_port = 9200
          //            protocol       = "TCP"
          //          }
        }
        volume {
          name = "data"
        }
      }
    }
  }
}
