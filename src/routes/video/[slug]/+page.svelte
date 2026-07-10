<script>
	import { website, name, bio, avatar_avif } from '$lib/info.js';
	import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { afterNavigate } from '$app/navigation';
	import { format, parseISO } from 'date-fns';

	/** @type {import('./$types').PageData} */
	export let data;

	const ogImage = data.video.coverImage ?? '';

	const url = `${website}/video/${data.video.slug}`;

	let canGoBack = false;
	afterNavigate(({ from }) => {
		if (from && from.url.pathname.startsWith('/videos')) {
			canGoBack = true;
		}
	});

	function goBack() {
		if (canGoBack) {
			history.back();
		}
	}

	$: formattedDate = data.video.date
		? format(new Date(parseISO(data.video.date)), 'MMMM d, yyyy')
		: '';
</script>

<svelte:head>
	<title>{data.video.title} - {name}</title>
	<meta name="description" content={data.video.description} />
	<meta name="author" content={name} />

	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.video.title} />
	<meta property="og:description" content={data.video.description} />
	<meta property="og:image" content={ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={website} />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={data.video.title} />
	<meta name="twitter:description" content={data.video.description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="video-layout">
	<div class="video-content">
		<div class="video-nav-container">
			<a
				href="/videos"
				class="video-nav-back"
				aria-label="Go back to videos"
				onclick={goBack}
				onkeydown={goBack}
			>
				<ArrowLeftIcon class="video-nav-icon" />
			</a>
		</div>

		<article class="video-article">
			<header class="video-header">
				<h1>{data.video.title}</h1>
				{#if formattedDate}
					<time class="video-date" datetime={data.video.date}>
						{formattedDate}
					</time>
				{/if}
			</header>

			<video class="video-player" controls poster={data.video.coverImage}>
				<source src={data.video.src} type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{#if data.video.description}
				<p class="video-description">{data.video.description}</p>
			{/if}
		</article>

		<hr />

		<div class="video-author">
			<a href="/" class="avatar-link">
				<img src={avatar_avif} alt={name} class="avatar-image" />
			</a>
			<div class="social-links-container">
				<SocialLinks />
			</div>
			<p class="bio-text">{bio}</p>
		</div>
	</div>
</div>

<style>
	.video-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	@media (min-width: 1280px) {
		.video-layout {
			grid-template-columns: minmax(0, 1fr) minmax(auto, 100ch) minmax(0, 1fr);
		}

		.video-layout > .video-content {
			grid-column: 2;
		}
	}

	.video-content {
		position: relative;
	}

	.video-nav-container {
		position: absolute;
		left: -3rem;
		top: 0;
		padding-top: 2.75rem;
		display: none;
	}

	@media (min-width: 1024px) {
		.video-nav-container {
			display: block;
		}
	}

	.video-nav-back {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin-bottom: 2rem;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--terminal-border);
		border-radius: 0;
		background: var(--terminal-bg);
		cursor: pointer;
		text-decoration: none;
		transition: all 0.15s ease-in-out;
	}

	.video-nav-icon {
		display: block;
		transition: all 0.15s ease-in-out;
		stroke: var(--terminal-fg2);
	}

	.video-nav-back:hover .video-nav-icon {
		stroke: var(--terminal-fg);
	}

	[data-theme='dark'] .video-nav-back {
		background: var(--terminal-bg);
		border-color: var(--terminal-border);
	}

	[data-theme='dark'] .video-nav-icon {
		stroke: var(--terminal-fg2);
	}

	[data-theme='dark'] .video-nav-back:hover .video-nav-icon {
		stroke: var(--terminal-fg);
	}

	.video-article {
		max-width: none;
		margin-left: auto;
		margin-right: auto;
		overflow-x: hidden;
	}

	.video-header {
		display: flex;
		flex-direction: column;
		padding-top: 1.5rem;
		padding-bottom: 1rem;
	}

	.video-header h1 {
		margin-top: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--terminal-fg);
		font-size: 1.25rem;
	}

	@media (min-width: 768px) {
		.video-header h1 {
			font-size: 1.875rem;
		}
	}

	@media (min-width: 1024px) {
		.video-header h1 {
			font-size: 2.25rem;
		}
	}

	.video-date {
		color: var(--pico-muted-color);
		font-size: 0.875rem;
	}

	.video-player {
		width: 100%;
		max-width: 100%;
		display: block;
	}

	.video-description {
		margin-top: 1.5rem;
		color: var(--terminal-fg2);
		line-height: 1.75;
	}

	.video-author {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1rem;
		padding: 2rem;
		margin-top: 1rem;
	}

	.avatar-link {
		display: inline-block;
	}

	.avatar-image {
		width: 6rem;
		height: 6rem;
		border-radius: 0;
		border: 2px solid var(--terminal-fg);
	}

	@media (min-width: 768px) {
		.avatar-image {
			width: 7rem;
			height: 7rem;
		}
	}

	.social-links-container {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}

	.bio-text {
		max-width: 40ch;
		font-size: 1rem;
		color: var(--terminal-fg2);
	}
</style>
