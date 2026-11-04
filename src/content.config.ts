import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema, projectSchema } from './lib/schemas';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: projectSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  schema: postSchema,
});

export const collections = { projects, blog };
