resource "kubernetes_secret" "password" {
  metadata {
    generate_name = "no-ip-"
    namespace     = var.namespace
  }
  type = "kubernetes.io/basic-auth"
  data = {
    username = var.username
    password = var.password
  }
}

resource "kubernetes_cron_job" "cron_job" {
  metadata {
    generate_name = "no-ip-update-"
    namespace     = var.namespace
  }
  spec {
    schedule                      = "*/15 * * * *"
    concurrency_policy            = "Forbid"
    successful_jobs_history_limit = 1
    failed_jobs_history_limit     = 1

    job_template {
      metadata {}
      spec {
        backoff_limit = 0
        template {
          metadata {}
          spec {
            restart_policy = "Never"

            container {
              name  = "no-ip"
              image = "curlimages/curl"
              command = [
                "/bin/sh",
                "-c",
                <<EOT
                curl --silent --show-error --fail \
                  -u "$NO_IP_USERNAME:$NO_IP_PASSWORD" \
                  "https://dynupdate.no-ip.com/nic/update?hostname=$NO_IP_DOMAIN"
                EOT
              ]
              env {
                name  = "NO_IP_DOMAIN"
                value = join(",", var.domains)
              }
              env {
                name  = "NO_IP_USERNAME"
                value = var.username
              }
              env {
                name = "NO_IP_PASSWORD"
                value_from {
                  secret_key_ref {
                    name = kubernetes_secret.password.metadata[0].name
                    key  = "password"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
