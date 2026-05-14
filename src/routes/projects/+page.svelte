<script>
	import { name, debian, github, gitlab, codeberg } from '$lib/info.js';
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

			<div class="prose">
				<p>
					My personal projects are on <a href={`https://github.com/${github}`}>Github</a>,
					<a href={gitlab}>Gitlab</a>, <a href={codeberg}>Codebeg</a>. My accounts also have forks
					of projecs I sent patches to.
				</p>
				<p>
					I also contribute to <a href={debian}>Debian</a>, the
					<a href="https://lore.kernel.org/all/?q=rafael%40rcpassos.me"> Linux Kernel</a>, and other
					projects.
				</p>
			</div>
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
