<script>
	export let projects;
	import Card from './Card.svelte';
	import ArrowRightIcon from './ArrowRightIcon.svelte';
</script>

<div class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
	{#each projects as project}
		<Card href={project.link}>
			<slot slot="eyebrow" name="eyebrow" />
			<slot slot="title">{project.name}</slot>
			<div slot="description" class="prose dark:prose-invert">
				{@html project.description}
			</div>
			<div slot="actions">
				<div class="flex items-center text-teal-500">
					<span class="text-sm font-medium">{project.cta}</span>
					<ArrowRightIcon class="w-4 h-4 ml-1" />
				</div>
			</div>
		</Card>
	{/each}
</div>
