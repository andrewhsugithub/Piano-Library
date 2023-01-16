#!/bin/bash

for URL in $(cat url2.txt); do
    echo "$URL"|ts-node cli.ts
    sleep 5
done

