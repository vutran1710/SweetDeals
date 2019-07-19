#!/bin/sh

PACKAGE_VERSION="$(node -pe \"require('./package.json').version\")"
version="$PACKAGE_VERSION"
docker build -t vutrio/sweetdeals-image-demo:$version .
docker push vutrio/sweetdeals-image-demo:$version
kubectl rollout app-controller --image=vutrio/sweetdeals-image-demo:$version
