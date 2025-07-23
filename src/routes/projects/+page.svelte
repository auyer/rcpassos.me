<script>
	import { name } from '$lib/info.js';
	import ProjectList from '$lib/components/ProjectList.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{name} | Personal Projects</title>
</svelte:head>

<container class="w-full mx-auto grid gap-24 max-w-6xl">
	<div class="mt-16 sm:mt-20">
		<header class="pt-4">
			<h1 class="lg:text-4xl font-bold tracking-tight md:text-2xl text-xl">Personal Projects:</h1>
		</header>

		<div class="mt-16 sm:mt-20">
			<ProjectList projects={data.projects} />
		</div>
	</div>
</container>

<style>
</style>
