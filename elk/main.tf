resource "kubernetes_namespace" "namespace" {
  metadata {
    name = var.namespace
  }
}

//resource "kubernetes_pod" "counter" {
//  metadata {
//    name      = "counter"
//    namespace = var.namespace
//  }
//  spec {
//    container {
//      name  = "count"
//      image = "busybox"
//      args  = ["/bin/sh", "-c", "i=0; while true; do echo \"$i: $(date)\"; i=$((i+1)); sleep 1; done"]
//    }
//    termination_grace_period_seconds = 0
//  }
//}
//
//resource "kubernetes_pod" "test" {
//  metadata {
//    name      = "test"
//    namespace = var.namespace
//  }
//  spec {
//    container {
//      name  = "curl"
//      image = "curlimages/curl"
//      args  = ["/bin/sh", "-c", "i=0; while true; do curl http://${kubernetes_service.elasticsearch.spec[0].cluster_ip}:9200/_cluster/state\\?pretty; i=$((i+1)); sleep 1; done"]
//    }
//    termination_grace_period_seconds = 0
//  }
//}
