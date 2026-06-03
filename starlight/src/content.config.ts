import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Extend here if the docs adopt custom frontmatter keys (e.g. stability tags).
// Keep additions optional so Starlight's own pages (e.g. 404) still validate.
export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
