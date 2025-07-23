import { join } from 'path';

import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join('../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:first-of-type::after': { content: 'none' }
					}
				}
			}
		}
	},
	plugins: [
		typography,
	]
};
