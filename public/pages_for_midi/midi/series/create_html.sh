#!/bin/bash

for name in $(cat main.txt); do
    cat Attack_On_Titan.html > ${name}.html
done