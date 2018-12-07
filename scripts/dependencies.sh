#!/bin/bash

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

baseDir=`pwd`
mkdir -p results

for x in $(ls -a); do
    if [[ ${x,,} =~ ${NAME,,} ]]; then      
        echo -e "\n\nServer Dependencies for ${x}\n"
        cd ${baseDir}/${x} && npm-dview >> ${baseDir}/results/server-dependencies.txt
        echo -e "\n\n"
    fi
done

cat ${baseDir}/results/server-dependencies.txt