---
title: Planet-Scale URL Shortener
summary: A system-design case study and working implementation handling 100k redirects/second with multi-region failover and sub-10 ms p99 reads.
domains: [system-design, cloud]
stack: [Go, Redis Cluster, DynamoDB Global Tables, Kafka, CloudFront]
cover: ""
repo: https://github.com/Amrzxk
live: ""
featured: true
order: 2
date: 2026-03-15
---

## Requirements

- 100k reads/s, 1k writes/s, 5-year retention (~10 B links)
- p99 redirect latency under 10 ms, 99.99% availability

## Design

1. **ID generation** — base62 encoding of a 64-bit Snowflake-style ID; no coordination on the write path.
2. **Storage** — DynamoDB Global Tables keyed by short code; replicated across three regions.
3. **Read path** — CloudFront edge cache → regional Redis cluster → DynamoDB. Over 97% of reads never touch the database.
4. **Analytics** — clicks stream through Kafka into a columnar store, decoupled from the hot path.

## Trade-offs

Eventual consistency between regions means a brand-new link can take ~1 s to resolve globally — acceptable for this use case and far cheaper than strong consistency.
