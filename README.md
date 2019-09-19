
# Table of Contents

1.  [Introduction](#org87b6eea)

2.  [Features](#orgbbaa98d)

3.  [Development & CICD Strategy Flow](#orga6b5a0b)
    1.  [Development](#orgd25a736)
    2.  [PullRequest & CICD](#orgab6f208)

4.  [Deployment Tutorial](#deploytut)

5.  [A great Medium Story...](#medium-story)


<a id="org87b6eea"></a>

## Introduction

SweetDeals is a complete heavy Javascript/Typescript-oriented application, built for demonstration & educational
purposes.

<a id="orgbbaa98d"></a>

## Features

-   The full circle of software development

-   A complete, or **full-stack** so to say, javascript application
    -   **TypeScript** integration - the benefit & the tax
    -   How **Fuse-Box** can be an agreeable alternative to **webpack**
    -   Mongodb, ExpressJS, React Server-side Rendering

-   Testing a **full-stack** javasript application

-   QA/QC, what to do from the point of the developers

-   DevOps workflow, including CICD and Deployment

<a id="orga6b5a0b"></a>

## Development & CICD Strategy Flow

<a id="orgd25a736"></a>

#### Quality Control CheckList
  - [x] Branch **master** must be strictly protected!
  - [x] Feature implementation must be carried out on a separate branch
  - [x] Each commit must be **linted** locally
  - [x] If dev tries to commit on master branch, use husky to auto switch to a new feature-branch
  - [x] To merge to master branch, a **PullRequest** must be submitted
  - [x] Implement frontend test with Mocha & React-testing-library

<a id="orgab6f208"></a>

#### CICD Implementation CheckList
  - [x] Each *Pull-Request* will be verifed with automation of testing & bundling
  - [x] If successful, allow to merge to **Master**
  - [x] Deploy with **Kubernetes**
  - [x] Auto deploy upon merging to *master*

<a id="deploytut"></a>

## Deployment Tutorial

Prepare the very first **image** for the initial deployment with **kubernetes**

``` shell
$ docker login
$ docker build -t vutrio/sweetdeals-image-demo:latest .
$ docker push vutrio/sweetdeals-image-demo:latest
```

Save the K8s DigitalOcean config as `~/.kube/config`
Check if config is properly set?

``` shell
$ kubectl config view
```

PS: *dont forget to save the config/secret files to SemaphoreCI Secrets*
If ok, set Database Secret for K8s Database service

``` shell
$ kubectl create secret generic prod-db-secret --from-literal=user=root --from-literal=password=1234 --from-literal=dbname=prod
```

Create Docker secret namely **regcred** for K8s to pull the private image

``` shell
$ kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL
```

Apply with K8 to launch the fucking App

``` shell
$ kubectl apply -f k8s/
```

<a id="medium-story"></a>

## A great Medium Story
*to be done... once project finished.*
