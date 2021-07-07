terraform {
  backend "kubernetes" {
    secret_suffix    = "registry"
    load_config_file = true
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}
provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

locals {
  name      = "container-registry"
  namespace = local.name
  labels = {
    app = local.name
  }
}

resource "kubernetes_namespace" "registry" {
  metadata {
    name = local.namespace
  }
}

resource "random_password" "password" {
  length = 30
}

resource "helm_release" "registry" {
  name       = "registry"
  namespace  = local.namespace
  repository = "https://helm.twun.io"
  chart      = "docker-registry"

  values = [file("chart_values.yaml")]

  set {
    name  = "secrets.htpasswd"
    value = <<EOF
nregner:${bcrypt(random_password.password.result)}
EOF
  }
}

resource "kubernetes_secret" "regcred" {
  metadata {
    name      = "regcred"
    namespace = local.namespace
  }
  data = {
    ".dockerconfigjson" = <<DOCKER
{
  "auths": {
    "nregner.ddns.net:31500": {
      "auth": "${base64encode("nregner:${random_password.password.result}")}"
    }
  }
}
DOCKER
  }
  type = "kubernetes.io/dockerconfigjson"
}

output "password" {
  value     = random_password.password.result
  sensitive = true
}

output "secret" {
  value = kubernetes_secret.regcred.id
}
