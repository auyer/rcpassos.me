<script lang="ts">
  export let messages: Array<string>

  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'

  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  // const [send, receive] = crossfade({
  //   duration: (d) => Math.sqrt(d * 200),

  //   fallback(node, params) {
  //     const style = getComputedStyle(node)
  //     const transform = style.transform === 'none' ? '' : style.transform

  //     return {
  //       duration: 600,
  //       easing: quintOut,
  //       css: (t) => `
  // 				transform: ${transform} scale(${t});
  // 				opacity: ${t}
  // 			`
  //     }
  //   }
  // })

  import WALItem from '$lib/components/KV/WALItem.svelte'
</script>

<div>
  <ol class="border-l border-neutral-300 dark:border-neutral-500">
    {#each messages as content (content)}
      <div animate:flip in:fade out:fly={{ x: 100 }} class="item">
        <!-- <label in:receive={{ key: i }} out:send={{ key: i }}> -->
        <WALItem {content} />
      </div>
      <!-- </label> -->
    {/each}
  </ol>
</div>

<style>
  .note {
    color: var(--note-color);
    background-color: var(--bg-color);
  }
</style>
