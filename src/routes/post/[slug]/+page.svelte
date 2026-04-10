<script>
	import { website, name, bio, avatar_avif } from '$lib/info.js';
	import ToC from '$lib/components/ToC.svelte';
	import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import PostDate from '$lib/components/PostDate.svelte';
	import 'katex/dist/katex.min.css';
	import katex from 'katex';

	/** @type {import('./$types').PageData} */
	export let data;

	// generated open-graph image for sharing on social media.
	// see https://og-image.vercel.app/ for more options.
	const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
		data.post.title ?? ''
	)}**?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;

	const url = `${website}/${data.post.slug}`;

	// if we came from /posts, we will use history to go back to preserve
	// posts pagination
	let canGoBack = false;
	afterNavigate(({ from }) => {
		if (from && from.url.pathname.startsWith('/posts')) {
			canGoBack = true;
		}
	});

	function goBack() {
		if (canGoBack) {
			history.back();
		}
	}

	// Render KaTeX formulas in an element
	/** @param {Element} element */
	function renderMathInElement(element) {
		if (!element || typeof window === 'undefined') return;

		const elementsWithText = element.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, td, th');
		elementsWithText.forEach((el) => {
			if (el.querySelector('.katex')) return;

			const text = el.textContent;
			const inlineRegex = /\$([^$\n]+?)\$/g;
			let hasMatch = inlineRegex.test(text);

			if (!hasMatch) return;

			inlineRegex.lastIndex = 0;
			const parts = text.split(inlineRegex);
			const fragment = document.createDocumentFragment();

			for (let i = 0; i < parts.length; i++) {
				if (i % 2 === 0) {
					if (parts[i]) {
						fragment.appendChild(document.createTextNode(parts[i]));
					}
				} else {
					try {
						const rendered = katex.renderToString(parts[i], {
							displayMode: false,
							throwOnError: false
						});
						const span = document.createElement('span');
						span.innerHTML = rendered;
						fragment.appendChild(span);
					} catch {
						fragment.appendChild(document.createTextNode('$' + parts[i] + '$'));
					}
				}
			}

			el.innerHTML = '';
			el.appendChild(fragment);
		});

		const allTextNodes = [];
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
		let node;
		while ((node = walker.nextNode())) {
			if (node.textContent && node.textContent.includes('$$')) {
				allTextNodes.push(node);
			}
		}

		allTextNodes.forEach((textNode) => {
			const text = textNode.textContent;
			if (!text) return;
			const parts = text.split(/\$\$([\s\S]+?)\$\$/g);

			if (parts.length === 1) return;

			const fragment = document.createDocumentFragment();

			for (let i = 0; i < parts.length; i++) {
				if (!parts[i]) continue;

				if (i % 2 === 0) {
					// Text part
					fragment.appendChild(document.createTextNode(parts[i]));
				} else {
					// Math part (display mode)
					try {
						const rendered = katex.renderToString(parts[i].trim(), {
							displayMode: true,
							throwOnError: false
						});
						const div = document.createElement('div');
						div.className = 'katex-display';
						div.innerHTML = rendered;
						fragment.appendChild(div);
					} catch {
						fragment.appendChild(document.createTextNode('$$' + parts[i] + '$$'));
					}
				}
			}

			textNode.parentNode?.replaceChild(fragment, textNode);
		});
	}

	onMount(() => {
		const article = document.querySelector('article');
		if (article) renderMathInElement(article);

		afterNavigate(() => {
			const article = document.querySelector('article');
			if (article) renderMathInElement(article);
		});
	});
</script>

