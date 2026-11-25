// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';

/** Fecha de la última modificación de cada nota, para `lastmod` en el sitemap. */
function postDates() {
	const dir = new URL('./src/content/blog/', import.meta.url);
	const dates = new Map();
	for (const file of readdirSync(dir)) {
		if (!/\.mdx?$/.test(file)) continue;
		const front = readFileSync(new URL(file, dir), 'utf8').split('---')[1] ?? '';
		const field = (name) => front.match(new RegExp(`^${name}:\\s*['"]?([^'"\\n]+)`, 'm'))?.[1];
		const date = new Date(field('updatedDate') ?? field('pubDate') ?? '');
		if (!Number.isNaN(date.valueOf())) dates.set(`/blog/${file.replace(/\.mdx?$/, '')}/`, date);
	}
	return dates;
}
const dates = postDates();
const latest = new Date(Math.max(...[...dates.values()].map((date) => date.valueOf())));

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.santisteban.co',
	output: 'static',
	trailingSlash: 'always',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/blog/ejemplo-') && !page.endsWith('/404/'),
			serialize(item) {
				const path = new URL(item.url).pathname;
				const date = dates.get(path) ?? (path === '/' || path === '/radar-ia/' ? latest : undefined);
				return date ? { ...item, lastmod: date.toISOString() } : item;
			},
		}),
	],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Fraunces',
			cssVariable: '--font-display',
			fallbacks: ['Iowan Old Style', 'Palatino', 'Georgia', 'serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/fraunces-latin.woff2'],
						weight: '100 900',
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Fraunces Italic',
			cssVariable: '--font-display-italic',
			fallbacks: ['Georgia', 'serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/fraunces-latin-italic.woff2'],
						weight: '100 900',
						style: 'italic',
						display: 'swap',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Inter',
			cssVariable: '--font-sans',
			fallbacks: ['Arial', 'sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/inter-latin.woff2'],
						weight: '100 900',
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'Menlo', 'monospace'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/jetbrains-mono-latin.woff2'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
