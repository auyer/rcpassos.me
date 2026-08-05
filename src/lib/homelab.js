export const entities = {
	// ═══ NETWORK INFRASTRUCTURE ═══
	'isp-modem': {
		entityType: 'infrastructure',
		kind: 'modem',
		name: 'ISP Modem',
	},
	'ucg-max': {
		entityType: 'infrastructure',
		kind: 'router',
		name: 'UCG 2.5GBE',
		logo: 'generic-router-flat-label-colour',
	},
	'usw-flex': {
		entityType: 'infrastructure',
		kind: 'switch',
		name: 'USW Flex 2.5GBE',
		logo: 'generic-switch-flat-l2-label-v2-mono',
	},
	'tplink-sg108e': {
		entityType: 'infrastructure',
		kind: 'switch',
		name: 'TPLink sg-108e Switch',
	},
	'u7-pro': {
		entityType: 'infrastructure',
		kind: 'wifi-ap',
		name: 'U7 Pro WiFi AP',
	},

	// ═══ UPS INFRASTRUCTURE ═══
	'ups-ts': {
		entityType: 'infrastructure',
		kind: 'ups',
		name: 'TShara ups',
	},
	'ups-rag': {
		entityType: 'infrastructure',
		kind: 'ups',
		name: 'Ragtech ups',
	},

	// ═══ COMPUTE HARDWARE ═══
	fbox: {
		entityType: 'infrastructure',
		kind: 'server',
		name: 'Freebox (HP Mini PC)',
		logo: 'server',
		boards: [
			'Marvell PCIe 4 port Sata Controller',
			'Intel PCIe I226-V dual 2.5GBE',
			'Sonoff Zigbee 3.0 USB Dongle Plus',
		],
	},
	pi5: {
		entityType: 'infrastructure',
		kind: 'raspberry-pi',
		name: 'RaspberryPi 5',
	},
	pi3b: {
		entityType: 'infrastructure',
		kind: 'raspberry-pi',
		name: 'RaspberryPi 3b',
	},
	sidbox: {
		entityType: 'infrastructure',
		kind: 'desktop',
		name: 'Sidbox (PC)',
		logo: 'debian',
		boards: ['AMD Radeon RX 6800 XT'],
	},
	feebook: {
		entityType: 'infrastructure',
		kind: 'laptop',
		name: 'Freebook',
		logo: 'debian',
	},
	guestbook: {
		entityType: 'infrastructure',
		kind: 'laptop',
		name: 'Guestbook',
		logo: 'fedora',
	},

	// ═══ PLATFORMS ═══
	'proxmox-fbox': {
		entityType: 'platform',
		kind: 'hypervisor',
		name: 'Proxmox VE 9',
		runsOn: ['fbox'],
	},
	'qemu-fbox': {
		entityType: 'platform',
		kind: 'qemu',
		name: 'Qemu',
		runsOn: ['proxmox-fbox'],
	},
	'lxc-fbox': {
		entityType: 'platform',
		kind: 'lxc-runtime',
		name: 'LXC',
		runsOn: ['proxmox-fbox'],
	},
	'rpi-os-pi5': {
		entityType: 'platform',
		kind: 'os',
		name: 'Raspberry Pi OS 13',
		runsOn: ['pi5'],
	},
	'rpi-os-pi3b': {
		entityType: 'platform',
		kind: 'os',
		name: 'Raspberry Pi OS 13',
		runsOn: ['pi3b'],
	},

	// ═══ SERVICES — VMs on proxmox-fbox ═══	
	truenas: {
		entityType: 'platform',
		kind: 'vm',
		name: 'TrueNas Scale',
		runsOn: ['qemu-fbox'],
		passthrough: ['Marvell PCIe 4 port Sata Controller'],
		storagePools: [
			{
				scheme: 'Raid Z1',
				disks: [
					'Seagate IronWolf 4TB CMR 5400rpm',
					'Seagate IronWolf 4TB CMR 5400rpm',
					'WD RED 4TB CMR 5400rpm',
				],
			},
		],
	},

	// ═══ SERVICES — VMs: K3S nodes on qemu-fbox ═══
	'vm-k1': {
		entityType: 'platform',
		kind: 'vm',
		name: 'K3S Node 1',
		runsOn: ['qemu-fbox'],
	},
	'vm-k2': {
		entityType: 'platform',
		kind: 'vm',
		name: 'K3S Node 2',
		runsOn: ['qemu-fbox'],
	},
	'vm-k3': {
		entityType: 'platform',
		kind: 'vm',
		name: 'K3S Node 3',
		runsOn: ['qemu-fbox'],
	},

    haos: {
		entityType: 'service',
		kind: 'vm',
		name: 'Home Assistant OS',
		runsOn: ['qemu-fbox'],
		passthrough: ['Sonoff Zigbee 3.0 USB Dongle Plus'],
	},

	// ═══ SERVICES — LXCs on lxc-fbox ═══
	'lxc-pihole2': {
		entityType: 'service',
		kind: 'lxc',
		name: 'PiHole 2',
		runsOn: ['lxc-fbox'],
		method: 'Debian Package',
		logo: 'pi-hole',
	},
	'lxc-grafana': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Grafana',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose',
		ansibleRoles: ['grafana'],
		logo: 'grafana',
		connections: ['lxc-loki', 'lxc-prometheus'],
		nestedServices: ['grafana', 'prometheus', 'unpoller', 'matchtower'],
	},
	'lxc-loki': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Grafana Loki',
		runsOn: ['lxc-fbox'],
		method: 'docker-compose',
		ansibleRoles: ['loki'],
		logo: 'grafana-loki',
		connections: ['ct-truenas-rustfs'],
	},
	'lxc-prometheus': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Prometheus',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose',
		ansibleRoles: ['grafana'],
		logo: 'prometheus',
		details: 'Same compose as Grafana',
	},
	'lxc-traefik': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Traefik',
		runsOn: ['lxc-fbox'],
		method: 'docker-compose',
		logo: 'traefik',
	},
	// 'lxc-postgresql': {
	// 	entityType: 'service',
	// 	kind: 'lxc',
	// 	name: 'PostgreSQL',
	// 	runsOn: ['lxc-fbox'],
	// 	method: 'Debian Package',
	// 	logo: 'postgresql',
	// },
	'lxc-prosody': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Prosody',
		runsOn: ['lxc-fbox'],
		method: 'Debian Packages + podman-compose',
		ansibleRoles: ['prosody', 'biboumi', 'alloy'],
		logo: 'xmpp',
		nestedServices: ['prosody', 'biboumi'],
	},
	// 'lxc-coturn': {
	// 	entityType: 'service',
	// 	kind: 'lxc',
	// 	name: 'Coturn',
	// 	runsOn: ['lxc-fbox'],
	// 	method: 'Debian Package',
	// 	ansibleRoles: ['coturn', 'alloy'],
	// },
	'lxc-lore': {
		entityType: 'service',
		kind: 'lxc',
		name: 'lore',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose',
	},
	// 'lxc-excalidraw': {
	// 	entityType: 'service',
	// 	kind: 'lxc',
	// 	name: 'Excalidraw',
	// 	runsOn: ['lxc-fbox'],
	// 	method: 'podman-compose',
	// },
	'lxc-copyparty': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Copyparty',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose',
	},
	'lxc-immich': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Immich',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose',
	},
	'lxc-languagetool': {
		entityType: 'service',
		kind: 'lxc',
		name: 'LanguageTool',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose',
	},
	'lxc-transmission': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Transmission',
		runsOn: ['lxc-fbox'],
		method: 'Alpine Package',
	},
	'lxc-jellyfin': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Jellyfin',
		runsOn: ['lxc-fbox'],
		method: 'Alpine Package',
	},
    'netbird-fbox': {
		entityType: 'service',
		kind: 'package',
		name: 'NetBird Peer',
		runsOn: ['lxc-fbox'],
		method: 'Docker',
	},
	'ct-truenas-rustfs': {
		entityType: 'service',
		kind: 'container',
		name: 'Rustfs',
		runsOn: ['truenas'],
		method: 'TrueNas Container',
		logo: 'rustfs',
	},
	'ct-truenas-rsyncd': {
		entityType: 'service',
		kind: 'container',
		name: 'rsyncd',
		runsOn: ['truenas'],
		method: 'TrueNas Container',
	},
	'ct-truenas-nextcloud': {
		entityType: 'service',
		kind: 'container',
		name: 'Nextcloud',
		runsOn: ['truenas'],
		method: 'TrueNas Container',
	},
	'ct-truenas-distribution': {
		entityType: 'service',
		kind: 'container',
		name: 'Distribution',
		runsOn: ['truenas'],
		method: 'TrueNas Container',
	},
    'lxc-alloy': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Alloy (sidecar)',
		runsOn: ['lxc-fbox'],
		method: 'Ansible',
		ansibleRoles: ['alloy', 'compose'],
		logo: 'grafana-alloy',
		details: 'Deployed to each critical component to collect logs and send to loki',
		connections: ['lxc-loki'],
	},

	// ═══ SERVICES — Packages on pi5 ═══
	'pkg-pi5-pihole': {
		entityType: 'service',
		kind: 'package',
		name: 'PiHole',
		runsOn: ['rpi-os-pi5'],
		method: 'Debian Package',
		logo: 'pi-hole',
	},
	'pkg-pi5-nginx': {
		entityType: 'service',
		kind: 'package',
		name: 'Nginx (Angie)',
		runsOn: ['rpi-os-pi5'],
		method: 'Debian Package',
		ansibleRoles: ['angie'],
		logo: 'nginx',
	},
	'pkg-pi5-nut': {
		entityType: 'service',
		kind: 'package',
		name: 'NUT UPS Mon',
		runsOn: ['rpi-os-pi5'],
		method: 'Debian Package',
	},
	'netbird-pi5': {
		entityType: 'service',
		kind: 'package',
		name: 'NetBird Peer',
		runsOn: ['rpi-os-pi5'],
		method: 'Docker',
	},

	// ═══ SERVICES — Containers on pi5 ═══
	'ct-pi5-nebulasync': {
		entityType: 'service',
		kind: 'container',
		name: 'Nebula-sync',
		runsOn: ['rpi-os-pi5'],
		method: 'podman-compose',
	},

	// ═══ SERVICES — Packages on pi3b ═══
	'pkg-pi3b-squeezelite': {
		entityType: 'service',
		kind: 'package',
		name: 'squeezelite',
		runsOn: ['rpi-os-pi3b'],
		method: 'Debian Package',
	},

	// ═══ SERVICES — Containers on pi3b ═══
	'ct-pi3b-wyoming': {
		entityType: 'service',
		kind: 'container',
		name: 'wyoming-satellite',
		runsOn: ['rpi-os-pi3b'],
		method: 'podman-compose',
	},
	'ct-pi3b-openwakeword': {
		entityType: 'service',
		kind: 'container',
		name: 'openWakeWord',
		runsOn: ['rpi-os-pi3b'],
		method: 'podman-compose',
	},
	// ═══ K3S cluster
    'k3s': {
		entityType: 'platform',
		kind: 'orchestrator',
		name: 'K3S Cluster',
		// runsOn: ['vm-k1'],
		runsOn: ['vm-k1', "vm-k2", "vm-k3"],
		method: 'ansible',
	},
	'ct-pi5-uptimekuma': {
		entityType: 'service',
		kind: 'container',
		name: 'Uptime Kuma',
		runsOn: ['k3s'],
		method: 'helm',
	},

};

