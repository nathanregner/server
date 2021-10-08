locals {
  name      = "httpbin"
  namespace = local.name
  labels    = { app = local.name }
}

resource "kubernetes_namespace" "httpbin" {
  metadata {
    name = local.namespace
  }
}

resource "kubernetes_service" "httpbin" {
  metadata {
    name      = local.name
    namespace = local.namespace
    labels    = local.labels
  }
  spec {
    port {
      name        = "http"
      port        = 8000
      target_port = 80
    }
    selector = local.labels
  }
}

resource "kubernetes_deployment" "httpbin" {
  metadata {
    name      = local.name
    namespace = local.namespace
    labels    = local.labels
  }
  spec {
    replicas = 1
    selector { match_labels = local.labels }
    template {
      metadata { labels = local.labels }
      spec {
        restart_policy = "Always"
        container {
          name  = "httpbin"
          image = "docker.io/kennethreitz/httpbin"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

module "reverse_proxy" {
  source     = "../modules/reverse-proxy"
  depends_on = [kubernetes_namespace.httpbin]

  name      = local.name
  namespace = local.namespace
  labels    = local.labels
  host      = kubernetes_service.httpbin.metadata[0].name
  path      = "/httpbin"
  port      = 8000
}