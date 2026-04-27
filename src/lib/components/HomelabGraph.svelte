<script lang="js">
  import { onMount } from 'svelte';
  import { Svelvet, Node, Anchor } from 'svelvet';
  import { generateNodes, generateEdges, computeAnchorDirections, getNodeDetails, getLogo } from '$lib/homelab.js';

  const nodes = generateNodes();
  const edges = generateEdges(nodes);
  const { outgoingMap, incomingMap } = computeAnchorDirections(nodes, edges);

  const COLORS = {
    dark: {
      fill: '#1f2937',
      fillSelected: '#1e1b4b',
      stroke: '#374151',
      strokeSelected: '#6366f1',
      text: '#e5e7eb',
      textSelected: '#818cf8',
    },
    light: {
      fill: '#f9fafb',
      fillSelected: '#eef2ff',
      stroke: '#d1d5db',
      strokeSelected: '#6366f1',
      text: '#1f2937',
      textSelected: '#4f46e5',
    },
  };

  let selectedNodeId = null;
  let details = null;
  let theme = 'dark';
  let c = COLORS.dark;

  onMount(() => {
    const t = document.documentElement.getAttribute('data-theme');
    theme = t === 'light' ? 'light' : 'dark';
    c = COLORS[theme];

    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute('data-theme');
      theme = t === 'light' ? 'light' : 'dark';
      c = COLORS[theme];
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  });

  function handleNodeClick(nodeId) {
    if (selectedNodeId === nodeId) {
      selectedNodeId = null;
      details = null;
    } else {
      selectedNodeId = nodeId;
      details = getNodeDetails(nodeId);
    }
  }
</script>

<div class="graph-wrapper">
  <Svelvet {theme} minimap controls edgeStyle="step" zoom="0.7">
    {#each nodes as node}
      <Node id={node.id} dimensions={node.dimensions} position={node.position}>
        <svg viewBox="0 0 {node.dimensions.width} {node.dimensions.height}" width="100%" height="100%">
          <rect width="100%" height="100%" rx="8" ry="8"
            fill={selectedNodeId === node.id ? c.fillSelected : c.fill}
            stroke={selectedNodeId === node.id ? c.strokeSelected : c.stroke}
            stroke-width={selectedNodeId === node.id ? 2 : 1} />
          <image href={node.logo} x={(node.dimensions.width - 36) / 2} y="6" width="36" height="28"
            preserveAspectRatio="xMidYMid meet" style="pointer-events: none" />
          <text x={node.dimensions.width / 2} y={node.dimensions.height - 8} text-anchor="middle" font-size="12"
            fill={selectedNodeId === node.id ? c.textSelected : c.text}
            style="pointer-events: none">{node.label}</text>
          <rect width="100%" height="100%" fill="transparent" role="button" tabindex="0"
            on:click={() => handleNodeClick(node.id)}
            on:keydown={(e) => e.key === 'Enter' && handleNodeClick(node.id)} />
        </svg>
        {#if incomingMap[node.id]}
          {#each incomingMap[node.id] as inc}
            <Anchor direction={inc.direction} invisible />
          {/each}
        {/if}
        {#if outgoingMap[node.id]}
          {#each outgoingMap[node.id] as out}
            <Anchor direction={out.direction} invisible connections={[out.to]} />
          {/each}
        {/if}
      </Node>
    {/each}
  </Svelvet>
</div>

{#if details}
  <article class="detail-panel">
    <header class="detail-header">
      <img src={getLogo(details.type)} alt={details.type} class="detail-logo" />
      <h3>{details.name}</h3>
      <button class="close-btn" on:click={() => { selectedNodeId = null; details = null; }}>x</button>
    </header>
    <div class="detail-body">
      {#if details.layer}
        <div class="detail-row">
          <span class="detail-label">Layer</span>
          <span class="detail-value">{details.layer}</span>
        </div>
      {/if}
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
          {#each details.storage_pools as pool}
            <div class="detail-value"><strong>{pool.scheme}</strong>: {pool.disks.join(', ')}</div>
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
  :global(.svelvet-node) {
    box-shadow: none !important;
    cursor: pointer;
    padding: 0 !important;
  }

  .graph-wrapper {
    width: 100%;
    height: calc(100vh - 280px);
    min-height: 500px;
    border: 1px solid var(--pico-muted-border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .graph-wrapper :global(.svelvet-wrapper) {
    height: 100% !important;
    width: 100% !important;
  }

  .detail-panel {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--pico-card-background-color);
    border: 1px solid var(--pico-muted-border-color);
    border-radius: 8px;
  }

  .detail-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--pico-muted-border-color);
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