// ═══════════════════════════════════════════════════════
// Network topology edges
// ═══════════════════════════════════════════════════════

export const networkEdges = [
	['isp-modem', 'ucg-max'],
	['ucg-max', 'usw-flex'],
	['ucg-max', 'fbox'],
	['ucg-max', 'pi5'],
	['ucg-max', 'sidbox'],
	['ucg-max', 'feebook'],
	['ucg-max', 'guestbook'],
	['ucg-max', 'ups-ts'],
	['ucg-max', 'ups-rag'],
	['usw-flex', 'tplink-sg108e'],
	['usw-flex', 'u7-pro'],
	['tplink-sg108e', 'pi3b'],
];

// ═══════════════════════════════════════════════════════
// Logo resolution — kind or specific name → logo stem
// ═══════════════════════════════════════════════════════

const DEFAULT_LOGOS = {
	hypervisor: 'proxmox',
	vm: 'Qemu_logo',
	lxc: 'Linux_Containers_logo',
	'lxc-runtime': 'Linux_Containers_logo',
	container: 'web-server-icon',
	package: 'web-server-icon',
	qemu: 'Qemu_logo',
	router: 'generic-router-flat-label-colour',
	switch: 'generic-switch-flat-l2-label-v2-mono',
	'wifi-ap': 'generic-switch-flat-l2-label-v2-mono',
	modem: 'generic-switch-flat-l2-label-v2-mono',
	server: 'web-server-icon',
	'raspberry-pi': 'raspberry-pi',
	desktop: 'Openlogo-debianV2',
	laptop: 'Openlogo-debianV2',
	ups: 'web-server-icon',
	os: 'web-server-icon',
	orchestrator: 'web-server-icon',

	debian: 'Openlogo-debianV2',
	fedora: 'Fedora_icon',
	proxmox: 'proxmox',
	'pi-hole': 'pi-hole',
	nginx: 'nginx',
	traefik: 'traefik',
	grafana: 'Grafana_logo',
	'grafana-loki': 'grafana-loki',
	'grafana-alloy': 'grafana-alloy',
	prometheus: 'Prometheus_software_logo',
	postgresql: 'Postgresql_elephant',
	xmpp: 'XMPP_logo',
	rustfs: 'rustfs',
};

