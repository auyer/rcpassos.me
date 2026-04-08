<script lang="js">
	// TODO: generate this dynamically
	const papers = [
		{
			name: 'Streamlining Analyses on the Linux Kernel with DUKS',
			published: '13th IEEE VISSOFT',
			year: 2025,
			url: 'research/linux-kernel-with-DUKS-vissoft-2025'
		},
		{
			name: 'DUKS: visualizações e análises unificadas para o Kernel Linux',
			published: 'XIII VEM (CBSoft)',
			year: 2025,
			language: 'PT-BR 🇧🇷',
			url: 'https://doi.org/10.5753/vem.2025.14637'
		}
	];

	const co_papers = [
		{
			name: 'Guidelines for Boosting Long-Lasting FLOSS Contributors',
			published: 'DebConf25 Brest',
			year: 2025,
			url: 'https://hal.science/hal-05334509'
		},
		{
			name: 'Estratégias de ensino para incentivar a participação consistente em projetos de Software Livre',
			published: 'XIII VEM (CBSoft)',
			year: 2025,
			language: 'PT-BR 🇧🇷',
			url: 'https://doi.org/10.5753/vem.2025.14524'
		}
	];

	// Author's ORCID information
	const orcidId = '0009-0003-3657-5519';
	const orcidUrl = `https://orcid.org/${orcidId}`;
</script>

<div class="research-container">
	<div class="research-card">
		<header class="research-header">
			<h1>Research Preprint Repository</h1>
			<p>My academic contributions and research</p>
		</header>
		<section>
			<h3>My ORCID:</h3>
			<p>
				<a
					href={orcidUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="orcid-link"
				>
					<img src="/assets/ORCID_iD.svg" alt="ORCID iD" width="50" height="50" />
					<span class="orcid-id">{orcidId}</span>
				</a>
			</p>
		</section>
		<section>
			<h3>Publications</h3>
			<ul class="paper-list">
				{#each papers as paper, i}
					<div class="paper-item">
						<li>
							<span class="paper-year">{paper.year} -</span>
							<a
								href={paper.url}
								class="paper-title"
							>
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
					</div>
				{/each}
			</ul>
		</section>
		<section>
			<h3>Contributions</h3>
			<ul class="paper-list">
				{#each co_papers as paper, i}
					<div class="paper-item">
						<li>
							<span class="paper-year">{paper.year} -</span>
							<a
								href={paper.url}
								class="paper-title"
							>
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
					</div>
				{/each}
			</ul>
		</section>
	</div>
</div>

<style>
	:global(.research-container) {
		display: flex;
		margin-left: auto;
		margin-right: auto;
		justify-content: center;
		align-items: center;
	}

	:global(.research-card) {
		max-width: 56rem;
		width: 100%;
		border-radius: 0.5rem;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		background-color: var(--pico-card-background-color);
		border: 1px solid var(--pico-card-border-color);
		gap: 1.5rem;
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		:global(.research-card) {
			padding: 2rem;
		}
	}

	[data-theme='dark'] :global(.research-card) {
		background-color: var(--pico-background-color);
		border-color: var(--pico-muted-border-color);
	}

	:global(.research-header) {
		border-bottom: 1px solid var(--pico-muted-border-color);
		padding-bottom: 1rem;
	}

	:global(.research-header h1) {
		font-size: 1.875rem;
		font-weight: 700;
		color: var(--pico-color);
	}

	[data-theme='dark'] :global(.research-header h1) {
		color: var(--pico-color);
	}

	:global(.research-header p) {
		color: var(--pico-muted-color);
		margin-top: 0.25rem;
	}

	[data-theme='dark'] :global(.research-header p) {
		color: var(--pico-secondary);
	}

	:global(.research-card section h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--pico-color);
		margin-bottom: 0.75rem;
	}

	[data-theme='dark'] :global(.research-card section h3) {
		color: var(--pico-color);
	}

	:global(.orcid-link) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.875rem;
		color: var(--pico-muted-color);
		text-decoration: none;
		transition: color 0.15s ease-in-out;
	}

	:global(.orcid-link:hover) {
		color: #16a34a;
	}

	[data-theme='dark'] :global(.orcid-link:hover) {
		color: #4ade80;
	}

	:global(.orcid-id) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
		letter-spacing: 0.025em;
	}

	:global(.orcid-id:hover) {
		text-decoration: underline;
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
		gap: 1rem;
		border: 1px solid var(--pico-card-border-color);
		background-color: var(--pico-muted-border-color);
		margin: 0.5rem;
	}

	[data-theme='dark'] :global(.paper-item) {
		background-color: var(--pico-card-background-color);
		border-color: var(--pico-muted-border-color);
	}

	:global(.paper-item li) {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	:global(.paper-year) {
		color: var(--pico-muted-color);
	}

	[data-theme='dark'] :global(.paper-year) {
		color: var(--pico-secondary);
	}

	:global(.paper-title) {
		color: #2563eb;
		text-decoration: none;
	}

	:global(.paper-title:hover) {
		color: #1d4ed8;
		text-decoration: underline;
	}

	[data-theme='dark'] :global(.paper-title) {
		color: #60a5fa;
	}

	[data-theme='dark'] :global(.paper-title:hover) {
		color: #93c5fd;
	}

	:global(.paper-published) {
		color: var(--pico-color);
	}

	[data-theme='dark'] :global(.paper-published) {
		color: var(--pico-color);
	}

	:global(.paper-language) {
		font-size: 0.875rem;
		color: var(--pico-muted-color);
		margin-left: auto;
		text-align: end;
	}

	[data-theme='dark'] :global(.paper-language) {
		color: var(--pico-muted-color);
	}
</style>
