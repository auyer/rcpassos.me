<script>
	import { format, parseISO } from 'date-fns';

	export let decorate;
	export let post;
	export let collapsed = false;

	let _class;
	export { _class as class };
</script>

<div class={['post-date', _class].join(' ')} class:decorate={decorate}>
	{#if decorate}
		<span class="date-decorator" aria-hidden="true">
			<span class="date-line"></span>
		</span>
	{/if}
	<div class="date-content" class:flex-col={!collapsed}>
		<time datetime={post.date}>
			{format(new Date(parseISO(post.date)), 'MMMM d, yyyy')}
		</time>
		{#if collapsed}
			<span class="date-separator">•</span>
		{/if}
		<span>{post.readingTime}</span>
	</div>
</div>

<style>
	:global(.post-date) {
		position: relative;
		z-index: 10;
		order: -9999;
		margin-bottom: 0.75rem;
		display: flex;
		color: var(--pico-muted-color);
	}

	:global(.post-date.decorate) {
		padding-left: 0.875rem;
	}

	:global(.date-decorator) {
		position: absolute;
		inset: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding: 0.25rem;
	}

	:global(.date-line) {
		height: 100%;
		width: 0.125rem;
		border-radius: 9999px;
		background-color: var(--pico-muted-border-color);
	}

	:global(.date-content) {
		display: flex;
	}

	:global(.date-content.flex-col) {
		flex-direction: column;
	}

	:global(.date-separator) {
		margin: 0 0.25rem;
	}
</style>
