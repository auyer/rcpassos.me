<script>
	export let projects;
	import Card from './Card.svelte';
	import ArrowRightIcon from './ArrowRightIcon.svelte';
</script>

<div class="projects-list">
	{#each projects as project (project.link)}
		<Card href={project.link}>
			<slot slot="eyebrow" name="eyebrow" />
			<slot slot="title">{project.name}</slot>
			<div slot="description" class="prose">
				{@html project.description}
			</div>
			<div slot="actions">
				<div class="read-more-link">
					<a href={project.link}>
						<span class="read-more-text">{project.cta}</span>
						<ArrowRightIcon class="read-more-icon" />
					</a>
				</div>
			</div>
		</Card>
	{/each}
</div>

<style>
	:global(.projects-list) {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	@media (min-width: 768px) {
		:global(.projects-list) {
			border-left: 1px solid var(--pico-muted-border-color);
			padding-left: 1.5rem;
		}
	}

	:global(.read-more-link) {
		display: flex;
		align-items: center;
		color: var(--pico-primary);
	}

	:global(.read-more-text) {
		font-size: 0.875rem;
		font-weight: 500;
	}
</style>
