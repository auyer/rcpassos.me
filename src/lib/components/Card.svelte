<script>
	export let as = 'article';
	export let href = undefined;

	let _class = undefined;
	export { _class as class };
</script>

<svelte:element this={as} class={['card-item', _class].join(' ')}>
	<slot name="eyebrow" />

	{#if $$slots.title}
		<div class="card-title">
			{#if href}
				<a {href} data-sveltekit-preload-data="hover">
					<slot name="title" />
				</a>
			{:else}
				<slot name="title" />
			{/if}
		</div>
	{/if}

	{#if $$slots.description}
		<div class="card-description" class:mt-2={!!$$slots.title}>
			<slot name="description" />
		</div>
	{/if}

	{#if $$slots.actions}
		<div aria-hidden="true" class="card-actions">
			<slot name="actions" />
		</div>
	{/if}
</svelte:element>

<style>
	:global(.card-item) {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0px;
		margin: 0;
		box-shadow: none;
	}

	:global(.card-item:hover .card-hover-bg) {
		transform: scale(1);
		opacity: 1;
	}

	:global(.card-title) {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		color: var(--pico-color);
	}

	[data-theme='dark'] :global(.card-title) {
		color: var(--pico-color);
	}

	:global(.card-description) {
		position: relative;
		flex: 1;
		font-size: 0.875rem;
		color: var(--pico-muted-color);
	}

	[data-theme='dark'] :global(.card-description) {
		color: var(--pico-secondary);
	}

	:global(.card-description.mt-2) {
		margin-top: 0.5rem;
	}

	:global(.card-actions) {
		position: relative;
		display: flex;
		align-items: center;
		margin-top: 1rem;
	}
</style>
