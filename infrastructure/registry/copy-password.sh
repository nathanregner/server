terraform output -json | jq '.password.value' --raw-output | xclip -selection c
