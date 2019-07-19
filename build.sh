# !/bin/sh
PATH=./node_modules/.bin:$PATH

get_version() {
    PACKAGE_VERSION=$(node -pe "require('./package.json').version")
    echo $PACKAGE_VERSION
}

publish_new_image() {
    echo "PUBLISHING NEW APP IMAGE >>>"
    version=$(get_version)
    echo "- version: $version"
    echo "- build: docker build -t vutrio/sweetdeals-image-demo:$version ."
    docker build -t vutrio/sweetdeals-image-demo:$version .
    echo "- publish: docker push vutrio/sweetdeals-image-demo:$version"
    docker push vutrio/sweetdeals-image-demo:$version
}

roll_update() {
    version=$(get_version)
    kubectl rollout app-controller --image=vutrio/sweetdeals-image-demo:$version
}

"$@"
