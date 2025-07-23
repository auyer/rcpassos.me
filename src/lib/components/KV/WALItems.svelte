<script lang="js">
	

	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import WALItem from '$lib/components/KV/WALItem.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {Array<{id:number, content: string}>} messages
	 */

	/** @type {Props} */
	let { messages } = $props();
</script>

<div>
	<ol class="border-l border-neutral-300 dark:border-neutral-500">
		{#each messages as msg (msg.id)}
			<div animate:flip in:fade|global out:fly|global={{ x: 50 }} class="item">
				<WALItem content={msg.content} />
			</div>
		{/each}
	</ol>
</div>