export function resolveLogo(kindOrEntity) {
	if (typeof kindOrEntity === 'string') {
		return DEFAULT_LOGOS[kindOrEntity] || 'web-server-icon';
	}
	return kindOrEntity.logo || DEFAULT_LOGOS[kindOrEntity.kind] || 'web-server-icon';
}

export function getLogoPath(logo) {
	return `/logos/${logo}.svg`;
}

export function getLogo(kindOrName) {
	return getLogoPath(resolveLogo(kindOrName));
}

// ═══════════════════════════════════════════════════════
// Node generation — DAG walk + automatic layout
// ═══════════════════════════════════════════════════════

function getChildren(parentId) {
	return Object.entries(entities)
		.filter(([, e]) => e.runsOn && e.runsOn.includes(parentId))
		.map(([id, e]) => ({ id, ...e }));
}

function rowSpan(n, w, gap) {
	return n * w + (n - 1) * gap;
}

function centerRow(n, w, gap, centerX) {
	const total = rowSpan(n, w, gap);
	const start = centerX - total / 2;
	return Array.from({ length: n }, (_, i) => start + i * (w + gap));
}

export function generateNodes() {
	const nodes = [];
	const visited = new Set();
	const Y_NET = 50;
	const Y_UPS = 120;
	const Y_HW = 200;
	const COL_PAD = 80;
	const HW_WIDTH = 180;
	const ITEM_WIDTH = 120;
	const ITEM_GAP = 20;
	const MAX_PER_ROW = 5;

	const networkKinds = new Set(['modem', 'router', 'switch', 'wifi-ap']);
	const networkIds = Object.entries(entities)
		.filter(([, e]) => networkKinds.has(e.kind) && !e.runsOn)
		.map(([id]) => id);

	const adj = {};
	const indeg = {};
	for (const id of networkIds) {
		adj[id] = [];
		indeg[id] = 0;
	}
	for (const [from, to] of networkEdges) {
		if (adj[from] && adj[to]) {
			adj[from].push(to);
			indeg[to]++;
		}
	}

	const queue = networkIds.filter((id) => indeg[id] === 0);
	const netOrder = [];
	while (queue.length) {
		const cur = queue.shift();
		netOrder.push(cur);
		for (const nb of adj[cur]) {
			indeg[nb]--;
			if (indeg[nb] === 0) queue.push(nb);
		}
	}

	let nx = 50;
	for (let ni = 0; ni < netOrder.length; ni++) {
		const id = netOrder[ni];
		const entity = entities[id];
		nodes.push({
			id,
			label: entity.name || id,
			type: entity.logo || entity.kind,
			logo: resolveLogo(entity),
			position: { x: nx, y: Y_NET + ni * 10 },
			dimensions: { width: 140, height: 60 },
			layer: 1,
			parent: null,
			data: entity,
			category: entity.entityType,
		});
		visited.add(id);
		nx += 150;
	}

	const rootEntries = Object.entries(entities).filter(([, e]) => !e.runsOn);
	const upsAndEndUserKinds = new Set(['ups', 'desktop', 'laptop']);
	const serverKinds = new Set(['server', 'raspberry-pi']);

	const leftColIds = [];
	const serverIds = [];

	for (const [id, e] of rootEntries) {
		if (networkIds.includes(id)) continue;
		if (upsAndEndUserKinds.has(e.kind)) {
			leftColIds.push(id);
		} else if (serverKinds.has(e.kind)) {
			serverIds.push(id);
		}
	}

	function getSubtreeWidth(entityId) {
		const children = getChildren(entityId);
		if (children.length === 0) return HW_WIDTH;

		const platformChildren = children.filter((c) => c.entityType === 'platform');
		const serviceChildren = children.filter((c) => c.entityType === 'service');

		let maxW = HW_WIDTH;

		for (const kind of ['vm', 'lxc', 'package', 'container']) {
			const group = serviceChildren.filter((s) => s.kind === kind);
			if (group.length > 0) {
				const itemW = kind === 'vm' ? 130 : ITEM_WIDTH;
				const itemGap = kind === 'vm' ? 30 : ITEM_GAP;
				const perRow = kind === 'lxc' ? MAX_PER_ROW : group.length;
				const w = rowSpan(Math.min(group.length, perRow), itemW, itemGap);
				if (w > maxW) maxW = w;
			}
		}

		for (const svc of serviceChildren) {
			const subW = getSubtreeWidth(svc.id);
			if (subW > maxW) maxW = subW;
		}

		if (platformChildren.length === 0) return maxW;
		if (platformChildren.length === 1) {
			return Math.max(maxW, getSubtreeWidth(platformChildren[0].id));
		}

		const totalPlatformW =
			platformChildren.reduce((sum, p) => sum + getSubtreeWidth(p.id), 0) +
			(platformChildren.length - 1) * COL_PAD;
		return Math.max(maxW, totalPlatformW);
	}

	function layoutChildren(parentId, colCenterX, startY, colWidth) {
		const allChildren = getChildren(parentId);
		const children = allChildren.filter((c) => !visited.has(c.id));
		if (children.length === 0) return startY;

		const platformChildren = children.filter((c) => c.entityType === 'platform');
		const serviceChildren = children.filter((c) => c.entityType === 'service');

		let currentY = startY;

		if (platformChildren.length === 1) {
			const platform = platformChildren[0];
			nodes.push({
				id: platform.id,
				label: platform.name,
				type: platform.logo || platform.kind,
				logo: resolveLogo(platform),
				position: { x: colCenterX - HW_WIDTH / 2, y: currentY },
				dimensions: { width: HW_WIDTH, height: 60 },
				layer: 3,
				parent: parentId,
				data: platform,
				category: platform.entityType,
			});
			visited.add(platform.id);
			currentY += 70;
			currentY = layoutChildren(platform.id, colCenterX, currentY, colWidth);
		} else if (platformChildren.length > 1) {
			const subWidths = platformChildren.map((p) => getSubtreeWidth(p.id));
			const totalW =
				subWidths.reduce((a, b) => a + b, 0) +
				(platformChildren.length - 1) * COL_PAD;
			let subStartX = colCenterX - totalW / 2;
			let maxEndY = currentY;

			for (let i = 0; i < platformChildren.length; i++) {
				const platform = platformChildren[i];
				const subW = subWidths[i];
				const subCenterX = subStartX + subW / 2;

				nodes.push({
					id: platform.id,
					label: platform.name,
					type: platform.logo || platform.kind,
					logo: resolveLogo(platform),
					position: { x: subCenterX - HW_WIDTH / 2, y: currentY },
					dimensions: { width: HW_WIDTH, height: 60 },
					layer: 3,
					parent: parentId,
					data: platform,
					category: platform.entityType,
				});
				visited.add(platform.id);

				const endY = layoutChildren(platform.id, subCenterX, currentY + 70, subW);
				if (endY > maxEndY) maxEndY = endY;

				subStartX += subW + COL_PAD;
			}

			currentY = maxEndY;
		}

		if (serviceChildren.length > 0) {
			const groups = {};
			const positions = {};
			for (const s of serviceChildren) {
				(groups[s.kind] || (groups[s.kind] = [])).push(s);
			}
			for (const kind of ['vm', 'lxc', 'package', 'container']) {
				const group = groups[kind];
				if (!group || group.length === 0) continue;

				const itemW = kind === 'vm' ? 130 : ITEM_WIDTH;
				const itemGap = kind === 'vm' ? 30 : ITEM_GAP;
				const perRow = kind === 'lxc' ? MAX_PER_ROW : group.length;
				const nRows = Math.ceil(group.length / perRow);

				for (let r = 0; r < nRows; r++) {
					const rowItems = group.slice(r * perRow, (r + 1) * perRow);
					const xs = centerRow(rowItems.length, itemW, itemGap, colCenterX);
					for (let i = 0; i < rowItems.length; i++) {
						const item = rowItems[i];
						const h = kind === 'vm' ? 55 : 50;
						nodes.push({
							id: item.id,
							label: item.name,
							type: item.logo || item.kind,
							logo: resolveLogo(item),
							position: { x: xs[i], y: currentY },
							dimensions: { width: itemW, height: h },
							layer: 4,
							parent: parentId,
							data: item,
							category: item.entityType,
						});
						visited.add(item.id);
						positions[item.id] = { x: xs[i], w: itemW };
					}
					currentY += 70;
				}
			}

			const subChildBaseY = currentY + 20;
			let maxSubEndY = currentY;
			for (const service of serviceChildren) {
				const subChildren = getChildren(service.id).filter(
					(c) => !visited.has(c.id),
				);
				if (subChildren.length > 0) {
					const pos = positions[service.id];
					const subCenterX = pos.x + pos.w / 2;
					const subW = getSubtreeWidth(service.id);
					const endY = layoutChildren(service.id, subCenterX, subChildBaseY, subW);
					if (endY > maxSubEndY) maxSubEndY = endY;
				}
			}
			currentY = maxSubEndY;
		}

		return currentY;
	}

	let leftColX = 50;
	let leftStackY = Y_UPS;
	let leftColWidth = HW_WIDTH;

	for (const id of leftColIds) {
		const entity = entities[id];
		const hasChildren = getChildren(id).length > 0;
		const hwHeight = hasChildren ? 70 : 60;

		nodes.push({
			id,
			label: entity.name || id,
			type: entity.logo || entity.kind,
			logo: resolveLogo(entity),
			position: { x: leftColX + (leftColWidth - HW_WIDTH) / 2, y: leftStackY },
			dimensions: { width: HW_WIDTH, height: hwHeight },
			layer: 2,
			parent: null,
			data: entity,
			category: entity.entityType,
		});
		visited.add(id);

		leftStackY += hwHeight + 10;

		if (hasChildren) {
			leftStackY = layoutChildren(id, leftColX + leftColWidth / 2, leftStackY, leftColWidth);
		}
	}

	let colX = leftColX + leftColWidth + COL_PAD;

	for (const id of serverIds) {
		const entity = entities[id];
		const children = getChildren(id);

		let colW = getSubtreeWidth(id);

		const centerX = colX + colW / 2;

		nodes.push({
			id,
			label: entity.name || id,
			type: entity.logo || entity.kind,
			logo: resolveLogo(entity),
			position: { x: colX + (colW - HW_WIDTH) / 2, y: Y_HW },
			dimensions: { width: HW_WIDTH, height: 60 },
			layer: 2,
			parent: null,
			data: entity,
			category: entity.entityType,
		});
		visited.add(id);

		let childY = Y_HW + 70;

		const platforms = children.filter((c) => c.entityType === 'platform');
		for (const platform of platforms) {
			nodes.push({
				id: platform.id,
				label: platform.name,
				type: platform.logo || platform.kind,
				logo: resolveLogo(platform),
				position: { x: colX + (colW - HW_WIDTH) / 2, y: childY },
				dimensions: { width: HW_WIDTH, height: 60 },
				layer: 3,
				parent: id,
				data: platform,
				category: platform.entityType,
			});
			visited.add(platform.id);
			childY += 70;
			childY = layoutChildren(platform.id, centerX, childY, colW);
		}

		colX += colW + COL_PAD;
	}

	return nodes;
}

