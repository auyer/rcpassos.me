<script>
	import { name } from '$lib/info.js';
	import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
	import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
	import PostsList from '$lib/components/PostsList.svelte';

	export let data;

	$: isFirstPage = data.page === 1;
	$: hasNextPage = data.posts[data.posts.length - 1]?.previous;
</script>

<svelte:head>
	<title>{name} | Posts</title>
</svelte:head>

<div class="posts-page">
	<header class="posts-header">
		<h1>Check my posts:</h1>
		<p>
			A human writes theses posts. Any inaccuracies are probably my own fault — no text generation
			used.
		</p>
	</header>

	<div class="posts-content">
		<PostsList posts={data.posts} />
	</div>

	<!-- pagination -->
	<div class="pagination">
		{#if !isFirstPage}
			<a href={`/posts/${data.page - 1}`} data-sveltekit-preload-data="hover" class="pagination-link">
				<ArrowLeftIcon class="pagination-icon" />
				Previous
			</a>
		{:else}
			<div></div>
		{/if}

		{#if hasNextPage}
			<a href={`/posts/${data.page + 1}`} data-sveltekit-preload-data="hover" class="pagination-link">
				Next
				<ArrowRightIcon class="pagination-icon" />
			</a>
		{/if}
	</div>
</div>

<style>
	:global(.posts-page) {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	:global(.posts-header) {
		padding-top: 1rem;
	}

	:global(.posts-header h1) {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: -0.025em;
	}

	@media (min-width: 768px) {
		:global(.posts-header h1) {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		:global(.posts-header h1) {
			font-size: 2.25rem;
		}
	}

	:global(.posts-content) {
		margin-top: 4rem;
	}

	@media (min-width: 640px) {
		:global(.posts-content) {
			margin-top: 5rem;
		}
	}

	:global(.pagination) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 4rem;
		padding-bottom: 2rem;
	}

	:global(.pagination-link) {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--pico-primary);
		text-decoration: none;
	}

	:global(.pagination-link:hover) {
		text-decoration: underline;
	}

	:global(.pagination-icon) {
		width: 1rem;
		height: 1rem;
	}
</style>
