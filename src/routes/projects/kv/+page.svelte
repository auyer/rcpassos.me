<script lang="js">
	import { openConnection, messageStore } from '$lib/store/wal';
	import { onMount } from 'svelte';

	import {
		ListKeys,
		ListPrefix,
		PutKeyValue,
		GetKey,
		DeleteKey,
		DeletePrefix,
		DeleteAll
	} from '$lib/services';

	/** @type {String} */
	let panelResults = '';

	/** @type {Array<{id:number, content: string}>} */
	let messages = [];

	onMount(() => {
		openConnection();
		messageStore.subscribe((currentMessage) => {
			if (currentMessage === undefined) {
				return;
			}
			if (messages?.length >= 30) {
				messages.pop();
			}
			messages = [currentMessage, ...messages];
		});
	});

	let session_id = (Math.random() + 1).toString(36).substring(7);
	/** @type {Number} */
	let iter = 0;
	/** @type {Boolean} */
	let cancel = false;

	async function putKeyBackground() {
		if (cancel) {
			return;
		}
		iter++;
		await PutKeyValue(`bg:${session_id}:iter:${iter}`, {
			background_iter: iter,
			sent_at: new Date().toISOString()
		});
		setTimeout(putKeyBackground, 20000);
	}

	onMount(async () => {
		panelResults = `There are no results to display yet.\nUse the actions above to see results here.\n\nA background job is running in your browser with id ${session_id}.\nCheck the WAL for details.`;
		putKeyBackground();
	});

	const cancelBg = async () => {
		cancel = true;

		panelResults = `Background process cancelled.`;
	};

	/** @param {{ detail: { key: string } }} event */
	const deletePrefix = async ({ detail: { key } }) => {
		const [, err] = await DeletePrefix(key);

		if (err) {
			panelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			panelResults = `DELETED ALL KEYS\nWITH PREFIX\n${key}`;
		}
	};

	const deleteAll = async () => {
		const [err] = await DeleteAll();

		if (err) {
			panelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			panelResults = `DELETED ALL KEYS`;
		}
	};

	/** @param {{ detail: { key: string } }} event */
	const deleteKey = async ({ detail: { key } }) => {
		const [result, err] = await DeleteKey(key);
		console.log('result', result, err);
		if (err) {
			panelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			const value = JSON.stringify(result);
			panelResults = `DELETED\n${key}\nValue\n${value}`;
		}
	};

	const listKeys = async () => {
		const [results, err] = await ListKeys();

		if (err) {
			panelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			const values = results?.join('\n') ?? '';
			panelResults = `LIST\n${values}`;
		}
	};

	/** @param {{ detail: { key: string } }} event */
	const listPrefix = async ({ detail: { key } }) => {
		const [results, err] = await ListPrefix(key);

		if (err) {
			panelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			const values = results?.join('\n');
			panelResults = `LIST\n${values}`;
		}
	};

	/** @param {{ detail: { key: string, value: string } }} event */
	const putKey = async ({ detail: { key, value } }) => {
		const [prev, err] = await PutKeyValue(key, value);

		if (err) {
			panelResults = `ERROR: ${JSON.stringify(err)}`;
		} else if (prev !== '') {
			panelResults = `INSERT\n${key}\nValue\n${value}\nPrevious Value\n${prev}`;
		} else {
			panelResults = `INSERT\n${key}\nValue\n${value}`;
		}
	};

	/** @param {{ detail: { key: string } }} event */
	const getKey = async ({ detail: { key } }) => {
		const [result, err] = await GetKey(key);

		if (err) {
			panelResults = `ERROR: ${JSON.stringify(err)}`;
		} else if (result !== '') {
			const value = result?.toString();
			panelResults = `READ\n${key}\nValue\n${value}`;
		} else {
			panelResults = `READ\n${key}\nValue Not Found`;
		}
	};

	import WALItems from '$lib/components/KV/WALItems.svelte';
	import KVPanel from '$lib/components/KV/KVPanel.svelte';
</script>

<div class="kv-page">
	<details class="kv-accordion">
		<summary>
			<h3>MemoryKV: an in memory Key Value DB with Live a feed</h3>
		</summary>
		<p>
			This is a KV in memory database I built in Rust for learning purposes with a live feed of the
			WAL (Write Ahead Log).
		</p>
		<p>This page has a control panel and a WebSocket feed.</p>
		<p>
			The server is hosted in a small free-tier cloud VM, with <s
				>WAF rules to allow Cloudflare proxy as the only ingress point.</s
			> Cloudflare Tunnel acting as a reverse Proxy.
		</p>
		<p>
			Play with it, inserting some data, and looking for what is inside the database. When this page
			is loaded, a background job is started in your browser, sending data to the server every 20
			seconds. It should be showing in the feed, among the other requests that might come from other
			visitors.
		</p>
		Source code:<a href="http://github.com/auyer/MemoryKV">github.com/auyer/MemoryKV</a>
	</details>

	<container class="kv-grid">
		<KVPanel
			{panelResults}
			on:listKeys={listKeys}
			on:putKey={putKey}
			on:getKey={getKey}
			on:listPrefix={listPrefix}
			on:deleteKey={deleteKey}
			on:deletePrefix={deletePrefix}
			on:deleteAll={deleteAll}
			on:cancelBg={cancelBg}
		/>
		<div class="kv-feed">
			<div class="kv-feed-card">
				<h2>Live Database feed</h2>
				<div class="kv-feed-content">
					<WALItems {messages} />
				</div>
			</div>
		</div>
	</container>
</div>

<style>
	:global(.kv-page) {
		gap: 2rem;
	}

	:global(.kv-accordion) {
		width: 100%;
		max-width: 72rem;
		margin-left: auto;
		margin-right: auto;
		padding: 1.25rem;
	}

	:global(.kv-accordion h3) {
		margin: 0;
	}

	:global(.kv-grid) {
		width: 100%;
		max-width: 72rem;
		margin-left: auto;
		margin-right: auto;
		display: grid;
		gap: 0.5rem;
	}

	@media (min-width: 768px) {
		:global(.kv-grid) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1rem;
		}
	}

	:global(.kv-feed) {
		padding: 1rem;
		gap: 2rem;
	}

	:global(.kv-feed-card) {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		padding: 1rem;
	}

	:global(.kv-feed-card h2) {
		padding: 1rem;
	}

	:global(.kv-feed-content) {
		padding: 1rem;
		overflow: auto;
	}
</style>
