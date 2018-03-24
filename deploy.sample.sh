#!/bin/bash

rsync -var --exclude ./node_modules --exclude .git ./ myuser@myserver:/home/myuser/ethwhale/
