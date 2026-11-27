import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
	plugins: [
		// mdsvex 1.x is a Vite plugin and registers its own extensions, so it goes
		// before sveltekit() and the `.md`/`.svx` extensions no longer belong on it.
		mdsvex(mdsvexConfig),
		sveltekit({
			preprocess: [
				sveltePreprocess({
					scss: true,
					typescript: false
				})
			],
			compilerOptions: {
				// Shiki marks scrollable code blocks with `<pre … tabindex="0">`. That is
				// deliberate and keyboard-friendly, but Svelte flags any tabindex on a
				// non-interactive element. mdsvex 0.x hid this from the compiler by
				// injecting `{@html}`; 1.x hands it real markup, so drop just that warning
				// for markdown documents and keep the markup as it was.
				warningFilter: (warning) =>
					!(
						warning.code === 'a11y_no_noninteractive_tabindex' &&
						typeof warning.filename === 'string' &&
						/\.(md|svx)$/.test(warning.filename)
					)
			},
			adapter: adapter(),
			prerender: {
				entries: ['*', '/sitemap.xml', '/rss.xml']
			}
		})
	],

	server: {
		fs: {
			allow: ['./']
		}
	}
});
