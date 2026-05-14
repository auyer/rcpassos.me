<script lang="js">
	import HomelabGraph from '$lib/components/HomelabGraph.svelte';
</script>

<svelte:head>
	<title>Homelab Docs</title>
	<meta name="description" content="Interactive visualization of my home lab infrastructure." />
</svelte:head>

<div class="homelab-page">
	<div class="homelab-header-wrap">
		<header class="homelab-header">
			<h1>Home Lab</h1>
			<p>
				Personal map of my HomeLab. Some of these are configured with Ansible: <a
					href="https://github.com/auyer/HomeLab">auyer/Homelab</a
				>.
			</p>
		</header>
	</div>

	<div class="homelab-graph-wrap">
		<HomelabGraph />
	</div>
</div>

<style>
	:global(.homelab-page) {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 5.5rem);
	}

	:global(.homelab-header-wrap) {
		max-width: 720px;
		width: 100%;
		margin: 0 auto;
		padding: 1rem 1rem 0 1rem;
		flex-shrink: 0;
	}

	:global(.homelab-header) {
		padding-top: 1rem;
		border-bottom: 1px solid var(--terminal-border);
		padding-bottom: 1rem;
		margin-bottom: 0;
	}

	:global(.homelab-header h1) {
		font-size: 1.25rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--terminal-fg);
	}

	:global(.homelab-header p) {
		color: var(--terminal-fg2);
		margin-top: 0.5rem;
	}

	:global(.homelab-graph-wrap) {
		flex: 1 1 0;
		min-height: 0;
		padding: 0 1rem 1rem 1rem;
	}
</style>
