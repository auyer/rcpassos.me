<script>
	import Giscus from '@giscus/svelte';

	let giscusTheme = 'dark_dimmed';
</script>

<div class="comments-container">
	<Giscus
		id="comments"
		repo="auyer/rcpassos.me"
		repoId="MDEwOlJlcG9zaXRvcnkxMzk0Mjk5ODI"
		category="Q&A"
		categoryId="DIC_kwDOF1L2fM4B-hVS"
		mapping="og:title"
		strict="1"
		reactionsEnabled="1"
		emitMetadata="0"
		inputPosition="top"
		lang="en"
		theme={giscusTheme}
		loading="lazy"
	/>
</div>

<style lang="postcss">
	.comments-container {
		max-height: 640px;
		overflow-y: scroll;
	}
</style>
