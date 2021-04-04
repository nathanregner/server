terraform {
  backend "kubernetes" {
    secret_suffix    = "logging"
    load_config_file = true
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}
