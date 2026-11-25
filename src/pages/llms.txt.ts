import type { APIRoute } from 'astro';
import { AUTHOR_PROFILE, SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPublishedPosts } from '../lib/posts';

/** Fecha AAAA-MM-DD en la hora de Guatemala. */
const day = (date: Date) => date.toLocaleDateString('en-CA', { timeZone: 'America/Guatemala' });

/** Mapa del blog para asistentes de IA, según la propuesta https://llmstxt.org */
export const GET: APIRoute = async ({ site }) => {
	const posts = (await getPublishedPosts()).filter((post) => !post.data.tags.includes('ejemplo'));
	const url = (path: string) => new URL(path, site).href;
	const line = (post: (typeof posts)[number]) =>
		`- [${post.data.title}](${url(`/blog/${post.id}/`)}): ${post.data.description} (${day(post.data.pubDate)})`;

	const articles = posts.filter((post) => post.data.section === 'articulos');
	const radar = posts.filter((post) => post.data.section === 'radar-ia');

	const body = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

Autor: ${AUTHOR_PROFILE.name}. ${AUTHOR_PROFILE.description}

- Perfil del autor: ${AUTHOR_PROFILE.url}
- Idioma: español
- Contenido completo en texto: ${url('/llms-full.txt')}
- RSS: ${url('/rss.xml')}

## Artículos

${articles.map(line).join('\n')}

## Radar IA

Resumen de noticias de inteligencia artificial y su impacto en los negocios.

${radar.map(line).join('\n')}

## Optional

- [Archivo de Radar IA](${url('/radar-ia/')})
- [Temas y etiquetas](${url('/etiquetas/')})
- [Sitio principal de Eder Santisteban](https://santisteban.co)
`;

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
