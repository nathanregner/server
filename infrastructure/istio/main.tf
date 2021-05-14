locals {
  chart_dir = "./istio-1.9.5/manifests"
}

resource "kubernetes_namespace" "istio_system" {
  metadata {
    name = "istio-system"
  }
}

# Using the Istio operator
# https://istio.io/latest/docs/setup/install/operator/#install

resource "helm_release" "istio_operator" {
  name      = "istio-operator"
  namespace = "default"
  chart     = "${local.chart_dir}/charts/istio-operator"
}

resource "kubectl_manifest" "control_plane" {
  yaml_body = yamlencode({
    "apiVersion" = "install.istio.io/v1alpha1"
    "kind"       = "IstioOperator"
    "metadata" = {
      "name"      = "istio-control-plane"
      "namespace" = kubernetes_namespace.istio_system.metadata.0.name
    }
    "spec" = {
      "profile" = "default"
    }
  })
}

// https://istio.io/latest/docs/ops/integrations/certmanager/
resource "kubectl_manifest" "cert_manager" {
  for_each  = toset(split("---", file("./cert-manager/cert-manager.yaml")))
  yaml_body = each.value
}

//// https://istio.io/latest/docs/ops/integrations/certmanager/
//resource "kubectl_manifest" "ingress_cert" {
//  yaml_body = yamlencode({
//    "apiVersion" = "cert-manager.io/v1alpha2"
//    "kind"       = "ClusterIssuer"
//    "metadata" = {
//      "name"      = "ingress-cert"
//      "namespace" = kubernetes_namespace.istio_system.metadata.0.name
//    }
//    "spec" = {
//      "secretName" : "ingress-cert",
//      "issuerRef" : {
//        "name" = "letsencrypt-prod"
//        "kind" = "ClusterIssuer"
//      }
//      "commonName" : "nregner.ddns.net",
//      "dnsNames" : ["nregner.ddns.net"],
//      "acme" = {
//        "config" : [{
//          http01  = { "ingressClass" : "istio" }
//          domains = ["nregner.ddns.net"]
//        }]
//        //        "email"  = "nathanregner@gmail.com"
//        //        "server" = "https://nregner.ddns.net"
//      }
//    }
//  })
//}
