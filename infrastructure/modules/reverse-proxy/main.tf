# https://istio.io/latest/docs/reference/config/networking/virtual-service/#HTTPRewrite

locals {
  api_version = "networking.istio.io/v1beta1"
}

resource "kubernetes_manifest" "gateway" {
  manifest = {
    "apiVersion" = local.api_version
    "kind"       = "Gateway"
    "metadata" = {
      "name"      = var.name
      "namespace" = var.namespace
      "labels"    = var.labels
    }
    "spec" = {
      "selector" = {
        "istio" = "ingressgateway"
      }
      "servers" = [{
        hosts = ["*"]
        port = {
          "name"     = "HTTP"
          "number"   = 80
          "protocol" = "HTTP"
        }
      }]
    }
  }
}

resource "kubernetes_manifest" "virtualservice" {
  manifest = {
    "apiVersion" = local.api_version
    "kind"       = "VirtualService"
    "metadata" = {
      "name"      = var.name
      "namespace" = var.namespace
      "labels"    = var.labels
    }
    "spec" = {
      "gateways" = [var.name]
      "hosts"    = ["*"]
      "http" = [{
        match = [{
          uri = { "prefix" = var.path }
        }]
        rewrite = {
          "uri" = var.rewrite
        }
        route = [{
          destination = {
            "host" = var.host
            "port" = {
              "number" = var.port
            }
          }
        }]
      }]
    }
  }
}

variable "name" {
  type = string
}

variable "namespace" {
  type = string
}

variable "labels" {
  type = map(string)
}

variable "host" {
  type = string
}

variable "path" {
  type = string
}

variable "port" {
  type = number
}

variable "rewrite" {
  type    = string
  default = "/"
}
