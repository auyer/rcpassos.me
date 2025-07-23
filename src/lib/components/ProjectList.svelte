<script>
	import Card from './Card.svelte';
	import ArrowRightIcon from './ArrowRightIcon.svelte';
	let { projects, eyebrow, children } = $props();

	const eyebrow_render = $derived(eyebrow);
</script>

<div class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
	{#each projects as project}
		<Card href={project.link}>
			{#snippet eyebrow()}
						{@render eyebrow_render?.()}
					{/snippet}
			{#snippet title()}
						{#if children}{@render children()}{:else}{project.name}{/if}
					{/snippet}
			{#snippet description()}
						<div  class="prose dark:prose-invert">
					{@html project.description}
				</div>
					{/snippet}
			{#snippet actions()}
						<div >
					<div class="flex items-center text-teal-500">
						<span class="text-sm font-medium">{project.cta}</span>
						<ArrowRightIcon class="w-4 h-4 ml-1" />
					</div>
				</div>
					{/snippet}
		</Card>
	{/each}
</div>
