import { browser } from '$app/environment';
import { format } from 'date-fns';
import { parse } from 'node-html-parser';
import readingTime from 'reading-time/lib/reading-time.js';
import { readFileSync } from 'node:fs';

// we require some server-side APIs to parse all metadata
if (browser) {
	throw new Error(`posts can only be imported server-side`);
}

// Get all posts and add metadata
/** @typedef {{ metadata?: { title?: string, date?: string, preview?: string, headings?: any[], updated?: string, [key: string]: any }, default?: any }} GlobResult */

const globResult = /** @type {Record<string, GlobResult>} */ (import.meta.glob('/posts/**/*.md', { eager: true }));
export const posts = Object.entries(globResult)
	.map(([filepath, post]) => {
		// Read raw markdown to extract content for preview
		const rawMarkdown = readFileSync(filepath.replace(/^\//, ''), 'utf-8');
		// Remove frontmatter and get first paragraph
		const contentWithoutFrontmatter = rawMarkdown.replace(/^---[\s\S]*?---\n/, '');
		const firstParagraphMatch = contentWithoutFrontmatter.match(/^#\s+.*?\n\n([\s\S]*?)(?=\n\n|$)/);
		const previewText = firstParagraphMatch
			? firstParagraphMatch[1].trim()
			: contentWithoutFrontmatter.split('\n\n')[0];

		const html = parse(`<p>${previewText}</p>`);
		const preview = post.metadata?.preview ? parse(post.metadata.preview) : html;

		return {
			...post.metadata,

			// generate the slug from the file path
			slug: filepath
				.replace(/(\/index)?\.md/, '')
				.split('/')
				.pop(),

			// whether or not this file is `my-post.md` or `my-post/index.md`
			// (needed to do correct dynamic import in posts/[slug].svelte)
			isIndexFile: filepath.endsWith('/index.md'),

			// format date as yyyy-MM-dd
			date: post.metadata?.date
				? format(
						// offset by timezone so that the date is correct
						addTimezoneOffset(new Date(post.metadata.date)),
						'yyyy-MM-dd'
					)
				: undefined,

			// include updated date for sitemap
			updated: post.metadata?.updated,

			preview: {
				html: preview.toString(),
				// text-only preview (i.e no html elements), used for SEO
				text: preview.structuredText ?? preview.toString()
			},

			// get estimated reading time for the post
			readingTime: readingTime(previewText).text
		};
	})
	// sort by date
	.sort((a, b) => new Date(/** @type {{ date: string }} */ (b).date).getTime() - new Date(/** @type {{ date: string }} */ (a).date).getTime())
	// add references to the next/previous post
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1],
		previous: allPosts[index + 1]
	}));

/** @param {Date} date */
function addTimezoneOffset(date) {
	const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
	return new Date(new Date(date).getTime() + offsetInMilliseconds);
}
