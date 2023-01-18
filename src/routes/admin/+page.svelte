<script>
  import { bio, name } from '$lib/info.js'
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
</svelte:head>

<container class="flex flex-col flex-grow w-full mx-auto max-w-4xl">
 <p>There is nothing here.<p/>
 <p>This is a static site.<p/>
 <p>What are you doing here?<p/>
</container>

<style >
</style>
