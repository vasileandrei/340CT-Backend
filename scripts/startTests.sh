#!/bin/bash

# Please run this script from the same directry with all the servers
# Rename all the API Servers to they have a common substring
# Use that common substring in the -n <common substring>
# Append the flag -t to specify the test that you want to run
# Tests available: 'unit', 'coverage', 'integration', 'dependencies'

# Example usage:
#   ./scripts/startAndTest -n Api
#   ./scripts/startAndTest -n Api -t integration
#   ./scripts/startAndTest -n api -t unit
#   ./scripts/startAndTest -n api -t coverage
#   ./scripts/startAndTest -n api -t dependencies

while getopts n:t: option
do
case "${option}"
in
n) NAME=${OPTARG};;
t) TEST=${OPTARG};;
esac
done

if [ -z ${NAME} ]; then
    echo "Please enter a common name on the API Servers. Please use flag -n <name>"
    exit 1
fi

fileList=""
baseDir=`pwd`

if [ ! -z ${TEST} ]; then

    mkdir -p ${baseDir}/results
    mkdir -p ${baseDir}/logs

    if [ ${TEST,,} == 'dependencies' ]; then
        for x in $(ls -a); do
            if [[ ${x,,} =~ ${NAME,,} ]]; then    
                npm install -g npm-dview
                echo -e "\n\nServer Dependencies for ${x}\n"
                cd ${baseDir}/${x} && npm-dview >> ${baseDir}/results/server-dependencies.txt
                echo -e "\n\n"
            fi
        done
    
    fileList="${fileList} ${baseDir}/results/server-dependencies.txt"
    fi

    if [ ${TEST,,} == 'integration' ]; then
        for x in $(ls -a); do
            if [[ ${x,,} =~ ${NAME,,} ]]; then     
                npm install -g jest 
                echo "Integration testing on ${x}"
                cd ${baseDir}/${x} && jest >> ${baseDir}/results/integration-results.txt
                echo -e "\n\n"
            fi
        done
    
    fileList="${fileList} ${baseDir}/results/integration-results.txt"
    fi

    if [ ${TEST,,} == 'unit' ]; then
        for x in $(ls -a); do
            if [[ ${x,,} =~ ${NAME,,} ]]; then      
                echo "Unit testing on ${x}"
                npm install -g mocha
                cd ${baseDir}/${x} && mocha test >> ${baseDir}/results/unit-results.txt
                echo -e "\n\n"
            fi
        done
    
    fileList="${fileList} ${baseDir}/results/unit-results.txt"
    fi

    if [ ${TEST,,} == 'coverage' ]; then
        for x in $(ls -a); do
            if [[ ${x,,} =~ ${NAME,,} ]]; then      
                npm install -g jest
                echo "Jest coverage testing on ${x}"
                cd ${baseDir}/${x} && jest --coverage >> ${baseDir}/results/jest-coverage-results.txt
                echo -e "\n\n"
                npm install -g codecov
                echo "Codecov coverage testing on ${x}"
                cd ${baseDir}/${x} && codecov >> ${baseDir}/results/codecov-coverage-results.txt
                echo -e "\n\n"
            fi
        done
    
    fileList="${fileList} ${baseDir}/results/jest-coverage-results.txt codecov-coverage-results.txt"
    fi

    echo -e "\nTest results\n\n" && cat ${baseDir}/results/${fileList}
    cd ${baseDir}

else 

    echo -e "\n # Please use the -t flags to specify the targeted tests. Options:\n
    - dependencies
    - unit
    - integration
    - coverage"
    echo -e "\n # Example usage:\n
    ./scripts/startAndTest -n Api
    ./scripts/startAndTest -n Api -t integration
    ./scripts/startAndTest -n api -t unit"

fi

exit 0