resource "kubernetes_service" "kibana" {
  metadata {
    name      = "kibana"
    namespace = var.namespace
    labels    = { app = "kibana" }
  }
  spec {
    port {
      port = 5601
    }
    selector = { app = "kibana" }
  }
}

resource "kubernetes_deployment" "kibana" {
  metadata {
    name      = "kibana"
    namespace = var.namespace
    labels    = { app = "kibana" }
  }
  spec {
    replicas = 1
    selector {
      match_labels = { app = "kibana" }
    }
    template {
      metadata {
        labels = { app = "kibana" }
      }
      spec {
        container {
          name  = "kibana"
          image = "docker.elastic.co/kibana/kibana-oss:7.2.0"
          env {
            name  = "ELASTICSEARCH_URL"
            value = "http://elasticsearch:9200"
          }
          port {
            container_port = 5601
          }
        }
      }
    }
  }
}
