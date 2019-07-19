#!/bin/sh
PATH=./node_modules/.bin:$PATH

precommit()
{
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

get_version()
{
    PACKAGE_VERSION=$(node -pe "require('./package.json').version")
    echo $PACKAGE_VERSION
}

publish_new_image()
{
    echo "PUBLISHING NEW APP IMAGE >>>"
    version=$(get_version)
    echo "- version: $version"
    echo "- build: docker build -t vutrio/sweetdeals-image-demo:$version ."
    docker build -t vutrio/sweetdeals-image-demo:$version .
    echo "- publish: docker push vutrio/sweetdeals-image-demo:$version"
    docker push vutrio/sweetdeals-image-demo:$version
}

roll_update()
{
    version=$(get_version)
    kubectl rollout app-controller --image=vutrio/sweetdeals-image-demo:$version
}

"$@"
