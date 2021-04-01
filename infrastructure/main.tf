terraform {
  backend "kubernetes" {
    secret_suffix    = "no-ip"
    load_config_file = true
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "infrastructure" {
  metadata {
    name = "infrastructure"
  }
}

module "no_ip" {
  source = "./no-ip"

  namespace = kubernetes_namespace.infrastructure.metadata[0].name
  domain    = "nregner.ddns.net"
  username  = "nathanregner@gmail.com"
  password  = file("no-ip.password.secret")
}
