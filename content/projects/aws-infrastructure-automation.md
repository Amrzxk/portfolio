---
title: AWS Infrastructure Automation
summary: A segmented AWS VPC and a highly available EC2 web application with S3 assets — 99.9% uptime, CloudWatch alerting, and backup and disaster recovery proven by failover tests.
domains: [cloud, system-design]
stack: [AWS VPC, EC2, S3, CloudWatch, Security Groups, TLS/HTTPS]
cover: ""
repo: ""
live: ""
featured: false
order: 4
date: 2024-04-01
---

## Network design

A segmented VPC with public and private subnets, security groups and routing that isolate and protect the application's resources.

## Highly available application

- A web application on **EC2** with static assets served from **S3**, sustaining **99.9% uptime**.
- **CloudWatch** monitoring and alerting to surface failures early and reduce incident response time.
- Automated backup and disaster recovery, validating failover with minimal downtime under test.
- **HTTPS** enforced with TLS certificates and redirection to strengthen transport security.

Built through the NTI program · April – October 2024.
