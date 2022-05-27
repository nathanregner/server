crd2pulumi --nodejsName crds --nodejsPath crds --force \
  <(node fix-schema.js < ./pgo/postgres-operator/kustomize/install/crd/bases/postgres-operator.crunchydata.com_postgresclusters.yaml) \
  ./eck/crds.yaml
