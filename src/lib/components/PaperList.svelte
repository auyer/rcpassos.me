<script>
	/** @type {{ name: string, published: string, year: number, url: string, language?: string }[]} */
	export let papers;
	export let title;
</script>

<section class="paper-section">
	<h3>{title}</h3>
	<ul class="paper-list">
		{#each papers as paper (paper.url)}
			<li class="paper-item">
				<span class="paper-year">{paper.year} -</span>
				<a href={paper.url} class="paper-title">
					{paper.name}
				</a>
				<p class="paper-published">
					{paper.published}
				</p>
				{#if paper.language}
					<p class="paper-language">
						{paper.language}
					</p>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	:global(.paper-section) {
		margin-bottom: 2rem;
	}

	:global(.paper-section h3) {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--pico-color);
		margin-bottom: 0.75rem;
	}

	:global(.paper-list) {
		gap: 0.75rem;
		display: flex;
		flex-direction: column;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	:global(.paper-item) {
		padding: 1rem;
		gap: 0.75rem;
		border-left: 2px solid var(--pico-muted-border-color);
		background-color: var(--pico-card-background-color);
	}

	:global(.paper-item) {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	:global(.paper-year) {
		color: var(--pico-muted-color);
		flex-shrink: 0;
	}

	:global(.paper-title) {
		color: #2563eb;
		text-decoration: none;
	}

	:global(.paper-title:hover) {
		color: #1d4ed8;
		text-decoration: underline;
	}

	:global(.paper-published) {
		color: var(--pico-color);
	}

	:global(.paper-language) {
		font-size: 0.875rem;
		color: var(--pico-muted-color);
		margin-left: auto;
		text-align: end;
	}
</style>
