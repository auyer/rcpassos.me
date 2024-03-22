<script>
	import { bio, name } from '$lib/info.js';
	import Troll from '$lib/components/Troll.svelte';
</script>

<svelte:head>
	<title>Admin: {name}</title>
	<meta name="description" content={bio} />
</svelte:head>

<container>
	<Troll />
</container>

<style>
</style>
