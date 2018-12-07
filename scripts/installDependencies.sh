#!/bin/bash

baseDir=`pwd`

while getopts n: option
do
case "${option}"
in
n) NAME=${OPTARG};;
esac
done

if [ -z ${NAME} ]; then
    echo "Please enter a common name on the API Servers. Please use flag -n <name>"
    exit 1
fi

for x in $(ls -a); do
    if [[ ${x,,} =~ ${NAME,,} ]]; then
        mkdir -p ${baseDir}/${x}
        touch ${baseDir}/${x}/logs
        echo "Installing dependencies for ${x}"
        cd ${baseDir}/${x} && npm install
    fi
done

exit 0