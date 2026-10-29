import { readdirSync, readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderOgImage } from '../src/lib/og-image.js';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const postsDir = join(rootDir, 'posts');
const ogDir = join(rootDir, 'static', 'og');

/** Fixed site pages (nav links) that get a generated OG image too. */
const STATIC_PAGES = [
	{ name: 'home', title: 'Rafael Passos' },
	{ name: 'posts', title: 'Posts' },
	{ name: 'research', title: 'Research' },
	{ name: 'projects', title: 'Projects' },
	{ name: 'home-lab', title: 'Home Lab' },
	{ name: 'videos', title: 'Videos' }
];

/**
 * Extract the frontmatter block (--- ... ---) from a markdown file and parse it
 * as simple `key: value` lines. Handles quoted values and `false` booleans.
 * @param {string} content
 */
function parseFrontmatter(content) {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return {};

	/** @type {Record<string, unknown>} */
	const fm = {};
	for (const rawLine of match[1].split(/\r?\n/)) {
		const idx = rawLine.indexOf(':');
		if (idx === -1) continue;
		const key = rawLine.slice(0, idx).trim();
		let value = rawLine.slice(idx + 1).trim();

		// Strip surrounding quotes.
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		if (value === 'false') fm[key] = false;
		else if (value === 'true') fm[key] = true;
		else fm[key] = value;
	}
	return fm;
}

/** Derive the post slug exactly like `src/lib/data/posts.js`. */
function slugFromRelativePath(relPath) {
	return relPath
		.replace(/(\/index)?\.md$/, '')
		.split('/')
		.pop();
}

/** Format a frontmatter date as yyyy-MM-dd when possible. */
function formatDate(raw) {
	if (!raw) return undefined;
	const value = String(raw).trim();
	const plain = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (plain) return `${plain[1]}-${plain[2]}-${plain[3]}`;
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString().slice(0, 10);
}

async function main() {
	const files = readdirSync(postsDir, { recursive: true })
		.filter((name) => typeof name === 'string' && name.endsWith('.md'))
		.sort();

	// Clear previous output so removed/renamed posts don't leave stale files.
	rmSync(ogDir, { recursive: true, force: true });
	mkdirSync(ogDir, { recursive: true });

	let generated = 0;
	let pagesGenerated = 0;
	const skipped = [];

	/** @type {Promise<void>[]} */
	const jobs = [];

	for (const file of files) {
		const fullPath = join(postsDir, file);
		const content = readFileSync(fullPath, 'utf-8');
		const fm = parseFrontmatter(content);

		const ogImage = fm.ogImage;
		const slug = slugFromRelativePath(relative(postsDir, fullPath).replaceAll('\\', '/'));

		if (ogImage === false) {
			skipped.push(`${slug} (disabled)`);
			continue;
		}
		if (typeof ogImage === 'string' && ogImage.trim() !== '') {
			skipped.push(`${slug} (custom asset)`);
			continue;
		}

		// Fall back to the first `# ` heading or the slug when title is missing.
		let title = typeof fm.title === 'string' ? fm.title : '';
		if (!title) {
			const heading = content.match(/^#\s+(.+)$/m);
			title = heading ? heading[1].trim() : slug;
		}

		const date = formatDate(/** @type {string | undefined} */ (fm.date));

		jobs.push(
			renderOgImage({ title, date }).then((png) => {
				writeFileSync(join(ogDir, `${slug}.png`), png);
				generated += 1;
				console.log(`generated og/${slug}.png`);
			})
		);
	}

	// Generate a card for each fixed site page.
	const pagesDir = join(ogDir, 'pages');
	mkdirSync(pagesDir, { recursive: true });
	for (const page of STATIC_PAGES) {
		jobs.push(
			renderOgImage({ title: page.title }).then((png) => {
				writeFileSync(join(pagesDir, `${page.name}.png`), png);
				pagesGenerated += 1;
				console.log(`generated og/pages/${page.name}.png`);
			})
		);
	}

	const results = await Promise.allSettled(jobs);

	for (const result of results) {
		if (result.status === 'rejected') {
			console.error(result.reason);
			process.exitCode = 1;
		}
	}

	console.log(`\ngenerated ${generated} posts, ${pagesGenerated} pages, skipped ${skipped.length}`);
	for (const reason of skipped) console.log(`  skipped: ${reason}`);

	if (process.exitCode) {
		process.exit(process.exitCode);
	}
}

main();
