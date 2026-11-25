import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context) {
	const posts = (await getPublishedPosts()).filter((post) => !post.data.tags.includes('ejemplo'));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
		customData: '<language>es</language>',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: `/blog/${post.id}/`,
			customData: `<dc:creator>${post.data.author}</dc:creator>`,
		})),
	});
}
