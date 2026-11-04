import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/collections';
import { site } from '../lib/data';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — Writing`,
    description: site.seo.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
