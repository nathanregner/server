terraform {
  backend "kubernetes" {
    secret_suffix    = "vault"
    load_config_file = true
  }
}

locals {
  port = 32082
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}
provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
provider "vault" {
  address = "http://nregner.ddns.net:${local.port}"
  token   = jsondecode(file("./cluster-keys.json"))["root_token"]
}

resource "kubernetes_namespace" "vault" {
  metadata {
    name = "vault"
  }
}

resource "kubernetes_persistent_volume" "data" {
  metadata {
    name   = "vault-data"
    labels = { app = "vault" }
  }
  spec {
    capacity = {
      storage = "10Gi"
    }
    access_modes = ["ReadWriteOnce"]
    persistent_volume_source {
      host_path {
        # sudo chmod -R 757 vault
        path = "/vol/data/var/vault/"
        type = "DirectoryOrCreate"
      }
    }
  }
}

# https://github.com/nicholasjackson/demo-vault/tree/master/dynamic-secrets-k8s
# https://www.vaultproject.io/docs/platform/k8s/helm/configuration
# https://github.com/hashicorp/vault-helm/blob/master/values.yaml
# helm repo add hashicorp https://helm.releases.hashicorp.com
# helm search repo hashicorp/vault
resource "helm_release" "vault" {
  namespace  = kubernetes_namespace.vault.metadata.0.name
  name       = "vault"
  repository = "https://helm.releases.hashicorp.com"
  chart      = "vault"
  version    = "0.14.0"

  values = [jsonencode({
    server : {
      service : {
        type : "NodePort"
        nodePort : local.port
      }
    }
  })]
}

# resource "vault_namespace" "postgres" {
#   depends_on = [helm_release.vault]
#   path       = "/database/postgres"
# }
