import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', ...mdsvexConfig.extensions],
			preprocess: [
				sveltePreprocess({
					scss: true,
					typescript: false
				}),
				mdsvex(/** @type {any} */ (mdsvexConfig))
			],
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
