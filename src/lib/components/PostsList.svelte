<script>
	import PostPreview from '$lib/components/PostPreview.svelte';
	import PostDate from '$lib/components/PostDate.svelte';

	export let posts;
</script>

<div class="posts-list">
	{#each posts as post}
		<article class="post-article">
			<PostDate class="post-date-desktop" {post} decorate />

			<div class="post-content">
				<PostPreview {post}>
					<slot slot="eyebrow">
						<PostDate class="post-date-mobile" {post} collapsed decorate />
					</slot>
				</PostPreview>
			</div>
		</article>
	{/each}
</div>

<style>
	:global(.posts-list) {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	@media (min-width: 768px) {
		:global(.posts-list) {
			border-left: 1px solid var(--pico-muted-border-color);
			padding-left: 1.5rem;
		}

		[data-theme='dark'] :global(.posts-list) {
			border-color: color-mix(in srgb, var(--pico-muted-border-color) 40%, transparent);
		}
	}

	:global(.post-article) {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 2rem;
		align-items: start;
	}

	:global(.post-date-desktop) {
		flex-direction: column;
	}

	@media (max-width: 767px) {
		:global(.post-date-desktop) {
			display: none;
		}
	}

	@media (min-width: 768px) {
		:global(.post-date-desktop) {
			display: flex;
		}
	}

	:global(.post-content) {
		grid-column: span 4 / span 4;
	}

	@media (min-width: 768px) {
		:global(.post-content) {
			grid-column: span 3 / span 3;
		}
	}

	:global(.post-date-mobile) {
		/* Already handled by PostDate component */
	}

	@media (min-width: 768px) {
		:global(.post-date-mobile) {
			display: none;
		}
	}
</style>
