import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Artículos visibles.
 * En `astro dev` entran también los borradores, para poder revisarlos.
 * En `astro build` (producción) un `draft: true` no se genera ni se lista.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog', ({ data }) => {
		return import.meta.env.DEV || data.draft !== true;
	});

	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function slugifyTag(tag: string): string {
	return tag
		.normalize('NFD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function tagHref(tag: string): string {
	return `/etiquetas/${slugifyTag(tag)}/`;
}

const WORDS_PER_MINUTE = 200;

export function readingMinutes(body: string | undefined): number {
	if (!body) return 1;
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	if (words === 0) return 1;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function readingTimeLabel(body: string | undefined): string {
	const minutes = readingMinutes(body);
	return minutes === 1 ? '1 min de lectura' : `${minutes} min de lectura`;
}
