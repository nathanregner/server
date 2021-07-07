export NODE_PORT=$(kubectl get --namespace container-registry -o jsonpath="{.spec.ports[0].nodePort}" services  registry-docker-registry)
export NODE_IP=$(kubectl get nodes --namespace container-registry -o jsonpath="{.items[0].status.addresses[0].address}")
echo http://$NODE_IP:$NODE_PORT