<script>
	import Card from './Card.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [eyebrow]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { eyebrow, children } = $props();

	const eyebrow_render = $derived(eyebrow);
</script>

<container class="flex flex-col flex-grow w-full mx-auto max-w-2xl items-center">
	<Card>
		{#snippet eyebrow()}
				{@render eyebrow_render?.()}
			{/snippet}
		{#snippet title()}
				{#if children}{@render children()}{:else}Are you looking for the Admin page ?{/if}
			{/snippet}
		{#snippet description()}
				<div  class="prose dark:prose-invert">
				<div class="flex flex-row">
					<iframe width="420" height="315" src="https://www.youtube.com/embed/oavMtUWDBTM"> </iframe>
				</div>
				<p>This is a static site.</p>
				<p></p>
				<p>What are you doing here?</p>
				<p></p>
			</div>
			{/snippet}
		{#snippet actions()}
				<div ></div>
			{/snippet}</Card
	>
</container>

<style>
</style>
