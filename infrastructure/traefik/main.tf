terraform {
  backend "kubernetes" {
    secret_suffix    = "linkerd"
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

/*
# https://www.devopsfu.com/automating-linkerd-installation-in-terraform/
# region certs
resource "tls_private_key" "trustanchor_key" {
  algorithm   = "ecdsa"
  ecdsa_curve = "p256"
}

resource "tls_self_signed_cert" "trustanchor_cert" {
  key_algorithm         = tls_private_key.trustanchor_key.algorithm
  private_key_pem       = tls_private_key.trustanchor_key.private_key_pem
  validity_period_hours = 87600
  is_ca_certificate     = true

  subject {
    common_name = "identity.linkerd.cluster.local"
  }

  allowed_uses = [
    "crl_signing",
    "cert_signing",
    "server_auth",
    "client_auth"
  ]
}

resource "tls_private_key" "issuer_key" {
  algorithm   = "ecdsa"
  ecdsa_curve = "p256"
}

resource "tls_cert_request" "issuer_req" {
  key_algorithm   = tls_private_key.issuer_key.algorithm
  private_key_pem = tls_private_key.issuer_key.private_key_pem

  subject {
    common_name = "identity.linkerd.cluster.local"
  }
}

resource "tls_locally_signed_cert" "issuer_cert" {
  cert_request_pem      = tls_cert_request.issuer_req.cert_request_pem
  ca_key_algorithm      = tls_private_key.trustanchor_key.algorithm
  ca_private_key_pem    = tls_private_key.trustanchor_key.private_key_pem
  ca_cert_pem           = tls_self_signed_cert.trustanchor_cert.cert_pem
  validity_period_hours = 8760
  is_ca_certificate     = true

  allowed_uses = [
    "crl_signing",
    "cert_signing",
    "server_auth",
    "client_auth"
  ]
}
# endregion

# https://www.devopsfu.com/automating-linkerd-installation-in-terraform/
# https://linkerd.io/2.10/tasks/generate-certificates/
resource "helm_release" "linkerd" {
  name       = "linkerd"
  repository = "https://helm.linkerd.io/stable"
  chart      = "linkerd2"
  version    = "2.10"

  set {
    name  = "identitytrustanchorspem"
    value = tls_self_signed_cert.trustanchor_cert.cert_pem
  }

  set {
    name  = "identity.issuer.crtexpiry"
    value = tls_locally_signed_cert.issuer_cert.validity_end_time
  }

  set {
    name  = "identity.issuer.tls.crtpem"
    value = tls_locally_signed_cert.issuer_cert.cert_pem
  }

  set {
    name  = "identity.issuer.tls.keypem"
    value = tls_private_key.issuer_key.private_key_pem
  }
}
*/

/*
# https://github.com/sculley/terraform-kubernetes-traefik/blob/main/main.tf
resource "kubernetes_namespace" "traefik_namespace" {
  metadata {
    name = "traefik"
  }
}

resource "helm_release" "traefik" {
  namespace  = kubernetes_namespace.traefik_namespace.metadata.0.name
  name       = "traefik"
  repository = "https://helm.traefik.io/traefik"
  chart      = "traefik"
  version    = "9.19.1"

  # If default_values == "" then apply default values from the chart if its anything else
  # then apply values file using the values_file input variable
  # values = [var.default_values == "" ? var.default_values : file("${path.root}/${var.values_file}")]

  set {
    name  = "deployment.replicas"
    value = 1
  }

  depends_on = [kubernetes_namespace.traefik_namespace]
}*/
