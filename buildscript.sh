#!/bin/sh

PACKAGE_VERSION="$(node -pe \"require('./package.json').version\")"

echo "PUBLISHING NEW APP IMAGE...."
version="$(get_version)"
echo "- version: $version"
echo "- build: docker build -t vutrio/sweetdeals-image-demo:$version ."
docker build -t vutrio/sweetdeals-image-demo:$version .
echo "- publish: docker push vutrio/sweetdeals-image-demo:$version"
docker push vutrio/sweetdeals-image-demo:$version
echo "- update: kubectl rollout app-controller --image=vutrio/sweetdeals-image-demo:$version"
kubectl rollout app-controller --image=vutrio/sweetdeals-image-demo:$version
