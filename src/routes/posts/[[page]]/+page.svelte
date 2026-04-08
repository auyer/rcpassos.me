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

<container class="posts-container">
	<article class="posts-article">
		<header class="posts-header">
			<h1>Check my posts:</h1>
			<p>
				Written by a human. Any inaccuracies are my fault — no text generation
				used.
			</p>
		</header>

		<PostsList posts={data.posts} />
	</article>

	<!-- pagination -->
	<nav class="pagination">
		{#if !isFirstPage}
			<a href={`/posts/${data.page - 1}`} data-sveltekit-preload-data="hover">
				<ArrowLeftIcon class="pagination-icon" />
				Previous
			</a>
		{:else}
			<div></div>
		{/if}

		{#if hasNextPage}
			<a href={`/posts/${data.page + 1}`} data-sveltekit-preload-data="hover">
				Next
				<ArrowRightIcon class="pagination-icon" />
			</a>
		{/if}
	</nav>
</container>

<style>
	:global(.posts-container) {
		display: block;
		max-width: 72rem;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	:global(.posts-article) {
		margin-bottom: 2rem;
	}

	:global(.posts-header) {
		padding-top: 1rem;
	}

	:global(.posts-header h1) {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		margin-bottom: 0.5rem;
	}

	:global(.pagination) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 2rem;
		padding-bottom: 2rem;
	}

	:global(.pagination a) {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--pico-primary);
		text-decoration: none;
	}

	:global(.pagination a:hover) {
		text-decoration: underline;
	}

	:global(.pagination-icon) {
		width: 1rem;
		height: 1rem;
	}
</style>
