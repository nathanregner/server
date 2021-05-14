terraform {
  backend "kubernetes" {
    secret_suffix    = "istio"
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
