---
title: Kubernetes GitOps Lab
summary: Terraform-provisioned AWS infrastructure running a k3s cluster, with a containerised app delivered through ArgoCD — cluster state reconciled straight from Git. In progress.
domains: [devops, cloud]
stack: [Terraform, AWS EC2, AWS VPC, k3s, Kubernetes, ArgoCD, Docker]
cover: ""
repo: ""
live: ""
featured: true
order: 1
date: 2026-08-01
---

## Goal

A personal lab for running Kubernetes the way production teams do: infrastructure defined in code, and cluster state driven entirely from Git.

## What I'm building

- **Infrastructure as code** — the VPC, EC2 nodes, security groups and networking are provisioned on AWS with Terraform.
- **Kubernetes** — a single-node k3s cluster hosting a containerised application deployed through declarative manifests.
- **GitOps delivery** — ArgoCD reconciles the cluster's state directly from a Git repository.

## Status

In progress since August 2026.
