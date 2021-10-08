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
  password  = file("${path.module}/no-ip.password.secret")
}
