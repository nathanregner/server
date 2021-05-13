https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/

```shell
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
echo "http://$INGRESS_HOST:$INGRESS_PORT/httpbin"
curl -s -I "http://$INGRESS_HOST:$INGRESS_PORT/httpbin/status/200"
```