# Elastic Cloud on Kubernetes

https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-deploy-eck.html

```shell
wget https://download.elastic.co/downloads/eck/2.2.0/crds.yaml
wget https://download.elastic.co/downloads/eck/2.2.0/operator.yaml
```

```shell
PASSWORD=$(kubectl get secret quickstart-es-elastic-user -o go-template='{{.data.elastic | base64decode}}')
echo $PASSWORD
```