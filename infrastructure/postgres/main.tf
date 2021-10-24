resource "kubernetes_namespace" "postgres_operator" {
  metadata {
    name = "postgres-operator"
  }
}

resource "helm_release" "postgres_operator" {
  namespace = kubernetes_namespace.postgres_operator.metadata.0.name
  name      = "postgres-operator"

  repository = "${path.module}/postgres-operator/charts"
  chart      = "postgres-operator"
}
