#!/bin/bash

baseDir=`pwd`
mkdir -p results

for x in $(ls -a); do
    if [[ ${x,,} =~ ${NAME,,} ]]; then
        echo "Jest coverage testing on ${x}"
        cd ${baseDir}/${x} && jest --coverage >> ${baseDir}/results/jest-coverage-results.txt
        echo -e "\n\n"
        echo "Codecov coverage testing on ${x}"
        cd ${baseDir}/${x} && codecov >> ${baseDir}/results/codecov-coverage-results.txt
        echo -e "\n\n"
    fi
done

cat ${baseDir}/results/jest-coverage-results.txt
cat ${baseDir}/results/codecov-coverage-results.txt