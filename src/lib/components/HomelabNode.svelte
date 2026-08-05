<script>
	import { Handle, Position } from '@xyflow/svelte';

	let { id, data, selected } = $props();
</script>

<div class="hnode" class:selected>
	<Handle type="target" position={Position.Top} class="dot-handle">
		<span class="handle-dot"></span>
	</Handle>
	<img src={data.logoUrl} alt={data.label} loading="lazy" decoding="async" />
	<span>{data.label}</span>
	<Handle type="source" position={Position.Bottom} class="dot-handle">
		<span class="handle-dot"></span>
	</Handle>
</div>

<style>
	.hnode {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		width: 100%;
		height: 100%;
		border-radius: 8px;
		border: 1px solid var(--terminal-border);
		background: var(--terminal-bg, #1f2937);
		color: var(--terminal-fg, #e5e7eb);
		padding: 8px 4px 4px 4px;
		box-sizing: border-box;
		overflow: hidden;
		transition:
			border-color 0.2s,
			background 0.2s;
		cursor: pointer;
	}

	.hnode.selected {
		border-width: 2px;
		border-color: #6366f1;
		background: var(--terminal-bg-highlight, #1e1b4b);
	}

	:global(.dot-handle.svelte-flow__handle) {
		height: 20px;
		width: 20px;
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
	}

	.handle-dot {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--terminal-border, #555);
		pointer-events: none;
		display: block;
	}

	.hnode img {
		max-width: 28px;
		max-height: 22px;
		flex-shrink: 0;
		object-fit: contain;
		pointer-events: none;
	}

	.hnode span {
		font-size: 9px;
		text-align: center;
		line-height: 1.15;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: calc(100% - 4px);
		flex-shrink: 0;
		pointer-events: none;
	}
</style>
