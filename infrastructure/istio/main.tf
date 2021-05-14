locals {
  chart_dir = "./istio-1.9.5/manifests"
  //  chart_dir = "./istio-1.5.1/manifests"
  //  chart_dir = "./istio-1.5.1/install/kubernetes/helm"
}

resource "kubernetes_namespace" "istio" {
  metadata {
    name = "istio-system"
  }
}

resource "helm_release" "istio_init" {
  name      = "istio-system"
  namespace = kubernetes_namespace.istio.metadata.0.name
  chart     = "${local.chart_dir}/charts/base"
}

//resource "helm_release" "istio_cni" {
//  name      = "istio-cni"
//  namespace = kubernetes_namespace.istio.metadata.0.name
//  chart     = "${local.chart_dir}/charts/istio-cni"
//}
//

resource "helm_release" "istio_discovery" {
  name      = "istio-discovery"
  namespace = kubernetes_namespace.istio.metadata.0.name
  chart     = "${local.chart_dir}/charts/istio-control/istio-discovery"
}

//
//resource "helm_release" "istio_init" {
//  name      = "istio-init"
//  namespace = kubernetes_namespace.istio.metadata.0.name
//  chart     = "${local.chart_dir}/istio-init"
//}
//
//resource "helm_release" "istio_cni" {
//  name      = "istio-cni"
//  namespace = kubernetes_namespace.istio.metadata.0.name
//  chart     = "${local.chart_dir}/istio-cni"
//}
//
//resource "helm_release" "istio" {
//  name      = "istio"
//  namespace = kubernetes_namespace.istio.metadata.0.name
//  chart     = "${local.chart_dir}/istio"
//}
//
////resource "helm_release" "istio_discovery" {
////  name      = "istio-discovery"
////  namespace = kubernetes_namespace.istio.metadata.0.name
////  chart     = "${local.chart_dir}/charts/istio-control/istio-discovery"
////}
//
////resource "helm_release" "istio_ingress" {
////  name      = "istio-ingress"
////  namespace = kubernetes_namespace.istio.metadata.0.name
////  chart     = "${local.chart_dir}/charts/gateways/istio-ingress"
////}
