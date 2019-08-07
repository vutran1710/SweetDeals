#!/bin/bash
set -e

export PATH=./node_modules/.bin:$PATH

function precommit() {
    current_branch=$(git rev-parse --abbrev-ref HEAD)

    echo "==== ACTIVE BRANCH: [$current_branch]"

    if [ "$current_branch" == "master" ]; then
        branch="feat/$(echo $USER)_$(date +'%m%d%y_%H%M')"
        git checkout -b "$branch" && npm run lint
    else
        npm run lint
    fi
}

"$@"
