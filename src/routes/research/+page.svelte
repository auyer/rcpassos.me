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
		}
	];

	// Author's ORCID information
	const orcidId = '0009-0003-3657-5519';
	const orcidUrl = `https://orcid.org/${orcidId}`;
</script>

<div class="flex mx-auto lg:max-w-none items-center justify-center">
	<div class="max-w-4xl w-full rounded-lg shadow-lg p-6 md:p-8 space-y-6">
		<header class="border-b border-slate-200 pb-4">
			<h1 class="text-3xl font-bold text-slate-800">Research Preprint Repository</h1>
			<p class="text-slate-500 mt-1">My academic contributions and research</p>
		</header>
		<section>
			<h3 class="text-xl font-semibold text-slate-700 mb-3">My ORCID:</h3>
			<p>
				<a
					href={orcidUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-gray-600 text-3xl hover:text-green-600 transition-colors group"
				>
					<img src="/assets/ORCID_iD.svg" alt="ORCID iD" width="50" height="50" />
					<span class="font-mono tracking-wide group-hover:underline">{orcidId}</span>
				</a>
			</p>
		</section>
		<section>
			<h3 class="text-xl font-semibold text-slate-700 mb-3">Publications</h3>
			<ul class="space-y-3">
				{#each papers as paper, i}
					<div class="card p-4 m-2 space-y-4">
						<li class="flex items-start gap-3">
							<span>{paper.year} -</span>
							<a href={paper.url} class="text-blue-600 hover:text-blue-800 hover:underline">
								{paper.name}
							</a>
							<p class="text-md">
								{paper.published}
							</p>
							{#if paper.language}
								<p class="text-sm text-end ml-auto" > {paper.language}</p>
							{/if}
						</li>
					</div>
				{/each}
			</ul>
		</section>
		<section>
			<h3 class="text-xl font-semibold text-slate-700 mb-3">Contributions</h3>
			<ul class="space-y-3">
				{#each co_papers as paper, i}
					<div class="card p-4 m-2 space-y-4">
						<li class="flex items-start gap-3">
							<span>{paper.year} -</span>
							<a href={paper.url} class="text-blue-600 hover:text-blue-800 hover:underline">
								{paper.name}
							</a>
							<p class="text-md">
								{paper.published}
							</p>
							{#if paper.language}
								<p class="text-sm text-end ml-auto" > {paper.language}</p>
							{/if}
						</li>
					</div>
				{/each}
			</ul>
		</section>
	</div>
</div>
