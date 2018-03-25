#!/bin/bash

for (( i=1599207; i<=2599207; i++ )); do
  truffle exec scripts/import_erc20_contract.js $i $(($i+1))
done
