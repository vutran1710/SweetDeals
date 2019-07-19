#!/bin/sh

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g'
  | tr -d '[[:space:]]')

echo "PUBLISHING NEW APP IMAGE >>>"
version=$(get_version)
echo "- version: $version"
echo "- build: docker build -t vutrio/sweetdeals-image-demo:$version ."
docker build -t vutrio/sweetdeals-image-demo:$version .
echo "- publish: docker push vutrio/sweetdeals-image-demo:$version"
docker push vutrio/sweetdeals-image-demo:$version
kubectl rollout app-controller --image=vutrio/sweetdeals-image-demo:$version
