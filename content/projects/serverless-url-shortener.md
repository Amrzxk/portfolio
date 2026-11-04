---
title: Serverless URL Shortener
summary: A low-cost serverless redirection service on AWS — 25+ resources defined in SAM and CloudFormation, deployed in under two minutes through keyless GitHub Actions CI/CD.
domains: [cloud, devops, system-design]
stack: [AWS Lambda, API Gateway, DynamoDB, S3, CloudFront, AWS SAM, CloudFormation, GitHub Actions, CloudWatch]
cover: ""
repo: ""
live: ""
featured: true
order: 2
date: 2025-06-01
---

## Architecture

A serverless redirection service built on **API Gateway**, **Lambda**, **DynamoDB**, **S3** and **CloudFront** — no servers to manage and almost no cost at rest.

## Highlights

- **Everything as code** — 25+ resources defined with AWS SAM and CloudFormation, cutting a full deployment to under two minutes.
- **Keyless CI/CD** — GitHub Actions authenticates to AWS through OIDC federation and short-lived IAM roles, so no long-lived credentials live in the pipeline.
- **Observability and cost control** — CloudWatch alarms, SNS notifications and AWS Budgets for early failure and cost-anomaly detection.
- **Security by default** — least-privilege IAM, blocked public S3 access and restricted CORS to minimise the attack surface.

Built June – July 2025.
