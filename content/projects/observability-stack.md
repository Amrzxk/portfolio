---
title: Unified Observability Stack
summary: Metrics, logs and traces for 60+ microservices in one place, with SLO-based alerting that cut pager noise by 70%.
domains: [devops, system-design]
stack: [OpenTelemetry, Prometheus, Grafana, Loki, Tempo, Alertmanager]
cover: ""
repo: ""
live: ""
featured: false
order: 5
date: 2024-12-01
---

## Approach

Instrumented services with OpenTelemetry SDKs and routed everything through an OTel Collector fleet. Replaced hundreds of threshold alerts with multi-window burn-rate alerts on a handful of user-facing SLOs.
