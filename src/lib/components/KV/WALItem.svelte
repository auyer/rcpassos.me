<script lang="js">
	/** @type {string} */
	export let content;
</script>

<li>
	<div class="wal-item-content">
		<div class="wal-item-dot"></div>
		<p class="note">{content}</p>
	</div>
</li>

<style>
	:global(.wal-item-content) {
		display: flex;
		align-items: center;
		padding-top: 0.75rem;
	}

	:global(.wal-item-dot) {
		margin-left: -5px;
		margin-right: 0.75rem;
		height: 9px;
		width: 9px;
		border-radius: 9999px;
		background-color: var(--pico-muted-border-color);
	}
</style>
