terraform {
  backend "kubernetes" {
    secret_suffix    = "registry"
    load_config_file = true
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
  experiments {
    manifest_resource = true
  }
}
