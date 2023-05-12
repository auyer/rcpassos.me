<script lang="ts">
  export let messages: Array<string>

  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  import WALItem from '$lib/components/KV/WALItem.svelte'
</script>

<div>
  <ol class="border-l border-neutral-300 dark:border-neutral-500">
    {#each messages as content (content)}
      <div animate:flip in:fade out:fly={{ x: 100 }} class="item">
        <WALItem {content} />
      </div>
    {/each}
  </ol>
</div>

<style>
  .note {
    color: var(--note-color);
    background-color: var(--bg-color);
  }
</style>
