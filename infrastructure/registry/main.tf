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

  registry_hosts = [
    "nregner.ddns.net",
    "10.0.1.1"
  ]
  registry_port     = 31500
  registry_username = "nregner"
  registry_secret   = "regcred"
}

resource "kubernetes_namespace" "registry" {
  metadata {
    name = local.namespace
  }
}

resource "random_password" "registry_password" {
  length = 30
}

// TODO: Need to mount a volume
resource "helm_release" "registry" {
  name       = "registry"
  namespace  = local.namespace
  repository = "https://helm.twun.io"
  chart      = "docker-registry"

  values = [file("chart_values.yaml")]
  set {
    name  = "service.type"
    value = "NodePort"
  }
  set {
    name  = "service.nodePort"
    value = local.registry_port
  }

  set {
    name  = "secrets.htpasswd"
    value = <<EOF
${local.registry_username}:${bcrypt(random_password.registry_password.result)}
EOF
  }
}

data "kubernetes_all_namespaces" "all" {
}

resource "kubernetes_secret" "regcred" {
  for_each = toset(data.kubernetes_all_namespaces.all.namespaces)
  metadata {
    name      = local.registry_secret
    namespace = each.value
  }
  data = {
    ".dockerconfigjson" = jsonencode({
      "auths" : { for host in local.registry_hosts :
        "${host}:${local.registry_port}" => {
          "auth" : base64encode("${local.registry_username}:${random_password.registry_password.result}")
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
    name = local.registry_secret
  }
}

output "password" {
  value     = random_password.registry_password.result
  sensitive = true
}

output "ns" {
  value = data.kubernetes_all_namespaces.all.namespaces
}
