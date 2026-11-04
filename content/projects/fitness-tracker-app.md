---
title: Cross-Platform Fitness Tracker
summary: A Flutter app with offline-first sync, a Node.js API and a React admin dashboard — shipped to both app stores with automated releases.
domains: [app-web, devops]
stack: [Flutter, Node.js, PostgreSQL, React, Fastlane, GitHub Actions]
cover: ""
repo: https://github.com/Amrzxk
live: ""
featured: false
order: 4
date: 2025-06-20
---

## What it does

Users log workouts offline; changes sync in the background with conflict resolution when connectivity returns. Coaches manage programmes from a React dashboard.

## Delivery

Every merge to `main` builds, tests and signs both the iOS and Android apps with Fastlane, then pushes a beta to TestFlight and Google Play internal testing.
