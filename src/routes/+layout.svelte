<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<link rel="preload" as="font" type="font/woff2" crossorigin href="/fira/woff2/FiraCode-VF.woff2">
</svelte:head>

<header>
	<Nav />
</header>

<main>
	<slot />
</main>

<Footer />
