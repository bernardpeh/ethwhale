#!/bin/bash

for (( i=1667238; i<=2000000; i++ )); do
  truffle exec import_erc20_contract.js $i $i
done
