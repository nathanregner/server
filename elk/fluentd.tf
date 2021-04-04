resource "kubernetes_service_account" "fluentd" {
  metadata {
    name      = "fluentd"
    namespace = var.namespace
    labels    = { app = "fluentd" }
  }
}

resource "kubernetes_cluster_role" "fluentd" {
  metadata {
    name   = "fluentd"
    labels = { app = "fluentd" }
  }
  rule {
    api_groups = [""]
    resources  = ["pods", "namespaces"]
    verbs      = ["get", "list", "watch"]
  }
}

resource "kubernetes_cluster_role_binding" "fluentd" {
  metadata {
    name   = "fluentd"
    labels = { app = "fluentd" }
  }
  role_ref {
    kind      = "ClusterRole"
    name      = "fluentd"
    api_group = "rbac.authorization.k8s.io"
  }
  subject {
    kind      = "ServiceAccount"
    name      = "fluetnd"
    namespace = var.namespace
  }
}

resource "kubernetes_daemonset" "fluentd" {
  metadata {
    name      = "fluentd"
    namespace = var.namespace
    labels    = { app = "fluentd" }
  }
  spec {
    selector {
      match_labels = { app = "fluentd" }
    }
    template {
      metadata {
        labels = { app = "fluentd" }
      }
      spec {
        service_account_name = kubernetes_service_account.fluentd.metadata[0].name
        toleration {
          key    = "node-role.kubernetes.io/master"
          effect = "NoSchedule"
        }
        container {
          name = "fluentd"
          // https://hub.docker.com/r/fluent/fluentd-kubernetes-daemonset/
          image = "fluent/fluentd-kubernetes-daemonset:v1.12.2-debian-elasticsearch7-1.1"
          env {
            name  = "FLUENT_ELASTICSEARCH_HOST"
            value = kubernetes_service.elasticsearch.spec[0].cluster_ip
          }
          env {
            name  = "FLUENT_ELASTICSEARCH_PORT"
            value = "9200"
          }
          env {
            name  = "FLUENT_ELASTICSEARCH_SCHEME"
            value = "http"
          }
          env {
            name  = "FLUENTD_SYSTEMD_CONF"
            value = "disable"
          }
          //          TODO
          //          resources {
          //            limits {
          //              memory = "512Mi"
          //            }
          //            requests {
          //              cpu    = "100m"
          //              memory = "200Mi"
          //            }
          //          }
          volume_mount {
            name       = "var-log"
            mount_path = "/var/log"
          }
          volume_mount {
            name       = "var-lib-docker-containers"
            mount_path = "/var/lib/docker/containers"
            read_only  = true
          }
        }
        volume {
          name = "var-log"
          host_path {
            path = "/var/log/containers"
          }
        }
        volume {
          name = "var-lib-docker-containers"
          host_path {
            path = "/var/lib/docker/containers"
          }
        }
      }
    }
  }
}
