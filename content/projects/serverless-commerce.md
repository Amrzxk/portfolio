---
title: Serverless Commerce Backend
summary: An event-driven, pay-per-use e-commerce backend that scales to zero overnight and to thousands of orders per minute on sale days.
domains: [cloud, app-web, system-design]
stack: [AWS Lambda, API Gateway, EventBridge, Step Functions, DynamoDB, TypeScript]
cover: ""
repo: https://github.com/Amrzxk
live: ""
featured: false
order: 3
date: 2025-11-10
---

## Overview

Orders, payments, inventory and notifications are independent services that communicate only through EventBridge events. Long-running checkout flows are orchestrated with Step Functions, giving retries and compensation (sagas) for free.

## Highlights

- Infrastructure defined with AWS CDK in TypeScript
- Idempotent handlers and a DynamoDB outbox to guarantee exactly-once side effects
- Hosting cost under $15/month at typical traffic
