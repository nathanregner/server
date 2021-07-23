terraform output -json \
  | jq '.password.value' --raw-output \
  | docker login nregner.ddns.net:31500 -u "$USER" --password-stdin
