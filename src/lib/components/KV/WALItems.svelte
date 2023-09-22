<script lang="js">
	/** @type {Array<{id:number, content: string}>} */
	export let messages;

	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import WALItem from '$lib/components/KV/WALItem.svelte';
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
