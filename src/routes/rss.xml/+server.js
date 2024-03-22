import { posts } from '$lib/data/posts';
import { name, website } from '$lib/info';

export const prerender = true;

const websiteDescription = `${name}'s blog`;
const postUrl = `${website}/post`;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ setHeaders }) {
	setHeaders({
		'Cache-Control': `max-age=0, s-max-age=600`,
		'Content-Type': 'application/rss+xml'
	});

	const xml = `<?xml version="1.0"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${name}</title>
        <link>${website}</link>
        <description>${websiteDescription}</description>
        <atom:link href="${website}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts
					.map(
						(post) =>
							`
              <item>
                <guid isPermaLink="true">${postUrl}/${post.slug}</guid>
                <dc:creator>${name}</dc:creator>
                <title>${post.title}</title>
                <description>${post.preview.text}</description>
                <link>${postUrl}/${post.slug}</link>
                <pubDate>${new Date(post.date).toUTCString().replace('GMT', '+0000')}</pubDate>
            </item>
          `
					)
					.join('')}
      </channel>
    </rss>`;

	return new Response(xml);
}
