import { visit } from 'unist-util-visit';
import autolinkHeadings from 'rehype-autolink-headings';
import slugPlugin from 'rehype-slug';
import relativeImages from 'mdsvex-relative-images';
import remarkHeadings from '@vcarl/remark-headings';
// other option to investigate
// import rehypeShiki from '@shikijs/rehype'

import { codeToHtml } from 'shiki';

export default {
	extensions: ['.svx', '.md'],
	smartypants: {
		quotes: true,
		dashes: 'oldschool'
	},
	highlight: {
		highlighter: async (code, lang) => {
			const codeHtml = await codeToHtml(code, {
				lang: lang,
				themes: {
					light: 'catppuccin-latte',
					dark: 'catppuccin-mocha'
				}
			});
			//
			// workaround for the desired trailing /
			// inspired by https://github.com/pngwn/MDsveX/issues/224 but mixed with shiki
			if (lang === 'bash') {
				return `{@html ${JSON.stringify(codeHtml)}}`;
			}

			return `{@html \`${codeHtml}\` }`;
		}
	},
	remarkPlugins: [videos, relativeImages, headings],
	rehypePlugins: [
		slugPlugin,
		// rehypeShiki,
		[
			autolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
};

/**
 * Adds support to video files in markdown image links
 */
function videos() {
	const extensions = ['mp4', 'webm'];
	return function transformer(tree) {
		visit(tree, 'image', (node) => {
			if (extensions.some((ext) => node.url.endsWith(ext))) {
				node.type = 'html';
				node.value = `
            <video 
              src="${node.url}"
              autoplay
              muted
              playsinline
              loop
              title="${node.alt}"
            />
          `;
			}
		});
	};
}

/**
 * Parses headings and includes the result in metadata
 */
function headings() {
	return function transformer(tree, vfile) {
		// run remark-headings plugin
		remarkHeadings()(tree, vfile);

		// include the headings data in mdsvex frontmatter
		vfile.data.fm ??= {};
		vfile.data.fm.headings = vfile.data.headings.map((heading) => ({
			...heading,
			// slugify heading.value
			id: heading.value
				.toLowerCase()
				.replace(/\s/g, '-')
				.replace(/[^a-z0-9-]/g, '')
		}));
	};
}
