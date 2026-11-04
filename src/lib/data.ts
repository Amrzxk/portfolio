/**
 * Loads and validates the single-file JSON content the CMS edits.
 * A schema error throws at build time with the file name in the message.
 */
import type { z } from 'astro/zod';
import {
  aboutSchema,
  certificationsSchema,
  contactSchema,
  experienceSchema,
  resumeSchema,
  siteSchema,
  skillsSchema,
  storySchema,
} from './schemas';

import siteRaw from '../../content/settings/site.json';
import storyRaw from '../../content/pages/story.json';
import aboutRaw from '../../content/pages/about.json';
import skillsRaw from '../../content/pages/skills.json';
import experienceRaw from '../../content/pages/experience.json';
import certificationsRaw from '../../content/pages/certifications.json';
import resumeRaw from '../../content/pages/resume.json';
import contactRaw from '../../content/pages/contact.json';

function load<S extends z.ZodType>(schema: S, raw: unknown, file: string): z.output<S> {
  const result = schema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid content in ${file}:\n${issues}`);
  }
  return result.data;
}

export const site = load(siteSchema, siteRaw, 'content/settings/site.json');
export const story = load(storySchema, storyRaw, 'content/pages/story.json');
export const about = load(aboutSchema, aboutRaw, 'content/pages/about.json');
export const skills = load(skillsSchema, skillsRaw, 'content/pages/skills.json');
export const experience = load(experienceSchema, experienceRaw, 'content/pages/experience.json');
export const certifications = load(certificationsSchema, certificationsRaw, 'content/pages/certifications.json');
export const resume = load(resumeSchema, resumeRaw, 'content/pages/resume.json');
export const contact = load(contactSchema, contactRaw, 'content/pages/contact.json');

export type SectionId = (typeof site.sections)[number]['id'];

/** Title an editor gave a section in Settings, with a fallback. */
export function sectionTitle(id: SectionId, fallback: string): string {
  return site.sections.find((s) => s.id === id)?.title ?? fallback;
}

/** Optional intro line set on the section in Settings. */
export function sectionIntro(id: SectionId): string {
  return site.sections.find((s) => s.id === id)?.intro ?? '';
}

export function isEnabled(id: SectionId): boolean {
  return site.sections.some((s) => s.id === id && s.enabled);
}
