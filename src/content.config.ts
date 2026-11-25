import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { EDITORIAL_TOPICS } from './consts';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			section: z.enum(['articulos', 'radar-ia']).default('articulos'),
			topic: z.enum(EDITORIAL_TOPICS).optional(),
			heroImage: z.optional(image()),
			showCover: z.boolean().default(true),
			draft: z.boolean().default(false),
			author: z.string().default('Eder Santisteban'),
		}),
});

export const collections = { blog };
