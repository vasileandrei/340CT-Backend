#!/bin/bash

# Please run this script from the same directry with all the servers
# Rename all the API Servers to they have a common substring
# Use that common substring in the -n <common substring>

# Example usage:
#   ./scripts/startAndTest -n Api -m local
#   ./scripts/startAndTest -n api -m travis
#   ./scripts/startAndTest -n api -m docker

while getopts n:m: option
do
case "${option}"
in
n) NAME=${OPTARG};;
m) MODE=${OPTARG};;
esac
done

baseDir=`pwd`
waitTime=10

function printExampleUsage {
    echo -e "# Example usage:
    #   ./scripts/startAndTest -n Api -m local
    #   ./scripts/startAndTest -n api -m Travis
    #   ./scripts/startAndTest -n api -m docker"
}

if [ -z ${NAME} ]; then
    echo "Please enter a common name on the API Servers. Please use flag -n <name>"
    printExampleUsage
    exit 1
fi

if [ -z ${MODE} ]; then
    echo "Please enter a common name on the API Servers. Please use flag -m <mode>"
    printExampleUsage
    exit 1
fi

for x in $(ls -a); do
    if [[ ${x,,} =~ "gateway" ]]; then
        echo "Starting gatewayApi ${x}" && cd ${baseDir}/${x} && npm start &
        echo "Starting gatewayFiles ${x}" && cd ${baseDir}/${x}  && node fileUpload.js &
    else if [[ ${x,,} =~ ${NAME,,} ]]; then      
        echo "Starting server ${x}" && cd ${baseDir}/${x}  && npm start &
    fi
    fi
done

if [[ ${MODE,,} == "local" ]]; then
    sleep 5
    echo -e "\nThis might kill your terminal."
    echo "Once you close the process it it will also close all the background processes created by this script."
    while true; do sleep 1; done
fi

if [[ ${MODE,,} == "travis" ]]; then
    echo "Sleep for ${waitTime}, making sure servers are running"
    sleep ${waitTime}
    echo -e "Checking deploy status GatewayApi\n" && curl -i localhost:8080/GatewayApi
	echo -e "Checking deploy status UsersApi\n" && curl -i localhost:8081/api/v1/users/
	echo -e "Checking deploy status FilesApi\n" && curl -i localhost:8082/api/v1/files/
	echo -e "Checking deploy status EmailApi\n" && curl -i localhost:8083/api/v1/email/
fi

exit 0