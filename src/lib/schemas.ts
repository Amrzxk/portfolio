/**
 * Zod schemas for every piece of CMS-editable content.
 * Keep these in sync with public/admin/config.yml — if the CMS writes
 * something these schemas reject, `npm run build` fails loudly and
 * Cloudflare keeps serving the last good deploy.
 */
import { z } from 'astro/zod';

/** Optional text field. CMS editors may save "" or omit the key entirely. */
const optText = z.string().optional().default('');
const strList = z.array(z.string()).optional().default([]);

export const DOMAIN_IDS = ['devops', 'system-design', 'cloud', 'app-web'] as const;
export const domainId = z.enum(DOMAIN_IDS);

export const SECTION_IDS = [
  'hero',
  'story',
  'about',
  'skills',
  'projects',
  'experience',
  'certifications',
  'blog',
  'resume',
  'contact',
] as const;

export const ICONS = [
  'devops',
  'system',
  'cloud',
  'code',
  'database',
  'shield',
  'terminal',
  'mobile',
  'layers',
  'github',
  'linkedin',
  'x',
  'mail',
  'globe',
  'rss',
  'youtube',
] as const;
const icon = z.enum(ICONS);

export const siteSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  siteUrl: z.string().optional().default('https://example.pages.dev'),
  accent: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Accent must be a hex colour like #22d3ee')
    .default('#22d3ee'),
  email: optText,
  location: optText,
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    image: optText,
    keywords: strList,
  }),
  socials: z
    .array(z.object({ label: z.string(), url: z.string(), icon: icon.default('globe') }))
    .optional()
    .default([]),
  sections: z
    .array(
      z.object({
        id: z.enum(SECTION_IDS),
        enabled: z.boolean().default(true),
        title: z.string().min(1),
        showInNav: z.boolean().default(true),
        intro: optText,
      }),
    )
    .min(1),
  footerNote: optText,
});

export const storySchema = z.object({
  prompt: z.string().default('$ whoami'),
  greeting: optText,
  headline: z.string().min(1),
  intro: optText,
  roles: z.array(z.string()).min(1),
  primaryCta: z.object({ label: z.string(), href: z.string() }),
  showResumeButton: z.boolean().default(true),
  terminalTitle: z.string().default('~/portfolio'),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).optional().default([]),
  chaptersIntro: optText,
  chapters: z
    .array(
      z.object({
        marker: z.string(),
        title: z.string(),
        body: z.string(),
        image: optText,
      }),
    )
    .optional()
    .default([]),
});

export const aboutSchema = z.object({
  kicker: z.string().default('About me'),
  heading: z.string(),
  photo: optText,
  body: z.string(),
  highlights: strList,
  availability: z.object({ open: z.boolean().default(true), text: optText }),
});

export const skillsSchema = z.object({
  intro: optText,
  domains: z.array(
    z.object({
      name: z.string(),
      icon: icon.default('code'),
      summary: optText,
      skills: z.array(z.object({ name: z.string(), level: z.number().int().min(1).max(5).default(3) })),
    }),
  ),
  toolbelt: strList,
});

export const experienceSchema = z.object({
  intro: optText,
  items: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      companyUrl: optText,
      location: optText,
      start: z.string(),
      end: optText,
      current: z.boolean().default(false),
      summary: optText,
      highlights: strList,
      stack: strList,
    }),
  ),
});

export const certificationsSchema = z.object({
  intro: optText,
  items: z.array(
    z.object({
      name: z.string(),
      issuer: z.string(),
      date: optText,
      credentialId: optText,
      verifyUrl: optText,
      badge: optText,
    }),
  ),
});

export const resumeSchema = z.object({
  intro: optText,
  file: optText,
  buttonLabel: z.string().default('Download résumé'),
  updated: optText,
  points: strList,
});

export const contactSchema = z.object({
  intro: optText,
  endpoint: optText,
  successMessage: z.string().default("Thanks! Your message is on its way. I'll get back to you soon."),
  showEmail: z.boolean().default(true),
});

export const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  domains: z.array(domainId).min(1),
  stack: strList,
  cover: optText,
  repo: optText,
  live: optText,
  featured: z.boolean().default(false),
  order: z.number().default(100),
  date: z.coerce.date().optional(),
});

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: strList,
  cover: optText,
  draft: z.boolean().default(false),
});

export const DOMAIN_LABELS: Record<(typeof DOMAIN_IDS)[number], string> = {
  devops: 'DevOps',
  'system-design': 'System Design',
  cloud: 'Cloud',
  'app-web': 'App & Web',
};
