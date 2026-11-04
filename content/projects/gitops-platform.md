---
title: GitOps Platform on EKS
summary: A self-service Kubernetes platform where every environment is a Git commit away — with policy guardrails, autoscaling and full observability.
domains: [devops, cloud]
stack: [AWS EKS, Terraform, Argo CD, Helm, Karpenter, Prometheus, Grafana]
cover: ""
repo: https://github.com/Amrzxk
live: ""
featured: true
order: 1
date: 2026-06-01
---

## The problem

Product teams waited days for new environments, and every cluster had drifted into a unique snowflake. Deploys were manual and nobody trusted rollbacks.

## What I built

- **Terraform modules** for VPC, EKS, IAM (IRSA) and add-ons, versioned and reused across accounts.
- **Argo CD app-of-apps** so every service and environment is declared in Git — merge a PR, get an environment.
- **Karpenter** for fast, cost-aware node autoscaling with Spot instances.
- **OPA Gatekeeper** policies to block privileged pods, missing limits and untrusted registries.
- **Prometheus + Grafana + Loki** dashboards with SLO burn-rate alerts.

## Results

| Metric | Before | After |
| --- | --- | --- |
| New environment | ~3 days | 8 minutes |
| Deploy time | 45 min | 6 min |
| Monthly compute cost | baseline | −38% |

> Replace this placeholder case study with your own project from the admin page.
