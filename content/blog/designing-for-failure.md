---
title: Designing for Failure — Five Patterns I Use in Every System
description: Timeouts, retries with jitter, circuit breakers, bulkheads and graceful degradation — what they are and when each one earns its place.
date: 2026-09-12
tags: [system-design, reliability]
cover: ""
draft: true
---

Everything fails eventually. The question is whether your system fails **gracefully** or takes everything down with it. Here are the five patterns I reach for first.

## 1. Timeouts everywhere

A call without a timeout is a thread you may never get back. Set them on every network hop, and make sure the outer timeout is longer than the sum of the inner ones.

## 2. Retries with exponential backoff and jitter

Retries fix transient errors — and cause retry storms. Back off exponentially, add random jitter, cap the attempts, and only retry idempotent operations.

## 3. Circuit breakers

When a dependency is clearly down, stop calling it. Fail fast, serve a fallback, and probe occasionally to see if it's back.

## 4. Bulkheads

Isolate resources (connection pools, thread pools, even whole clusters) so one noisy dependency can't starve everything else.

## 5. Graceful degradation

Decide in advance what to drop when under pressure: recommendations, avatars, analytics. Keep the core path — login, checkout, the thing users came for — alive.

*This is a placeholder post. Write your own from the admin page under **Blog**.*
