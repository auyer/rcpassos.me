// This is an endpoint that generates a basic sitemap for the index page and all posts.
// It's helpful for SEO but does require you to keep it updated to reflect the routes of your website.
// It is OK to delete this file if you'd rather not bother with it.

import { posts } from '$lib/data/posts';
import { website } from '$lib/info';

export const prerender = true;

// make sure this matches your post route
const getPostUrl = (slug) => `${website}/post/${slug}`;

export async function GET({ setHeaders }) {
	setHeaders({
		'Cache-Control': `max-age=0, s-max-age=600`,
		'Content-Type': 'application/xml'
	});

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>${website}</loc>
        <priority>1.0</priority>
      </url>

      ${posts
				.map(
					(post) => `<url>
            <loc>${getPostUrl(post.slug)}</loc>
            <lastmod
              >${
								post.updated
									? new Date(post.updated).toISOString()
									: new Date(post.date).toISOString()
							}</lastmod
            >
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>`
				)
				.join('')}
    </urlset>`;

	return new Response(xml);
}
