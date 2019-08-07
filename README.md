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
[![Codeship Status for vutran1710/SweetDeals](https://app.codeship.com/projects/a46692e0-7183-0137-2e01-625d4d4a40bb/status?branch=master)](https://app.codeship.com/projects/348423)

SweetDeals is a complete heavy Javascript/Typescript-oriented application that aims towards easy sharing deals and payment-shares amongst group of friends or collegue. The inspiration came from how my friends in the office used to place bulk-order of fruit drinks after lunch then got troubled in calculating how much each person would pay afterwards.

<a id="orgbbaa98d"></a>

## Features

-   The full circle of software development

-   A complete, or **full-stack** so to say, javascript application
    -   **TypeScript** integration - the benefit & the tax
    -   How **Fuse-Box** can be a agreeable alternative to **webpack**
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
  - [x] If dev tries to commit on master branch, use husky to auto switch to a separated feature branch
  - [x] To merge to master branch, a **PullRequest** must be submitted
  - [ ] Implement frontend test with Mocha & React-testing-library

<a id="orgab6f208"></a>

#### CICD Implementation CheckList
  - [x] Each *Pull-Request* will be verifed with automation of testing & bundling
  - [x] If successful, allow to merge to **Master**
  - [x] Deploy with **Kubernetes**
  - [x] Auto deploy upon merging to *master*

<a id="deploytut"></a>

## Deployment Tutorial

Set Database Secret Env for K8s Database service

``` shell
$ kubectl create secret generic prod-db-secret --from-file=.env.prod
```


<a id="medium-story"></a>

## A great Medium Story
*to be done... once project finished.*
