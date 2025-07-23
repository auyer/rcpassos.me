<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
	<header>
		<Nav />
	</header>
	<main class="m-4">
		{@render children?.()}
		<Footer />
	</main>
</div>