<svelte:head>
	<title>{data.post.title} - {name}</title>
	<meta name="description" content={data.post.preview.text} />
	<meta name="author" content={name} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.preview.text} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={website} />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.preview.text} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="post-layout">
	<div class="post-sidebar-left">
		<div class="post-nav-container">
			<a
				href="/posts"
				class="post-nav-back"
				aria-label="Go back to posts"
				onclick={goBack}
				onkeydown={goBack}
			>
				<ArrowLeftIcon class="post-nav-icon" />
			</a>
		</div>
	</div>

	<div class="post-content">
		<article class="post-article">
			<header class="post-header">
				<h1>{data.post.title}</h1>
				<PostDate class="text-sm sm:text-base" post={data.post} decorate collapsed />
			</header>

			<!-- render the post -->
			<div class="prose">
				<svelte:component this={data.component} />
			</div>
		</article>

		<!-- bio -->
		<hr />
		<div class="post-author">
			<a href="/" class="avatar-link">
				<img src={avatar_avif} alt={name} class="avatar-image" />
			</a>
			<div class="social-links-container">
				<SocialLinks />
			</div>
			<p class="bio-text">{bio}</p>
		</div>
	</div>

	<!-- table of contents -->
	<div class="post-sidebar-right">
		{#if /** @type {any} */ (/** @type {any} */ (data.post).metadata)?.headings?.length > 0}
			<aside class="toc-aside" aria-label="Table of Contents">
				<ToC
					post={{
						headings: /** @type {any} */ (/** @type {any} */ (data.post).metadata)?.headings
					}}
				/>
			</aside>
		{/if}
	</div>
</div>

<style>
	:global(.post-layout) {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
	}

	@media (min-width: 1280px) {
		:global(.post-layout) {
			grid-template-columns: minmax(0, 1fr) minmax(0, 80ch) minmax(0, 1fr);
		}
	}

	:global(.post-sidebar-left) {
		display: none;
	}

	@media (min-width: 1280px) {
		:global(.post-sidebar-left) {
			display: flex;
			justify-content: flex-end;
			width: 100%;
		}
	}

	.post-nav-container {
		position: sticky;
		top: 0;
		display: none;
		align-items: center;
		justify-content: flex-end;
		padding-top: 2.75rem;
		padding-right: 2rem;
	}

	@media (min-width: 1024px) {
		.post-nav-container {
			display: block;
		}
	}

	.post-nav-back {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin-bottom: 2rem;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid color-mix(in srgb, var(--pico-muted-border-color) 50%, transparent);
		border-radius: 9999px;
		background: var(--pico-card-background-color);
		cursor: pointer;
		text-decoration: none;
		transition: all 0.15s ease-in-out;
	}

	.post-nav-icon {
		display: block;
		transition: all 0.15s ease-in-out;
		stroke: #6b7280;
	}

	.post-nav-back:hover .post-nav-icon {
		stroke: #374151;
	}

	[data-theme='dark'] .post-nav-back {
		background: var(--pico-card-background-color);
		border-color: color-mix(in srgb, var(--pico-muted-border-color) 50%, transparent);
	}

	[data-theme='dark'] .post-nav-icon {
		stroke: #6b7280;
	}

	[data-theme='dark'] .post-nav-back:hover .post-nav-icon {
		stroke: #9ca3af;
	}

	:global(.post-content) {
		overflow-x: hidden;
	}

	:global(.post-article) {
		max-width: none;
		margin-left: auto;
		margin-right: auto;
	}

	:global(.post-header) {
		display: flex;
		flex-direction: column;
	}

	:global(.post-header h1) {
		margin-top: 1rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--pico-color);
		font-size: 1.5rem;
	}

	@media (min-width: 768px) {
		:global(.post-header h1) {
			font-size: 1.875rem;
		}
	}

	@media (min-width: 1024px) {
		:global(.post-header h1) {
			font-size: 2.25rem;
		}
	}

	:global(.post-author) {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1rem;
		padding: 2rem;
		margin-top: 1rem;
	}

	:global(.post-author .avatar-link) {
		display: inline-block;
	}

	:global(.post-author .avatar-image) {
		width: 6rem;
		height: 6rem;
		border-radius: 9999px;
		box-shadow: 0 0 0 2px var(--pico-muted-border-color);
	}

	@media (min-width: 768px) {
		:global(.post-author .avatar-image) {
			width: 7rem;
			height: 7rem;
		}
	}

	:global(.post-author .social-links-container) {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}

	:global(.post-author .bio-text) {
		max-width: 40ch;
		font-size: 1rem;
		color: var(--pico-muted-color);
	}

	:global(.post-sidebar-right) {
		display: none;
	}

	@media (min-width: 1280px) {
		:global(.post-sidebar-right) {
			display: block;
			width: 100%;
		}
	}

	:global(.toc-aside) {
		position: sticky;
		display: none;
		width: 12rem;
		margin-left: 2rem;
		top: 2rem;
	}

	@media (min-width: 1280px) {
		:global(.toc-aside) {
			display: block;
		}
	}

	/* Allow prose to fill the wider container */
	:global(.post-article .prose) {
		max-width: 100%;
	}
</style>
