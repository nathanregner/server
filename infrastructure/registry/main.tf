locals {
  name = "container-registry"
  labels = {
    app = local.name
  }

  registry_hosts = [
    "nregner.ddns.net",
    "10.0.1.1"
  ]
  registry_port     = 31500
  registry_username = "nregner"

  volume_size = "20Gi"
}

resource "kubernetes_namespace" "registry" {
  metadata {
    name = local.name
  }
}

resource "random_password" "password" {
  length = 30
}

resource "kubernetes_secret" "htpasswd" {
  metadata {
    generate_name = "htpasswd"
    namespace     = kubernetes_namespace.registry.metadata.0.name
  }
  data = {
    "htpasswd" = "${local.registry_username}:${bcrypt(random_password.password.result)}"
  }
}

resource "kubernetes_deployment" "registry" {
  metadata {
    name      = local.name
    namespace = kubernetes_namespace.registry.metadata.0.name
  }
  spec {
    selector {
      match_labels = local.labels
    }
    template {
      metadata {
        labels = local.labels
      }
      spec {
        container {
          name  = "registry"
          image = "registry:2.7.1"
          port {
            container_port = 5000
          }
          readiness_probe {
            http_get {
              path   = "/"
              port   = 5000
              scheme = "HTTP"
            }
          }

          env {
            name  = "REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY"
            value = "/var/lib/registry"
          }
          env {
            name  = "REGISTRY_AUTH"
            value = "htpasswd"
          }
          env {
            name  = "REGISTRY_AUTH_HTPASSWD_REALM"
            value = "Registry Realm"
          }
          env {
            name  = "REGISTRY_AUTH_HTPASSWD_PATH"
            value = "/auth/htpasswd"
          }

          volume_mount {
            name       = "htpasswd"
            mount_path = "/auth"
          }
          volume_mount {
            name       = "data"
            mount_path = "/var/lib/registry"
          }
        }
        volume {
          name = "htpasswd"
          secret {
            secret_name = kubernetes_secret.htpasswd.metadata.0.name
          }
        }
        volume {
          name = "data"
          host_path {
            path = "/var/lib/registry"
            type = "DirectoryOrCreate"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "registry" {
  metadata {
    name      = local.name
    namespace = kubernetes_namespace.registry.metadata.0.name
  }
  spec {
    selector = local.labels
    type     = "NodePort"
    port {
      port      = 5000
      node_port = 31500
    }
  }
}

data "kubernetes_all_namespaces" "all" {
}

resource "kubernetes_secret" "login" {
  for_each = toset(data.kubernetes_all_namespaces.all.namespaces)
  metadata {
    generate_name = "regcred"
    namespace     = each.value
  }
  data = {
    ".dockerconfigjson" = jsonencode({
      "auths" : { for host in local.registry_hosts :
        "${host}:${local.registry_port}" => {
          "auth" : base64encode("${local.registry_username}:${random_password.password.result}")
        }
      }
    })
  }
  type = "kubernetes.io/dockerconfigjson"
}

resource "kubernetes_default_service_account" "default" {
  for_each = toset(data.kubernetes_all_namespaces.all.namespaces)
  metadata {
    namespace = each.value
  }
  image_pull_secret {
    name = kubernetes_secret.login[each.key].metadata.0.name
  }
}

output "password" {
  value     = random_password.password.result
  sensitive = true
}
