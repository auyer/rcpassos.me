<script>
	import Card from './Card.svelte';
</script>

<container class="troll-container">
	<Card>
		<slot slot="eyebrow" name="eyebrow" />
		<slot slot="title">Are you looking for the Admin page ?</slot>
		<div slot="description" class="prose">
			<div class="troll-video">
				<iframe
					width="420"
					height="315"
					src="https://www.youtube.com/embed/oavMtUWDBTM"
					title="YouTube video"
				></iframe>
			</div>
			<p>This is a static site.</p>
			<p></p>
			<p>What are you doing here?</p>
			<p></p>
		</div>
		<div slot="actions"></div></Card
	>
</container>

<style>
	:global(.troll-container) {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		width: 100%;
		max-width: 42rem;
		margin-left: auto;
		margin-right: auto;
		align-items: center;
	}

	:global(.troll-video) {
		display: flex;
		flex-direction: row;
	}
</style>