// ═══════════════════════════════════════════════════════
// Edge generation
// ═══════════════════════════════════════════════════════

export function generateEdges(nodes) {
	const edges = [];
	const nodeIds = new Set(nodes.map((n) => n.id));

	for (const [from, to] of networkEdges) {
		if (nodeIds.has(from) && nodeIds.has(to)) {
			edges.push({ from, to });
		}
	}

	for (const node of nodes) {
		if (node.data && node.data.runsOn) {
			for (const parentId of node.data.runsOn) {
				if (nodeIds.has(parentId)) {
					edges.push({ from: parentId, to: node.id });
				}
			}
		}
	}

	return edges;
}

// ═══════════════════════════════════════════════════════
// Anchor direction calculation (preserved from old code)
// ═══════════════════════════════════════════════════════

function directionBetween(fromPos, toPos) {
	const dx = toPos.x - fromPos.x;
	const dy = toPos.y - fromPos.y;
	if (dy > 30) return 'south';
	if (dy < -30) return 'north';
	return dx > 0 ? 'east' : 'west';
}

export function computeAnchorDirections(nodes, edges) {
	const nodeMap = new Map(nodes.map((n) => [n.id, n]));
	const outgoingMap = {};
	const incomingMap = {};

	for (const edge of edges) {
		const source = nodeMap.get(edge.from);
		const target = nodeMap.get(edge.to);
		if (!source || !target) continue;

		const fromDir = directionBetween(source.position, target.position);
		const toDir = directionBetween(target.position, source.position);

		if (!outgoingMap[edge.from]) outgoingMap[edge.from] = [];
		outgoingMap[edge.from].push({ to: edge.to, direction: fromDir });

		if (!incomingMap[edge.to]) incomingMap[edge.to] = [];
		incomingMap[edge.to].push({ from: edge.from, direction: toDir });
	}

	return { outgoingMap, incomingMap };
}

