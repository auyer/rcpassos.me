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

<div class="flex flex-col flex-grow">
	<header class="pt-4">
		<h1 class="lg:text-6xl font-bold tracking-tight md:text-4xl text-2xl">Check my posts:</h1>
		<p class="mt-6">I also post these on Medium</p>
	</header>

	<div class="mt-16 sm:mt-20">
		<PostsList posts={data.posts} />
	</div>

	<!-- pagination -->
	<div class="flex items-center justify-between pt-16 pb-8">
		{#if !isFirstPage}
			<a href={`/posts/${data.page - 1}`} data-sveltekit-preload-data="hover">
				<ArrowLeftIcon class="w-4 h-4" />
				Previous
			</a>
		{:else}
			<div />
		{/if}

		{#if hasNextPage}
			<a href={`/posts/${data.page + 1}`} data-sveltekit-preload-data="hover"
				>Next
				<ArrowRightIcon class="w-4 h-4" />
			</a>
		{/if}
	</div>
</div>

<style>
</style>
