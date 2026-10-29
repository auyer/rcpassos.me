import { readFile } from 'node:fs/promises';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

// Paths are resolved relative to this module so the generator can be run from
// anywhere (e.g. `node scripts/generate-og-images.mjs` from the repo root).
const rootUrl = new URL('../../', import.meta.url);

const WIDTH = 1200;
const HEIGHT = 630;

// Site color tokens (mirrors src/app.css `[data-theme='dark']`).
const COLORS = {
	bg: '#0a0a0a',
	fg: '#f0f0f0',
	muted: '#8e8e95',
	accent: '#00aad4'
};

/** Font family name must match the one embedded in the TTF files. */
const FONT_FAMILY = 'Fira Code';

/** @type {Promise<Buffer> | undefined} */
let logoPngPromise;

/** Rasterize the site logo SVG to a PNG so satori can embed it via <img>. */
async function loadLogoPng() {
	if (!logoPngPromise) {
		logoPngPromise = readFile(new URL('static/assets/logo.svg', rootUrl)).then((svg) => {
			const resvg = new Resvg(svg.toString('utf8'), {
				fitTo: { mode: 'width', value: 128 }
			});
			return resvg.render().asPng();
		});
	}
	return logoPngPromise;
}

/** @param {string} value */
function escapeHtml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Render a post's Open Graph card to a PNG buffer.
 *
 * @param {{ title: string, date?: string }} input
 * @returns {Promise<Buffer>}
 */
export async function renderOgImage({ title, date }) {
	const safeTitle = escapeHtml(title || '');
	const safeDate = escapeHtml(date || '');

	// Pick a title size that stays within the 1200x630 canvas for long titles.
	const titleLength = (title || '').length;
	let titleSize = 64;
	if (titleLength > 110) {
		titleSize = 48;
	} else if (titleLength > 70) {
		titleSize = 56;
	}

	const logoPng = await loadLogoPng();
	const logoSrc = `data:image/png;base64,${logoPng.toString('base64')}`;

	const markup =
		html(`<div style="display: flex; flex-direction: column; width: ${WIDTH}px; height: ${HEIGHT}px; padding: 64px; background-color: ${COLORS.bg}; color: ${COLORS.fg}; font-family: '${FONT_FAMILY}';">
		<div style="display: flex; align-items: center; gap: 20px;">
			<img src="${logoSrc}" width="48" height="43" />
			<div style="font-size: 30px; font-weight: 700; color: ${COLORS.accent};">rcpassos.me</div>
		</div>
		<div style="display: flex; flex-grow: 1; align-items: center; font-size: ${titleSize}px; line-height: 1.25; font-weight: 700;">${safeTitle}</div>
		<div style="display: flex; align-items: center; font-size: 24px; color: ${COLORS.muted};">
			<div>${safeDate}</div>
		</div>
	</div>`);

	const fonts = await Promise.all(
		[
			['FiraCode-Regular.ttf', 400],
			['FiraCode-Bold.ttf', 700]
		].map(async ([file, weight]) => {
			const data = await readFile(new URL(`static/fira/ttf/${file}`, rootUrl));
			return { name: FONT_FAMILY, data, weight, style: 'normal' };
		})
	);

	// satori-html returns a VNode that is structurally compatible with satori's
	// ReactNode, but the React types are not installed in this project.
	// @ts-expect-error - see above
	const svg = await satori(markup, { width: WIDTH, height: HEIGHT, fonts });

	return new Resvg(svg).render().asPng();
}
