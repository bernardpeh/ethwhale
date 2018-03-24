#!/bin/bash

rsync -var --exclude ./node_modules ./ myuser@myserver:/home/myuser/ethwhale/
