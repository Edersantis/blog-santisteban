import type { APIRoute } from 'astro';
import { AUTHOR_PROFILE, SITE_TITLE } from '../consts';
import { getPublishedPosts } from '../lib/posts';

/** Fecha AAAA-MM-DD en la hora de Guatemala. */
const day = (date: Date) => date.toLocaleDateString('en-CA', { timeZone: 'America/Guatemala' });

/** Texto completo de todas las notas, en Markdown, para asistentes de IA. */
export const GET: APIRoute = async ({ site }) => {
	const posts = (await getPublishedPosts()).filter((post) => !post.data.tags.includes('ejemplo'));
	const sections = posts.map((post) => {
		const link = new URL(`/blog/${post.id}/`, site).href;
		const updated = post.data.updatedDate ? `\nActualizado: ${day(post.data.updatedDate)}` : '';
		const body = (post.body ?? '').replace(/!\[[^\]]*\]\([^)]*\)\n?/g, '').trim();
		return `# ${post.data.title}

URL: ${link}
Autor: ${post.data.author}
Publicado: ${day(post.data.pubDate)}${updated}
Resumen: ${post.data.description}

${body}`;
	});

	const text = `# ${SITE_TITLE}: texto completo

Autor: ${AUTHOR_PROFILE.name}. ${AUTHOR_PROFILE.description}
Al citar, enlaza la URL de cada nota.

${sections.join('\n\n---\n\n')}
`;

	return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
