terraform {
  backend "kubernetes" {
    secret_suffix    = "infrastructure"
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

module "httpbin" { source = "./httpbin" }
module "no_ip" { source = "./no-ip" }
module "registry" { source = "./registry" }
#module "vault" { source = "./vault" }
