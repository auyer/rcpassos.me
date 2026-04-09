<script>
	import PostPreview from '$lib/components/PostPreview.svelte';
	import PostDate from '$lib/components/PostDate.svelte';

	export let posts;
</script>

<div class="posts-list">
	{#each posts as post (post.slug)}
		<article class="posts-list-item">
			<PostDate class="post-date-desktop" {post} decorate />
			<PostPreview {post}>
				<slot slot="eyebrow">
					<PostDate class="post-date-mobile" {post} collapsed decorate />
				</slot>
			</PostPreview>
		</article>
	{/each}
</div>

<style>
	:global(.posts-list) {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		:global(.posts-list) {
			border-left: 1px solid var(--pico-muted-border-color);
			padding-left: 1rem;
		}
	}

	:global(.posts-list-item) {
		display: grid;
		grid-template-columns: 1fr;
		align-items: start;
	}

	@media (min-width: 768px) {
		:global(.posts-list-item) {
			grid-template-columns: 160px 1fr;
		}
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
			/* Pull date flush with the border-left edge, counteracting the parent padding */
			margin-left: -1.5rem;
		}
	}

	:global(.posts-list-content) {
		grid-column: 1;
	}

	@media (min-width: 768px) {
		:global(.posts-list-content) {
			grid-column: 2;
		}
	}

	@media (min-width: 768px) {
		:global(.post-date-mobile) {
			display: none;
		}
	}
</style>
