import { Graph, layout } from '@dagrejs/dagre';
import {
	entities,
	networkEdges,
	getChildren,
	getEntity,
	resolveLogo,
	getLogoPath,
	isPlatform,
	isService,
	getNetworkEntities,
	getRootEntities,
	getAllDescendants
} from './homelab.js';

const MAX_PER_ROW = 5;
const HW_WIDTH = 150;
const HW_HEIGHT = 60;
const ITEM_WIDTH = 110;
const ITEM_HEIGHT = 50;
const VM_WIDTH = 130;
const VM_HEIGHT = 55;
const COL_PAD = 20;
const GROUP_PAD = 10;
const GROUP_GAP = 10;

function nodeWidth(entity) {
	if (isPlatform(entity.id) || isService(entity.id)) {
		if (entity.kind === 'vm') return VM_WIDTH;
		return ITEM_WIDTH;
	}
	return HW_WIDTH;
}

function nodeHeight(entity) {
	if (isPlatform(entity.id) || isService(entity.id)) {
		if (entity.kind === 'vm') return VM_HEIGHT;
		return ITEM_HEIGHT;
	}
	return HW_HEIGHT;
}

function computeRanks(serverId) {
	const ranks = {};
	function assign(id, rank) {
		const existing = ranks[id];
		if (existing !== undefined) {
			ranks[id] = Math.max(existing, rank);
		} else {
			ranks[id] = rank;
		}
		const children = getChildren(id);
		const platforms = children.filter((c) => isPlatform(c.id));
		const services = children.filter((c) => isService(c.id));
		for (const p of platforms) assign(p.id, rank + 1);
		services.forEach((s, i) => {
			assign(s.id, rank + 1 + Math.floor(i / MAX_PER_ROW));
		});
	}
	assign(serverId, 0);
	return ranks;
}

function layoutServerSubtree(serverId) {
	const ranks = computeRanks(serverId);
	const g = new Graph({ multigraph: true });
	g.setGraph({ rankdir: 'TB', ranksep: 60, nodesep: 8, edgesep: 10 });
	g.setDefaultEdgeLabel(() => ({}));

	const subtreeIds = new Set([serverId]);
	const allDesc = getAllDescendants(serverId);
	allDesc.forEach((d) => subtreeIds.add(d.id));

	for (const id of subtreeIds) {
		const entity = getEntity(id);
		if (!entity) continue;
		const w = nodeWidth({ id, ...entity });
		const h = nodeHeight({ id, ...entity });
		g.setNode(id, { width: w, height: h, rank: ranks[id] || 0 });
	}

	for (const id of subtreeIds) {
		const entity = getEntity(id);
		if (entity?.runsOn) {
			for (const parentId of entity.runsOn) {
				if (subtreeIds.has(parentId)) {
					g.setEdge(parentId, id, { minlen: 1, weight: 1 });
				}
			}
		}
	}

	layout(g);

	const nodes = [];
	for (const id of subtreeIds) {
		const n = g.node(id);
		if (!n) continue;
		nodes.push({
			id,
			x: n.x - n.width / 2,
			y: n.y - n.height / 2,
			width: n.width || HW_WIDTH,
			height: n.height || HW_HEIGHT
		});
	}
	return { nodes };
}

function layoutServerGroup(serverIds) {
	const allIds = new Set();
	for (const sid of serverIds) {
		allIds.add(sid);
		const desc = getAllDescendants(sid).map((d) => d.id);
		desc.forEach((d) => allIds.add(d));
	}

	const ranks = {};
	const queue = serverIds.map((id) => ({ id, rank: 0 }));
	const visited = new Set();

	while (queue.length) {
		const { id, rank } = queue.shift();
		if (visited.has(id)) continue;
		visited.add(id);

		const existing = ranks[id];
		if (existing === undefined || rank < existing) {
			ranks[id] = rank;
		}

		const children = getChildren(id);
		const platforms = children.filter((c) => isPlatform(c.id));
		const services = children.filter((c) => isService(c.id));

		for (const p of platforms) {
			queue.push({ id: p.id, rank: rank + 1 });
		}
		services.forEach((s, i) => {
			const wrapRow = Math.floor(i / MAX_PER_ROW);
			queue.push({ id: s.id, rank: rank + 1 + wrapRow });
		});
	}

	const g = new Graph({ multigraph: true });
	g.setGraph({ rankdir: 'TB', ranksep: 60, nodesep: 15, edgesep: 10 });
	g.setDefaultEdgeLabel(() => ({}));

	for (const id of allIds) {
		const entity = getEntity(id);
		if (!entity) continue;
		const w = nodeWidth({ id, ...entity });
		const h = nodeHeight({ id, ...entity });
		g.setNode(id, { width: w, height: h, rank: ranks[id] || 0 });
	}

	for (const id of allIds) {
		const entity = getEntity(id);
		if (entity?.runsOn) {
			for (const parentId of entity.runsOn) {
				if (allIds.has(parentId)) {
					g.setEdge(parentId, id, { minlen: 1, weight: 1 });
				}
			}
		}
	}

	layout(g);

	const nodes = [];
	for (const id of allIds) {
		const n = g.node(id);
		if (!n) continue;
		nodes.push({
			id,
			x: n.x - n.width / 2,
			y: n.y - n.height / 2,
			width: n.width || HW_WIDTH,
			height: n.height || HW_HEIGHT
		});
	}
	return { nodes };
}

