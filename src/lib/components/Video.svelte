<script>
	import { videos } from '$lib/data/videos.js';

	/** @type {string} */
	export let slug;

	$: video = videos.find((v) => v.slug === slug);
</script>

{#if video}
	<figure class="video-figure">
		{#if video.youtube}
			<div class="video-embed-wrap">
				<iframe
					class="video-iframe"
					src="https://www.youtube.com/embed/{video.youtube}{video.youtubeSi
						? `?si=${video.youtubeSi}`
						: ''}"
					title={video.title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
		{:else}
			<video
				class="video-player"
				controls
				poster={video.coverImage}
				title={video.description}
				aria-label={video.description}
			>
				<source src={video.src} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		{/if}
		<figcaption class="video-caption">{video.title}</figcaption>
	</figure>
{/if}

<style>
	.video-figure {
		margin: 1.5rem 0;
	}

	.video-player {
		width: 100%;
		max-width: 100%;
		display: block;
	}

	.video-embed-wrap {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%;
	}

	.video-iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	.video-caption {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--pico-muted-color);
		text-align: center;
	}
</style>
