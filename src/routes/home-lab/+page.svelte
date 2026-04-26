<script lang="js">
	import HomelabGraph from '$lib/components/HomelabGraph.svelte';
</script>

<svelte:head>
	<title>Homelab Docs</title>
	<meta
		name="description"
		content="Interactive visualization of my home lab infrastructure."
	/>
</svelte:head>

<container class="homelab-container">
	<article class="homelab-article">
		<header class="homelab-header">
			<h1>Home Lab</h1>
			<p>Interactive visualization of my home lab infrastructure. Click on any node to view its details.</p>
		</header>
		<HomelabGraph />
	</article>
</container>

<style>
	:global(.homelab-container) {
		display: block;
		max-width: 72rem;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	:global(.homelab-article) {
		margin-bottom: 2rem;
	}

	:global(.homelab-header) {
		padding-top: 1rem;
		border-bottom: 1px solid var(--pico-muted-border-color);
		padding-bottom: 1rem;
		margin-bottom: 1.5rem;
	}

	:global(.homelab-header h1) {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--pico-color);
	}

	:global(.homelab-header p) {
		color: var(--pico-muted-color);
		margin-top: 0.5rem;
	}
</style>
