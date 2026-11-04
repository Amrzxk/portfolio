// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL is editable from the admin (Settings → Site URL).
const settings = JSON.parse(readFileSync(new URL('./content/settings/site.json', import.meta.url), 'utf8'));

export default defineConfig({
  site: settings.siteUrl || 'https://example.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  // Images are user-uploaded via the CMS into /public/uploads and served as-is.
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
});
