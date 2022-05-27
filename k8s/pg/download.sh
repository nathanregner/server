export TAG=v1.8.1
declare -a manifests=(
  "configmap.yaml"
  "operator-service-account-rbac.yaml"
  "postgres-operator.yaml"
  "api-service.yaml"
)

for manifest in "${manifests[@]}"; do
  curl --output-dir manifests -O "https://raw.githubusercontent.com/zalando/postgres-operator/$TAG/manifests/$manifest"
done
