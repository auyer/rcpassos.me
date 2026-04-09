<script>
	export let orcidId;
	export let orcidUrl;
</script>

<div class="orcid-section">
	<h3>My ORCID:</h3>
	<p>
		<a href={orcidUrl} target="_blank" rel="noopener noreferrer" class="orcid-link">
			<img src="/assets/ORCID_iD.svg" alt="ORCID iD" width="50" height="50" />
			<span class="orcid-id">{orcidId}</span>
		</a>
	</p>
</div>

<style>
	:global(.orcid-section) {
		margin-bottom: 1.5rem;
	}

	:global(.orcid-section h3) {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--pico-color);
		margin-bottom: 0.5rem;
	}

	:global(.orcid-link) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.5rem;
		color: var(--pico-muted-color);
		text-decoration: none;
		transition: color 0.15s ease-in-out;
	}

	:global(.orcid-link:hover) {
		color: #16a34a;
	}

	:global(.orcid-id) {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		letter-spacing: 0.025em;
	}

	:global(.orcid-id:hover) {
		text-decoration: underline;
	}
</style>
