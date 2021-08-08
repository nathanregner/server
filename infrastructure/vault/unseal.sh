kubectl -n vault exec --stdin=true --tty=true vault-0 -- vault operator unseal $(jq -r ".unseal_keys_hex[0]" cluster-keys.json)
