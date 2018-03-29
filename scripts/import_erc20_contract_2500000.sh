#!/bin/bash

for (( i=2000001; i<=2500000; i++ )); do
  truffle exec import_erc20_contract.js $i $i
done