function findOverlappingGroups(serverIds, subtrees) {
	const groups = [];
	const remaining = new Set(serverIds);

	while (remaining.size > 0) {
		const seed = remaining.values().next().value;
		remaining.delete(seed);
		const group = new Set([seed]);
		let changed = true;

		while (changed) {
			changed = false;
			for (const sid of remaining) {
				for (const gid of group) {
					if (hasOverlap(subtrees[gid], subtrees[sid])) {
						group.add(sid);
						changed = true;
						break;
					}
				}
			}
			for (const sid of group) remaining.delete(sid);
		}

		groups.push(Array.from(group));
	}

	return groups;
}

function hasOverlap(setA, setB) {
	const [smaller, larger] =
		setA.size <= setB.size ? [setA, setB] : [setB, setA];
	for (const item of smaller) {
		if (larger.has(item)) return true;
	}
	return false;
}

function buildNetworkNodes() {
	const netIds = getNetworkEntities();
	const adj = {};
	const indeg = {};
	for (const id of netIds) {
		adj[id] = [];
		indeg[id] = 0;
	}
	for (const [from, to] of networkEdges) {
		if (adj[from] !== undefined && adj[to] !== undefined) {
			adj[from].push(to);
			indeg[to]++;
		}
	}
	const queue = netIds.filter((id) => indeg[id] === 0);
	const order = [];
	while (queue.length) {
		const cur = queue.shift();
		order.push(cur);
		for (const nb of adj[cur]) {
			indeg[nb]--;
			if (indeg[nb] === 0) queue.push(nb);
		}
	}
	const nodes = [];
	let nx = 50;
	for (let ni = 0; ni < order.length; ni++) {
		nodes.push({ id: order[ni], x: nx, y: 50 + ni * 10, width: 140, height: 60 });
		nx += 150;
	}
	return nodes;
}

function buildSideColumn() {
	const rootEntries = getRootEntities();
	const sideKinds = new Set(['ups', 'desktop', 'laptop']);
	const netIds = new Set(getNetworkEntities());
	const ids = [];
	for (const [id, e] of rootEntries) {
		if (netIds.has(id)) continue;
		if (sideKinds.has(e.kind)) ids.push(id);
	}
	const nodes = [];
	let y = 120;
	for (const id of ids) {
		const h = getChildren(id).length > 0 ? 70 : 60;
		nodes.push({ id, x: 50, y, width: HW_WIDTH, height: h });
		y += h + 10;
	}
	return nodes;
}

function maxX(list) {
	if (!list.length) return 0;
	return Math.max(...list.map((item) => item.x + item.width));
}

function homelabNode(id, x, y, w, h, extra = {}) {
	const entity = getEntity(id);
	return {
		id,
		type: 'homelab',
		position: { x, y },
		data: {
			label: entity?.name || id,
			logo: resolveLogo(entity),
			logoUrl: getLogoPath(resolveLogo(entity)),
			entity,
			category: entity?.entityType || 'infrastructure',
			...extra
		},
		style: `width:${w}px; height:${h}px;`,
		sourcePosition: 'bottom',
		targetPosition: 'top'
	};
}

function groupNode(id, x, y, w, h, label) {
	return {
		id,
		type: 'group',
		position: { x, y },
		data: { label: label || id },
		style: `width:${w}px; height:${h}px;`
	};
}

function parseDims(node) {
	const w = parseInt(node.style?.match(/width:(\d+)px/)?.[1] || '0');
	const h = parseInt(node.style?.match(/height:(\d+)px/)?.[1] || '0');
	return { w, h };
}

