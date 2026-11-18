// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.santisteban.co',
	output: 'static',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
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
