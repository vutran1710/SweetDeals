#!/bin/bash
PATH=./node_modules/.bin:$PATH

function precommit {
    current_branch=$(git rev-parse --abbrev-ref HEAD)

    echo "==== ACTIVE BRANCH: [$current_branch]"

    if [ "$current_branch" == "master" ]; then
        user="$USER"
        now="$(date +'%m%d_%H%M')"
        git checkout -b "WIP_$user__$now" && npm run lint
    else
        npm run lint
    fi

}
echo "test........."

"$@"
