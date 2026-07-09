<script>
	import { name } from '$lib/info.js';
	import OrcidBadge from '$lib/components/OrcidBadge.svelte';
	import PaperList from '$lib/components/PaperList.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{name} | Research</title>
</svelte:head>

<container class="research-container">
	<article class="research-article">
		<header class="research-header">
			<h1>Research Preprint Repository</h1>
			<p>My academic contributions and research</p>
		</header>

		<OrcidBadge orcidId={data.orcidId} orcidUrl={`https://orcid.org/${data.orcidId}`} />
		<PaperList title="Publications" papers={data.papers} />
		<PaperList title="Contributions" papers={data.coPapers} />
	</article>
</container>

<style>
	.research-container {
		display: block;
		max-width: 90rem;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.research-article {
		margin-bottom: 2rem;
	}

	.research-header {
		padding-top: 1rem;
		border-bottom: 1px solid var(--pico-muted-border-color);
		padding-bottom: 1rem;
	}

	.research-header h1 {
		padding-top: 0.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--pico-color);
	}

	.research-header p {
		color: var(--pico-muted-color);
		margin-top: 0.5rem;
	}
</style>
