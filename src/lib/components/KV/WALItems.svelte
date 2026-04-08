<script lang="js">
	/** @type {Array<{id:number, content: string}>} */
	export let messages;

	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import WALItem from '$lib/components/KV/WALItem.svelte';
</script>

<div>
	<ol class="wal-list">
		{#each messages as msg (msg.id)}
			<div animate:flip in:fade|global out:fly|global={{ x: 50 }} class="wal-item">
				<WALItem content={msg.content} />
			</div>
		{/each}
	</ol>
</div>

<style>
	:global(.wal-list) {
		border-left: 1px solid var(--pico-muted-border-color);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	[data-theme='dark'] :global(.wal-list) {
		border-color: var(--pico-muted-border-color);
	}
</style>
