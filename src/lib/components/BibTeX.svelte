<script>
	export let open = false;
	export let content = '';

	let copied = false;
	/** @type {ReturnType<typeof setTimeout>} */
	let copyTimeout;

	async function copy() {
		await navigator.clipboard.writeText(content);
		copied = true;
		clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => {
			copied = false;
		}, 1500);
	}

	function toggle() {
		open = !open;
	}
</script>

<div class="bibtex">
	<div class="bibtex-header">
		<span class="bibtex-label">
			[<span class="bibtex-name">
				<span class="bibtex-name-text">BibTeX</span>
				<button type="button" class="bibtex-button bibtex-toggle" on:click={toggle}>
					{open ? 'close' : 'open'}
				</button>
			</span>:
			<button type="button" class="bibtex-button" on:click={copy}>
				{copied ? 'copied!' : 'copy'}
			</button>
			]
		</span>
	</div>
	{#if open}
		<textarea class="bibtex-content" readonly rows={content.split('\n').length}>{content}</textarea>
	{/if}
</div>

<style>
	.bibtex {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.bibtex-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.bibtex-label {
		font-weight: 600;
		color: var(--pico-color);
	}

	.bibtex-name {
		position: relative;
		display: inline-grid;
	}

	.bibtex-name-text,
	.bibtex-name .bibtex-toggle {
		grid-area: 1 / 1;
	}

	.bibtex-button {
		width: auto;
		margin: 0;
		padding: 0.125rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.bibtex-name .bibtex-toggle {
		place-self: center;
		padding: 0 0.25rem;
		z-index: 1;
	}

	.bibtex-name-text {
		pointer-events: none;
	}

	.bibtex-toggle {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.15s ease-in-out;
	}

	.bibtex:hover .bibtex-name-text {
		opacity: 0;
	}

	.bibtex:hover .bibtex-toggle,
	.bibtex-toggle:focus-visible {
		opacity: 1;
		visibility: visible;
	}

	.bibtex-content {
		width: 100%;
		resize: vertical;
		font-size: 0.875rem;
		white-space: pre;
		overflow-x: auto;
	}
</style>
