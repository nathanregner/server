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
provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

#module "gitlab-k8s" { source = "./gitlab-k8s" }
#module "httpbin" { source = "./httpbin" }
#module "no_ip" { source = "./no-ip" }
#module "postgresql" { source = "./postgres" }
module "registry" { source = "./registry" }
#module "vault" { source = "./vault" }

output "registry_password" {
  value     = module.registry.password
  sensitive = true
}
