import { getCollection } from 'astro:content';

export async function getProjects() {
  const all = await getCollection('projects');
  return all.sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order ||
      (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  );
}

export async function getPosts() {
  const all = await getCollection('blog', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
