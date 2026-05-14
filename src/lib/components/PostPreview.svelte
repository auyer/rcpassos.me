<script>
	import Card from './Card.svelte';
	import ArrowRightIcon from './ArrowRightIcon.svelte';

	export let post;
</script>

<Card href={`/post/${post.slug}`}>
	<slot slot="eyebrow" name="eyebrow" />
	<slot slot="title">{post.title}</slot>
	<div slot="description" class="prose">
		{@html post.preview.html}
	</div>
	<div slot="actions">
		<div class="read-more-link">
			<a href={`/post/${post.slug}`}>
				<span class="read-more-text">Read</span>
				<ArrowRightIcon class="read-more-icon" />
			</a>
		</div>
	</div>
</Card>

<style>
	:global(.prose > p) {
		margin-top: 0;
		margin-bottom: 0;
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
