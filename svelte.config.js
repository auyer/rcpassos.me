import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
// import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		// preprocess({
		// 	postcss: true
		// }),
	  vitePreprocess(),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapter(),
		// remove this if you don't want prerendering
		prerender: {
			entries: ['*', '/sitemap.xml', '/rss.xml']
		}
	}
};

export default config;
