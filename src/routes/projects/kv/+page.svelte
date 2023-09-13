<script lang="ts">
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

	let pannelResults: string;

	let messages = Array<string>();

	onMount(() => {
		openConnection();
		messageStore.subscribe((currentMessage) => {
			if (currentMessage === undefined) {
				return;
			}
			if (messages?.length >= 30) {
				messages.pop()!;
			}
			messages = [currentMessage, ...messages];
		});
	});

	let session_id = (Math.random() + 1).toString(36).substring(7);
	let iter: number = 0;
	let cancel: boolean = false;

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
		pannelResults = `There are no results to display yet.\nUse the actions above to see results here.\n\nA background job is running in your browser with id ${session_id}.\nCheck the WAL for details.`;
		putKeyBackground();
	});

	const cancelBg = async () => {
		cancel = true;

		pannelResults = `Background process cancelled.`;
	};

	const deletePrefix = async ({ detail: { key } }) => {
		const [results, err] = await DeletePrefix(key);

		if (err) {
			pannelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			pannelResults = `DELETED ALL KEYS\nWITH PREFIX\n${key}`;
		}
	};

	const deleteAll = async () => {
		const [err] = await DeleteAll();

		if (err) {
			pannelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			pannelResults = `DELETED ALL KEYS`;
		}
	};

	const deleteKey = async ({ detail: { key } }) => {
		const [result, err] = await DeleteKey(key);

		if (err) {
			pannelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			const value = JSON.stringify(result);
			pannelResults = `DELETED\n${key}\nValue\n${value}`;
		}
	};

	const listKeys = async () => {
		const [results, err] = await ListKeys();

		if (err) {
			pannelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			const values = results.join('\n');
			pannelResults = `LIST\n${values}`;
		}
	};

	const listPrefix = async ({ detail: { key } }) => {
		const [results, err] = await ListPrefix(key);

		if (err) {
			pannelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			const values = results?.join('\n');
			pannelResults = `LIST\n${values}`;
		}
	};

	const putKey = async ({ detail: { key, value } }) => {
		const err = await PutKeyValue(key, value);

		if (err) {
			pannelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			pannelResults = `INSERT\n${key}\nValue\n${value}`;
		}
	};

	const getKey = async ({ detail: { key } }) => {
		const [result, err] = await GetKey(key);

		if (err) {
			pannelResults = `ERROR: ${JSON.stringify(err)}`;
		} else {
			const value = JSON.stringify(result);
			pannelResults = `READ\n${key}\nValue\n${value}`;
		}
	};

	import WALItems from '$lib/components/KV/WALItems.svelte';
	import KVPannel from '$lib/components/KV/KVPannel.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<div class="gap-8">
	<div class="card w-full max-w-6xl mx-auto m-5 p-2">
		<Accordion>
			<AccordionItem open>
				<svelte:fragment slot="summary"
					><h3 class="h3">In memory Key Value DB with Live feed</h3></svelte:fragment
				>
				<svelte:fragment slot="content">
					<p>
						A KV in memory database built in Rust for learning purposes with a live feed of the WAL
						(Write Ahead Log).
					</p>
					<p>This page has a controll pannel and a WebSocket feed.</p>
					<p>
						The server is hosted in a small free-tier cloud VM, with WAF rules to allow Cloudflare
						proxy as the only ingress point.
					</p>
					<a href="http://github.com/auyer/MemoryKV">github.com/auyer/MemoryKV</a>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>

	<container class="w-full max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
		<KVPannel
			{pannelResults}
			on:listKeys={listKeys}
			on:putKey={putKey}
			on:getKey={getKey}
			on:listPrefix={listPrefix}
			on:deleteKey={deleteKey}
			on:deletePrefix={deletePrefix}
			on:deleteAll={deleteAll}
			on:cancelBg={cancelBg}
		/>
		<div class="card p-4 space-y-8">
			<div class="shadow-xl rounded-lg p-4">
				<h2 class="p-4">Live Database feed</h2>
				<div class="card card-hover p-4 overflow-auto">
					<WALItems {messages} />
				</div>
			</div>
		</div>
	</container>
</div>
