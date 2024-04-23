<script>
	import Giscus from '@giscus/svelte';

	let giscusTheme = 'dark_dimmed';
</script>

<div class="comments-container dark:bg-surface-900 bg-slate-500 p-5 rounded-lg">
	<Giscus
		id="comments"
		repo="auyer/rcpassos.me"
		repoId="MDEwOlJlcG9zaXRvcnkxMzk0Mjk5ODI"
		category="Q&A"
		categoryId="DIC_kwDOCE-IXs4Ce1qm"
		mapping="og:title"
		strict="0"
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

