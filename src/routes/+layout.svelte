<script>
	import '../theme.postcss';

	// Highlight JS
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { storePopup } from '@skeletonlabs/skeleton';
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