export function computeLayout() {
	const netRaw = buildNetworkNodes();
	const sideRaw = buildSideColumn();

	const serverKinds = new Set(['server', 'raspberry-pi']);
	const rootEntries = getRootEntities();
	const netIds = new Set(getNetworkEntities());
	const sideKinds = new Set(['ups', 'desktop', 'laptop']);
	const serverIds = [];
	for (const [id, e] of rootEntries) {
		if (netIds.has(id)) continue;
		if (sideKinds.has(e.kind)) continue;
		if (serverKinds.has(e.kind)) serverIds.push(id);
	}

	const sideEndX = sideRaw.length > 0 ? maxX(sideRaw) : 50;
	let colX = sideEndX + COL_PAD;
	const TOP_Y = 220;

	const allNodes = [];
	const allEdges = [];

	for (const n of netRaw) allNodes.push(homelabNode(n.id, n.x, n.y, n.width, n.height));
	for (const n of sideRaw) allNodes.push(homelabNode(n.id, n.x, n.y, n.width, n.height));

	const subtrees = {};
	for (const sid of serverIds) {
		const desc = getAllDescendants(sid).map((d) => d.id);
		subtrees[sid] = new Set(desc);
	}
	let allGroups = [];
	if (serverIds.length === 1) {
		allGroups = [[serverIds[0]]];
	} else {
		allGroups = findOverlappingGroups(serverIds, subtrees);
	}

	for (const group of allGroups) {
		const isMulti = group.length > 1;
		const multiIds = new Set(group);
		const firstId = group[0];

		const { nodes: dagreNodes } = isMulti
			? layoutServerGroup(group)
			: layoutServerSubtree(firstId);

		if (!dagreNodes.length) continue;

		const minX = Math.min(...dagreNodes.map((n) => n.x));
		const minY = Math.min(...dagreNodes.map((n) => n.y));

		const adjusted = dagreNodes.map((n) => ({
			id: n.id,
			x: colX + (n.x - minX),
			y: TOP_Y + (n.y - minY),
			width: n.width,
			height: n.height
		}));

		const absNodes = adjusted.map((n) =>
			homelabNode(n.id, n.x, n.y, n.width, n.height)
		);

		const groupEntities = absNodes.filter(
			(n) => getEntity(n.id)?.group === true
		);

		const depths = {};
		for (const sid of group) {
			(function walk(id, d) {
				if (depths[id] === undefined || d < depths[id]) {
					depths[id] = d;
				}
				for (const ch of getChildren(id)) walk(ch.id, d + 1);
			})(sid, 0);
		}

		groupEntities.sort(
			(a, b) => (depths[b.id] || 0) - (depths[a.id] || 0)
		);

		const claimed = new Set();
		const newGroups = [];

		for (const gEntity of groupEntities) {
			const gid = gEntity.id + '-group';
			const descIds = new Set(
				getAllDescendants(gEntity.id).map((d) => d.id)
			);
			descIds.add(gEntity.id);

			const members = absNodes.filter((n) => {
				if (!descIds.has(n.id)) return false;
				if (claimed.has(n.id)) return false;
				return true;
			});
			if (!members.length) continue;

			let minGx = Infinity,
				minGy = Infinity,
				maxGx = -Infinity,
				maxGy = -Infinity;
			for (const m of members) {
				const d = parseDims(m);
				if (m.position.x < minGx) minGx = m.position.x;
				if (m.position.y < minGy) minGy = m.position.y;
				const ex = m.position.x + d.w;
				const ey = m.position.y + d.h;
				if (ex > maxGx) maxGx = ex;
				if (ey > maxGy) maxGy = ey;
			}

			const gx = minGx - GROUP_PAD;
			const gy = minGy - GROUP_PAD;
			const gw = maxGx - minGx + GROUP_PAD * 2;
			const gh = maxGy - minGy + GROUP_PAD * 2;

			for (const m of members) {
				m.position = {
					x: m.position.x - gx,
					y: m.position.y - gy
				};
				m.parentId = gid;
				m.extent = 'parent';
				claimed.add(m.id);
			}

			const gn = groupNode(
				gid,
				gx,
				gy,
				gw,
				gh,
				gEntity.data?.label || gEntity.id
			);
			newGroups.push(gn);
		}

		newGroups.sort((a, b) => a.position.x - b.position.x);
		for (let i = 1; i < newGroups.length; i++) {
			const prev = newGroups[i - 1];
			const curr = newGroups[i];
			const prevW = parseDims(prev).w;
			const overlap =
				prev.position.x + prevW + GROUP_GAP - curr.position.x;
			if (overlap > 0) {
				curr.position.x += overlap;
			}
		}

		for (const g of newGroups) {
			allNodes.push(g);
		}

		for (const n of absNodes) {
			allNodes.push(n);
		}

		{
			let colEndX = maxX(adjusted);
			for (const g of newGroups) {
				const gw = parseDims(g).w;
				const endX = g.position.x + gw;
				if (endX > colEndX) colEndX = endX;
			}
			colX = colEndX + COL_PAD;
		}
	}

	const nodeIds = new Set(allNodes.map((n) => n.id));

	for (const [from, to] of networkEdges) {
		if (nodeIds.has(from) && nodeIds.has(to)) {
			allEdges.push({
				id: `e-net-${from}-${to}`,
				source: from,
				target: to,
				type: 'smoothstep'
			});
		}
	}

	for (const n of allNodes) {
		if (n.data?.entity?.runsOn) {
			for (const pid of n.data.entity.runsOn) {
				if (nodeIds.has(pid)) {
					const exists = allEdges.find((e) => e.source === pid && e.target === n.id);
					if (!exists) {
						allEdges.push({
							id: `e-${pid}-${n.id}`,
							source: pid,
							target: n.id,
							type: 'smoothstep'
						});
					}
				}
			}
		}
	}

	const seenIds = new Set();
	const dedupedNodes = [];
	for (const n of allNodes) {
		if (!seenIds.has(n.id)) {
			seenIds.add(n.id);
			dedupedNodes.push(n);
		}
	}

	const seenEdgeIds = new Set();
	const dedupedEdges = [];
	for (const e of allEdges) {
		if (!seenEdgeIds.has(e.id)) {
			seenEdgeIds.add(e.id);
			dedupedEdges.push(e);
		}
	}

	return { nodes: dedupedNodes, edges: dedupedEdges };
}
