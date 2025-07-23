import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [mdsvex(mdsvexConfig)],
	extensions: ['.svelte', '.svx',  ...mdsvexConfig.extensions],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	kit: {
		adapter: adapter(),
		// remove this if you don't want prerendering
		prerender: {
			entries: ['*', '/sitemap.xml', '/rss.xml']
		}
	}
};

export default config;
