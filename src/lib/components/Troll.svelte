<script>
	import Card from './Card.svelte';
</script>

<container class="flex flex-col flex-grow w-full mx-auto max-w-2xl items-center">
	<Card>
		<slot slot="eyebrow" name="eyebrow" />
		<slot slot="title">Are you looking for the Admin page ?</slot>
		<div slot="description" class="prose dark:prose-invert">
			<div class="flex flex-row">
				<iframe width="420" height="315" src="https://www.youtube.com/embed/oavMtUWDBTM"> </iframe>
			</div>
			<p>This is a static site.</p>
			<p />
			<p>What are you doing here?</p>
			<p />
		</div>
		<div slot="actions"></div></Card
	>
</container>

<style>
</style>
