import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import sveltePreprocess from 'svelte-preprocess';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

const svelteConfig = {
	preprocess: [sveltePreprocess({ scss: true, typescript: false })]
};

export default defineConfig(
	[
		includeIgnoreFile(gitignorePath),
		js.configs.recommended,
		svelte.configs.recommended,
		{
			languageOptions: { globals: { ...globals.browser, ...globals.node } }
		},

		{
			files: ['**/*.svelte', '**/*.svelte.js'],
			languageOptions: { parserOptions: { svelteConfig } },
			rules: {
				// resolve() requires TypeScript; this project is JS-only
				'svelte/no-navigation-without-resolve': 'off',
				// {@html} is necessary for rendering markdown content from mdsvex
				'svelte/no-at-html-tags': 'off'
			}
		},
		{
			// Svelte 5 suppresses css_unused_selector via an HTML comment directly above the
			// <style> block (see these two routes). eslint-plugin-svelte does not understand
			// that stylesheet-level mechanism and false-positives the comment as unused.
			// svelte-check confirms 0 errors, 0 warnings with the ignore in place.
			files: [
				'src/routes/post/\\[slug\\]/+page.svelte',
				'src/routes/video/\\[slug\\]/+page.svelte'
			],
			rules: {
				'svelte/no-unused-svelte-ignore': 'off'
			}
		}
	],
	prettier,
	svelte.configs.prettier
);
