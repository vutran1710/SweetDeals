#!/bin/bash
PATH=./node_modules/.bin:$PATH

function precommit {
    current_branch=$(git rev-parse --abbrev-ref HEAD)

    echo "<<$current_branch>>"

    if [ "$current_branch" == "master" ]; then
       git checkout -b "WIP_$USER__$(date)"
    else
        echo "Not in master"
    fi

    npm run lint
}

"$@"