// ═══════════════════════════════════════════════════════
// Detail panel data
// ═══════════════════════════════════════════════════════

export function getNodeDetails(nodeId) {
	const entity = entities[nodeId];
	if (!entity) return null;

	let osValue = entity.os || null;
	if (!osValue && entity.entityType === 'infrastructure') {
		const platformChildren = Object.entries(entities)
			.filter(
				([, e]) =>
					e.runsOn &&
					e.runsOn.includes(nodeId) &&
					e.entityType === 'platform',
			)
			.map(([, e]) => e.name);
		if (platformChildren.length > 0) {
			osValue = platformChildren.join(', ');
		}
	}

	let connections = entity.connections || [];
	if (entity.entityType === 'infrastructure') {
		const netConns = networkEdges
			.filter(([a, b]) => a === nodeId || b === nodeId)
			.map(([a, b]) => (a === nodeId ? b : a));
		for (const c of netConns) {
			if (!connections.includes(c)) connections.push(c);
		}
	}

	return {
		name: entity.name,
		type: entity.logo || entity.kind,
		category: entity.entityType,
		layer: null,
		os: osValue,
		method: entity.method || null,
		details: entity.details || null,
		services: entity.nestedServices || [],
		ansible_roles: entity.ansibleRoles || [],
		hardware_passthrough: entity.passthrough || [],
		storage_pools: entity.storagePools || [],
		boards: entity.boards || [],
		connections,
	};
}
