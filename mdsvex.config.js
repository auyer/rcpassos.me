import { anchors } from '@mdsvex/plugin-anchors';
import { toc } from '@mdsvex/plugin-toc';
import { external_links } from '@mdsvex/plugin-external-links';
import { createHighlighter } from 'shiki';

// Shiki is loaded once, up front, so the highlighter itself can be synchronous,
// which is what mdsvex 1.x requires.
const THEMES = {
	light: 'catppuccin-latte',
	dark: 'catppuccin-mocha'
};

// Every non-`text` language used by a fence in `posts/`. Add to this list when a
// document starts using another one.
const LANGUAGES = ['bash', 'c', 'cpp', 'go', 'python', 'yaml', 'xml'];

const shiki = await createHighlighter({
	themes: Object.values(THEMES),
	langs: LANGUAGES
});

/** @type {import('mdsvex').MdsvexOptions} */
export default {
	extensions: ['.svx', '.md'],

	// Replaces rehype-slug: the ids are GitHub's, which is what the site had.
	heading_ids: true,

	// Replaces the 0.x `smartypants: { quotes: true, dashes: 'oldschool' }`.
	// `dashes: true` is the default and means the same as 'oldschool' did.
	smart_punctuation: true,

	plugins: [
		// Replaces rehype-autolink-headings with `behavior: 'wrap'`.
		anchors({ position: 'wrap' }),
		// Replaces @vcarl/remark-headings plus the custom `headings()` transformer.
		// The data lands on `plugin_data.toc.headings` of the compiled module.
		toc(),
		// Replaces the rel="nofollow" mdsvex 0.x put on links to other sites.
		external_links({ rel: ['nofollow'] })
	],

	/**
	 * @param {string} code
	 * @param {{ lang: string, meta: string, inline: boolean, filename?: string }} info
	 */
	highlight: (code, { lang, inline }) => {
		if (inline) return null;

		const language = lang || 'text';
		if (language !== 'text' && !shiki.getLoadedLanguages().includes(language)) {
			// Render unknown languages as plain code rather than failing the build.
			console.error(`[mdsvex] no highlighter for fence language "${lang}", rendering plain`);
			return null;
		}

		return shiki.codeToHtml(code, { lang: language, themes: THEMES });
	}
};
