---
title: How This Portfolio Runs for $0
description: Astro, a Git-based CMS, Cloudflare Pages and Google Apps Script — a fully editable site with zero monthly cost.
date: 2026-11-01
tags: [devops, cloud, web]
cover: ""
draft: false
---

This site costs nothing to run, and I can still edit every word of it from a browser. Here's the architecture.

## The pieces

- **Astro** generates a fully static site — no server to pay for or patch.
- **Sveltia CMS** gives me an admin panel at `/admin`. Saving a change commits JSON or Markdown to GitHub.
- **Cloudflare Pages** watches the repo and rebuilds on every commit, then serves the result from its global edge network with unlimited bandwidth.
- **A tiny Cloudflare Worker** handles the GitHub OAuth handshake so I can log in to the admin.
- **Google Apps Script** receives contact-form submissions and emails them straight to my Gmail.

## Why Git as the database?

Content lives next to code, every edit is versioned, rollbacks are a `git revert`, and there's no database to go to sleep, expire, or bill me.
