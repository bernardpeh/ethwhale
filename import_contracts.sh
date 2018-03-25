#!/usr/bin/env bash
echo "importing contracts"
# screen -dmS geth /usr/bin/geth --cache=768 --rpc --rpcapi db,eth,net,web3,personal --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --verbosity 3
screen -dmS import scripts/import_erc20_contract.sh
