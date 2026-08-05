<script lang="js">
	import '@xyflow/svelte/dist/style.css';
	import { SvelteFlow, Controls, MiniMap, Background, BackgroundVariant } from '@xyflow/svelte';
	import HomelabNode from './HomelabNode.svelte';
	import { computeLayout } from '$lib/homelab-layout.js';
	import { getNodeDetails, getLogoPath, resolveLogo } from '$lib/homelab.js';

	const nodeTypes = { homelab: HomelabNode };

	const { nodes: initialNodes, edges: initialEdges } = computeLayout();

	let nodes = $state.raw(initialNodes);
	let edges = $state.raw(initialEdges);
	let selectedNodeId = $state(null);
	let details = $state(null);

	function handleNodeClick({ node }) {
		if (node.type !== 'homelab') return;

		const prev = selectedNodeId;
		const next = prev === node.id ? null : node.id;

		selectedNodeId = next;
		details = next ? getNodeDetails(next) : null;

		nodes = nodes.map((n) => {
			if (n.id === prev) return { ...n, data: { ...n.data, selected: false } };
			if (n.id === next) return { ...n, data: { ...n.data, selected: true } };
			return n;
		});
	}
</script>

<div class="graph-wrapper" style="width:100%; height:100%; min-height:500px;">
	<SvelteFlow
		bind:nodes
		bind:edges
		{nodeTypes}
		fitView
		nodesDraggable
		nodesConnectable={false}
		elementsSelectable={false}
		deleteKey={null}
		disableKeyboardA11y
		defaultEdgeOptions={{ type: 'smoothstep' }}
		colorMode="system"
		onnodeclick={handleNodeClick}
		style="height: 100%;"
	>
		<Controls />
		<Background variant={BackgroundVariant.Dots} gap={20} size={1} />
		<MiniMap />
	</SvelteFlow>
</div>

{#if details}
	<article class="detail-panel">
		<header class="detail-header">
			<img src={getLogoPath(resolveLogo(details.type))} alt={details.type} class="detail-logo" />
			<h3>{details.name}</h3>
			<button
				class="close-btn"
				on:click={() => {
					nodes = nodes.map((n) => ({
						...n,
						data: { ...n.data, selected: false }
					}));
					selectedNodeId = null;
					details = null;
				}}>x</button
			>
		</header>
		<div class="detail-body">
			{#if details.category}
				<div class="detail-row">
					<span class="detail-label">Category</span>
					<span class="detail-value">{details.category}</span>
				</div>
			{/if}
			{#if details.os}
				<div class="detail-row">
					<span class="detail-label">OS</span>
					<span class="detail-value">{details.os}</span>
				</div>
			{/if}
			{#if details.method}
				<div class="detail-row">
					<span class="detail-label">Method</span>
					<span class="detail-value">{details.method}</span>
				</div>
			{/if}
			{#if details.details}
				<div class="detail-row">
					<span class="detail-label">Details</span>
					<span class="detail-value">{details.details}</span>
				</div>
			{/if}
			{#if details.boards?.length}
				<div class="detail-row">
					<span class="detail-label">Boards</span>
					<span class="detail-value">{details.boards.join(', ')}</span>
				</div>
			{/if}
			{#if details.hardware_passthrough?.length}
				<div class="detail-row">
					<span class="detail-label">Passthrough</span>
					<span class="detail-value">{details.hardware_passthrough.join(', ')}</span>
				</div>
			{/if}
			{#if details.services?.length}
				<div class="detail-row">
					<span class="detail-label">Services</span>
					<span class="detail-value">{details.services.join(', ')}</span>
				</div>
			{/if}
			{#if details.ansible_roles?.length}
				<div class="detail-row">
					<span class="detail-label">Ansible Roles</span>
					<span class="detail-value">{details.ansible_roles.join(', ')}</span>
				</div>
			{/if}
			{#if details.storage_pools?.length}
				<div class="detail-row detail-row--block">
					<span class="detail-label">Storage Pools</span>
					{#each details.storage_pools as pool (pool.scheme)}
						<div class="detail-value">
							<strong>{pool.scheme}</strong>: {pool.disks.join(', ')}
						</div>
					{/each}
				</div>
			{/if}
			{#if details.connections?.length}
				<div class="detail-row">
					<span class="detail-label">Connections</span>
					<span class="detail-value">{details.connections.join(', ')}</span>
				</div>
			{/if}
		</div>
	</article>
{/if}

<style>
	:global(.svelte-flow__node-group) {
		border-color: var(--terminal-border);
		border-radius: 10px;
	}

	:global(.svelte-flow__node-group div) {
		color: var(--terminal-fg2) !important;
		font-size: 0.85rem !important;
		padding: 4px 8px !important;
	}

	:global(.svelte-flow__edge-path) {
		stroke: var(--pico-muted-color, #888) !important;
		stroke-width: 1.5px;
	}

	:global(.svelte-flow__edge:hover .svelte-flow__edge-path) {
		stroke: var(--pico-color, #aaa) !important;
	}

	.detail-panel {
		margin-top: 1rem;
		padding: 1rem;
		background: var(--terminal-bg0);
		border: 1px solid var(--terminal-border);
		border-radius: 0;
	}

	.detail-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--terminal-border);
	}

	.detail-logo {
		width: 32px;
		height: 32px;
		object-fit: contain;
	}

	.detail-header h3 {
		margin: 0;
		flex: 1;
	}

	.close-btn {
		background: none;
		border: 1px solid var(--pico-muted-border-color);
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		padding: 0.25rem 0.5rem;
		color: var(--pico-color);
	}

	.detail-body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.detail-row {
		display: flex;
		gap: 0.5rem;
		align-items: baseline;
	}

	.detail-row--block {
		flex-direction: column;
	}

	.detail-label {
		font-weight: bold;
		color: var(--pico-muted-color);
		min-width: 100px;
		font-size: 0.875rem;
	}

	.detail-value {
		font-size: 0.875rem;
	}
</style>
