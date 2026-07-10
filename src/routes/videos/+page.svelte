<script>
	import { name } from '$lib/info.js';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{name} | Videos</title>
</svelte:head>

<div class="videos-container">
	<article class="videos-article">
		<header class="videos-header">
			<h1>Check my videos:</h1>
		</header>

		<div class="videos-list">
			{#each data.videos as video (video.slug)}
				<article class="video-item">
					<a href="/video/{video.slug}" class="video-link">
						<div class="video-thumb">
							{#if video.coverImage}
								<img src={video.coverImage} alt={video.title} />
							{:else if video.youtube}
								<img
									src="https://img.youtube.com/vi/{video.youtube}/mqdefault.jpg"
									alt={video.title}
								/>
							{/if}
						</div>
						<div class="video-info">
							<h2>{video.title}</h2>
							{#if video.description}
								<p>{video.description}</p>
							{/if}
							{#if video.date}
								<time class="video-item-date" datetime={video.date}>{video.date}</time>
							{/if}
						</div>
					</a>
				</article>
			{/each}
		</div>
	</article>
</div>

<style>
	.videos-container {
		display: block;
		max-width: 90rem;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.videos-article {
		margin-bottom: 2rem;
	}

	.videos-header {
		padding-top: 1rem;
	}

	.videos-header h1 {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;
	}

	.videos-list {
		display: flex;
		flex-direction: column;
	}

	.video-item {
		border-top: 1px solid var(--terminal-border);
	}

	.video-item:first-child {
		border-top: none;
		padding-top: 0;
	}

	.video-link {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		align-items: start;
		padding: 1.25rem 0;
		text-decoration: none;
	}

	@media (min-width: 768px) {
		.video-link {
			grid-template-columns: 240px 1fr;
		}
	}

	.video-thumb {
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: var(--terminal-bg);
		border: 1px solid var(--terminal-border);
	}

	.video-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.video-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.video-info h2 {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--terminal-fg);
	}

	.video-info p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--terminal-fg2);
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.video-item-date {
		font-size: 0.75rem;
		color: var(--pico-muted-color);
		margin-top: 0.25rem;
	}

	.video-link:hover .video-info h2 {
		color: var(--pico-primary);
	}
</style>
