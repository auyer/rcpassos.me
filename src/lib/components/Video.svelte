<script>
	import { videos } from '$lib/data/videos.js';

	/** @type {string} */
	export let slug;

	$: video = videos.find((v) => v.slug === slug);
</script>

{#if video}
	<figure class="video-figure">
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

	.video-caption {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--pico-muted-color);
		text-align: center;
	}
</style>
