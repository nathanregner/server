terraform {
  backend "kubernetes" {
    secret_suffix    = "no-ip"
    load_config_file = true
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "no_ip" {
  metadata {
    name = "no-ip"
  }
}

module "no_ip" {
  source    = "./cron"
  namespace = kubernetes_namespace.no_ip.metadata[0].name
  domains   = ["nregner.ddns.net"]
  username  = "nathanregner@gmail.com"
  password  = file("no-ip.password.secret")
}
