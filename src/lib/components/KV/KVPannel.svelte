<script lang="js">

	/** @type {string} */
	let key = $state();
	/** @type {string} */
	let keyClass = $state();
	/** @type {string} */
	let value = $state();
	/** @type {string} */
	let valueClass = $state();

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

	/** @type {boolean} */
	let isFocused = true;
	/**
	 * @typedef {Object} Props
	 * @property {string} [panelResults]
	 */

	/** @type {Props} */
	let { panelResults = 'There are no results to display yet.\nUse the actions above to see results here.' } = $props();
</script>

<div class="card p-4 m-2 space-y-4">
	<h2>Interactive area</h2>
	<form>
	<!-- <form use:focusTrap={isFocused}> -->
		<label class="label">
			<span>Key</span>
			<input class="input {keyClass}" type="text" placeholder="Key" bind:value={key} />
		</label>
		<label class="label">
			<span>Value</span>
			<input class="input {valueClass}" type="text" placeholder="Value" bind:value />
		</label>
	</form>

	<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
		<button class="btn variant-filled-primary text-center" onclick={getKey}>Read</button>
		<button class="btn variant-filled-primary text-center" onclick={putKey}>Put Key</button>
		<button class="btn variant-filled text-center" onclick={listKeys}>List</button>
		<button class="btn variant-filled text-center" onclick={listPrefix}>List Prefix</button>

		<button class="btn variant-filled-warning text-center" onclick={deleteKey}>Delete</button>
		<button class="btn variant-filled-warning text-center" onclick={deletePrefix}
			>Delete Prefix</button
		>
		<button class="btn variant-filled-warning text-center" onclick={deleteAll}>Delete All</button>

		<button class="btn btn-sm variant-filled-error align-top" onclick={cancelBg}>
			Stop
			<br />
			Background Job
		</button>
	</div>
	<div class="gap-2">
		<h2>Results area</h2>
		<div class="mockup-code w-full">
			<pre data-prefix="$"><code>{panelResults}</code></pre>
			<pre data-prefix=">" class="text-warning"><code>installing...</code></pre>
			<pre data-prefix=">" class="text-success"><code>Done!</code></pre>
		</div>
	</div>
</div>
