locals {
  name      = "container-registry"
  namespace = local.name
  labels    = {
    app = local.name
  }

  container_port    = 5000
  node_port         = 31500
  registry_hosts    = [
    "nregner.ddns.net:${local.node_port}",
    "nregner.net:${local.node_port}",
    "${local.name}.${local.namespace}.svc.cluster.local:${local.container_port}",
    "10.0.1.1:${local.node_port}",
  ]
  registry_username = "nregner"

  volume_host_path = "/var/lib/registry"
}


resource "kubernetes_namespace" "container_registry" {
  metadata {
    name = local.namespace
  }
}

resource "kubernetes_config_map" "config" {
  metadata {
    namespace = kubernetes_namespace.container_registry.metadata.0.name
    generate_name = "config"
  }
}

resource "random_password" "password" {
  length = 30
}

resource "kubernetes_secret" "htpasswd" {
  metadata {
    namespace     = kubernetes_namespace.container_registry.metadata.0.name
    generate_name = "htpasswd"
  }
  data = {
    "htpasswd" = "${local.registry_username}:${bcrypt(random_password.password.result)}"
  }
}

resource "kubernetes_deployment" "container_registry" {
  metadata {
    name      = local.name
    namespace = kubernetes_namespace.container_registry.metadata.0.name
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
            container_port = local.container_port
          }
          readiness_probe {
            http_get {
              path   = "/"
              port   = local.container_port
              scheme = "HTTP"
            }
          }
          liveness_probe {
            http_get {
              path   = "/"
              port   = local.container_port
              scheme = "HTTP"
            }
          }

          # https://docs.docker.com/registry/configuration/
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
          # env {
          #   name  = "REGISTRY_PROXY_REMOTEURL"
          #   value = "https://registry-1.docker.io"
          # }

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
            path = local.volume_host_path
            type = "DirectoryOrCreate"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "cluster_ip" {
  metadata {
    name      = local.name
    namespace = kubernetes_namespace.container_registry.metadata.0.name
  }
  spec {
    selector = local.labels
    port {
      port = local.container_port
    }
  }
}

resource "kubernetes_service" "node_port" {
  metadata {
    name      = "${local.name}-node-port"
    namespace = kubernetes_namespace.container_registry.metadata.0.name
  }
  spec {
    selector = local.labels
    type     = "NodePort"
    port {
      port      = local.container_port
      node_port = local.node_port
    }
  }
}

