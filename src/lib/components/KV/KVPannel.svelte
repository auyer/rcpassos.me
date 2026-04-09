<script lang="js">
	export let panelResults =
		'There are no results to display yet.\nUse the actions above to see results here.';

	/** @type {string} */
	let key;
	/** @type {string} */
	let keyClass;
	/** @type {string} */
	let value;
	/** @type {string} */
	let valueClass;

	/**
	 * @param {string} value
	 * @returns {boolean}
	 */
	function validateNotNull(value) {
		return value != null && value.length > 0;
	}

	/**
	 * @returns {boolean}
	 */
	function validateKey() {
		if (!validateNotNull(key)) {
			keyClass = 'input-error';
			return false;
		} else {
			keyClass = 'input-success';
			return true;
		}
	}

	/**
	 * @returns {boolean}
	 */
	function validateValue() {
		if (!validateNotNull(value)) {
			valueClass = 'input-error';
			return false;
		} else {
			valueClass = 'input-success';
			return true;
		}
	}

	function clearClass() {
		keyClass = '';
		valueClass = '';
	}

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function listKeys() {
		clearClass();
		dispatch('listKeys');
	}
	function listPrefix() {
		clearClass();
		if (validateKey()) {
			dispatch('listPrefix', {
				key
			});
		}
	}
	function deleteKey() {
		clearClass();
		if (validateKey()) {
			dispatch('deleteKey', {
				key
			});
		}
	}
	function deletePrefix() {
		clearClass();
		if (validateKey()) {
			dispatch('deletePrefix', {
				key
			});
		}
	}
	function deleteAll() {
		clearClass();
		dispatch('deleteAll');
	}
	function putKey() {
		clearClass();
		const k = validateKey();
		const v = validateValue();
		if (k && v) {
			dispatch('putKey', {
				key,
				value
			});
		}
	}
	function getKey() {
		clearClass();
		if (validateKey()) {
			dispatch('getKey', {
				key
			});
		}
	}

	function cancelBg() {
		clearClass();
		dispatch('cancelBg');
	}
</script>

<article class="kv-panel">
	<h2>Interactive area</h2>
	<form>
		<label class="label">
			<span>Key</span>
			<input class="input {keyClass}" type="text" placeholder="Key" bind:value={key} />
		</label>
		<label>
			<span>Value</span>
			<input class="input {valueClass}" type="text" placeholder="Value" bind:value />
		</label>
	</form>

	<div class="kv-button-grid">
		<button class="btn variant-filled-primary" onclick={getKey}>Read</button>
		<button class="btn variant-filled-primary" onclick={putKey}>Put Key</button>
		<button class="btn variant-filled" onclick={listKeys}>List</button>
		<button class="btn variant-filled" onclick={listPrefix}>List Prefix</button>

		<button class="btn variant-filled-warning" onclick={deleteKey}>Delete</button>
		<button class="btn variant-filled-warning" onclick={deletePrefix}>Delete Prefix</button>
		<button class="btn variant-filled-warning" onclick={deleteAll}>Delete All</button>

		<button class="btn btn-sm variant-filled-error align-top" onclick={cancelBg}>
			Stop<br />Background Job
		</button>
	</div>
	<div class="kv-results">
		<h2>Results area</h2>
		<pre class="kv-results-pre"><code>{panelResults}</code></pre>
	</div>
</article>

<style>
	:global(.kv-panel) {
		padding: 1rem;
		margin: 0.5rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}

	:global(.kv-button-grid) {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;
		padding: 0.5rem;
	}

	@media (min-width: 768px) {
		:global(.kv-button-grid) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	:global(.kv-results) {
		gap: 0.5rem;
	}

	:global(.kv-results-pre) {
		background-color: var(--pico-code-background-color);
		padding: 1rem;
		border-radius: 0.5rem;
		overflow: auto;
	}
</style>
