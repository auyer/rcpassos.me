<script>
	import { name } from '$lib/info.js';
	import ProjectList from '$lib/components/ProjectList.svelte';

	export let data;
</script>

<svelte:head>
	<title>{name} | Personal Projects</title>
</svelte:head>

<container class="projects-container">
	<article class="projects-article">
		<header class="projects-header">
			<h1>Personal Projects</h1>
			<p>Built with Rust, Go, and determination.</p>
		</header>

		<ProjectList projects={data.projects} />
	</article>
</container>

<style>
	:global(.projects-container) {
		display: block;
		max-width: 90rem;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	:global(.projects-article) {
		margin-bottom: 2rem;
	}

	:global(.projects-header) {
		padding-top: 1rem;
	}

	:global(.projects-header h1) {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		margin-bottom: 0.5rem;
	}

	:global(.projects-header p) {
		color: var(--pico-muted-color);
	}
</style>
