terraform output -json \
  | jq '.password.value' --raw-output \
  | docker login nregner.net:31500 -u "$USER" --password-stdin
