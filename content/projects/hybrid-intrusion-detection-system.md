---
title: Hybrid Intrusion Detection System (H-IDS)
summary: My graduation project — a containerised IDS pairing a three-tier ML pipeline with Snort 3 signatures, sustaining roughly 111K flows per second with live verdicts on a React dashboard.
domains: [system-design, devops, app-web]
stack: [Python, FastAPI, Gunicorn, PostgreSQL 16, Redis Pub/Sub, NFStream, Snort 3, React, Docker Compose, AWS EC2]
cover: ""
repo: ""
live: ""
featured: true
order: 3
date: 2025-10-01
---

## What it does

Detects network intrusions by combining a three-tier machine learning detection pipeline with Snort 3 signature matching, and streams the verdicts live to analysts.

## How it's built

- **Streaming architecture** — three Redis Pub/Sub services stream NFStream traffic verdicts to a React dashboard over Server-Sent Events.
- **Backend** — FastAPI under Gunicorn against PostgreSQL 16, with schema changes managed by Alembic migrations.
- **Containerised** — the full stack runs with Docker Compose, and I wrote the AWS EC2 deployment runbooks.
- **Performance** — the detection pipeline sustains roughly 111K flows per second.
- **Security** — argon2id password hashing, JWT session cookies and role-based access control.

Graduation project, Capital University · October 2025 – June 2026.
