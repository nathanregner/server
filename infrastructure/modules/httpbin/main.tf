resource "kubernetes_pod" "httpbin" {
  metadata {
    name          = "httpbin"
    generate_name = "httpbin-"
    namespace     = var.namespace
  }
  spec {
    restart_policy = "Always"
    container {
      name  = "httpbin"
      image = "kennethreitz/httpbin"
    }
  }
}

variable "namespace" {
  type = string
}
