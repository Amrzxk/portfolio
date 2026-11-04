# Portfolio

A personal portfolio for DevOps, system design, cloud solutions and app & web development. It costs **$0/month** to run, and every word is editable from a browser admin panel.

**Stack:** [Astro](https://astro.build) (static) · [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (Git-based admin at `/admin`) · Cloudflare Workers static assets (hosting) · Cloudflare Worker (admin OAuth) · Google Apps Script (contact form → Gmail)

➡️ **First-time setup:** see [SETUP.md](SETUP.md).

## How it works

```
 You ──► /admin (Sveltia CMS) ──commit──► GitHub repo ──webhook──► Cloudflare Workers build ──► live site
                                            content/*.json, *.md
 Visitor ──► contact form ──POST──► Google Apps Script ──► your Gmail (+ Google Sheet log)
```

- **Content** lives in `content/` as JSON (single sections) and Markdown (projects, blog posts). Uploaded images and the résumé go to `public/uploads/`.
- **Validation:** `src/lib/schemas.ts` checks all content at build time. A bad edit fails the build, and the last good version stays online.
- **Sections:** the home page renders sections in the order set in *Site settings → Sections*, and only the ones marked visible.

## Local development

Requires Node.js 22.12+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built site
```

To edit content locally through the admin UI, run `npm run dev`, open `http://localhost:4321/admin/index.html` in Chrome or Edge, and choose **Work with Local Repository** (select this folder). Edits are written straight to your files.

## Project structure

```
content/            ← everything the admin edits
  settings/site.json   name, SEO, accent colour, socials, section order
  pages/*.json         hero & story, about, skills, experience, certifications, résumé, contact
  projects/*.md        one file per project (frontmatter + case study)
  blog/*.md            one file per post
public/admin/       ← Sveltia CMS (index.html + config.yml)
public/uploads/     ← images & résumé uploaded via admin
src/components/     ← UI (sections/, Nav, Footer, cards, Icon)
src/lib/            ← schemas + data loaders
src/pages/          ← routes: /, /projects/[id], /blog, /blog/[id], /rss.xml
apps-script/Code.gs ← contact form backend (paste into Google Apps Script)
```

## Changing the design

Colours, fonts and spacing are CSS custom properties at the top of `src/styles/global.css`. The accent colour is set from the admin. Each section's markup and styles live together in `src/components/sections/*.astro`.
