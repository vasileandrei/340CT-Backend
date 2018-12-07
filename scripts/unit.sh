#!/bin/bash

baseDir=`pwd`
mkdir -p results

for x in $(ls -a); do
    if [[ ${x,,} =~ ${NAME,,} ]]; then      
        echo "Jest testing on ${x}"
        cd ${baseDir}/${x} && mocha test >> ${baseDir}/results/unit-results.txt
        echo -e "\n\n"
    fi
done

cat ${baseDir}/results/unit-results.txt