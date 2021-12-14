# TODO: replace with https://github.com/alexellis/registry-creds/blob/master/manifest.yaml
data "kubernetes_all_namespaces" "all" {
}

resource "kubernetes_secret" "regcred" {
  for_each = toset(data.kubernetes_all_namespaces.all.namespaces)
  metadata {
    generate_name = "regcred"
    namespace     = each.value
  }
  data     = {
    ".dockerconfigjson" = jsonencode({
      "auths" : {
      for host in local.registry_hosts :
      host => { auth : base64encode("${local.registry_username}:${random_password.password.result}") }
      }
    })
  }
  type     = "kubernetes.io/dockerconfigjson"
}

resource "kubernetes_default_service_account" "default" {
  for_each = toset(data.kubernetes_all_namespaces.all.namespaces)
  metadata {
    namespace = each.value
  }
  image_pull_secret {
    name = kubernetes_secret.regcred[each.key].metadata.0.name
  }
}

output "password" {
  value     = random_password.password.result
  sensitive = true
}
