<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<header>
		<Nav />
	</header>
	<main class="m-4">
		<slot />
		<Footer />
	</main>
</div>
