export const vms = {
	HAOS: {
		name: 'Home Assistant OS',
		layer: 3,
		hardware_passthrough: ['Sonoff Zigbee 3.0 USB Dongle Plus']
	},
	TRUENAS: {
		name: 'TrueNas Scale 25',
		layer: 3,
		hardware_passthrough: ['Marvell PCIe 4 port Sata Controller'],
		storage_pools: [
			{
				scheme: 'Raid Z1',
				disks: [
					'Seagate IronWolf 4TB CMR 5400rpm',
					'Seagate IronWolf 4TB CMR 5400rpm',
					'WD RED 4TB CMR 5400rpm'
				]
			}
		]
	}
};

export const lxcs = {
	'PiHole 2': {
		layer: 2,
		method: 'Debian Package'
	},
	Grafana: {
		layer: 3,
		method: 'podman-compose',
		ansible_roles: ['grafana'],
		connections: ['Grafana Loki', "Prometheus"],
		services: ['grafana', 'prometheus', 'unpoller', 'matchtower']
	},
	"Grafana Loki": {
		layer: 3,
		ansible_roles: ['loki'],
		method: 'docker-compose',
		connections: ['Rustfs']
	},
	"Alloy (many)": {
		layer: 3,
		method: 'Ansible',
		ansible_roles: ['alloy', 'compose'],
		connections: ['Grafana Loki'],
		details: 'Deployed to each critical component to collect logs and send to loki'
	},
	"Prometheus": {
		layer: 3,
		method: 'podman-compose',
		ansible_roles: ['grafana'],
		details: 'Same compose as Grafana'
	},
	'Nginx Proxy Manager': {
		layer: 2,
		method: 'podman-compose'
	},
	PostgreSQL: {
		layer: 3,
		method: 'Debian Package'
	},
	Prosody: {
		layer: 3,
		method: 'podman-compose + Debian Package',
		services: ['prosody', 'biboumi', 'slidge'],
		ansible_roles: ['prosody', 'biboumi', 'slidge', 'alloy']
	},
	// KV: {
	// 	layer: 3,
	// 	method: 'Binary install + Systemd'
	// },
	lore: {
		layer: 3,
		method: 'podman-compose'
	},
	Coturn: {
		layer: 3,
		method: 'Debian Package',
		ansible_roles: ['coturn', 'alloy']
	},
	Excalidraw: {
		layer: 3,
		method: 'podman-compose'
	},
	Copyparty: {
		layer: 3,
		method: 'podman-compose'
	},
	Immich: {
		layer: 3,
		method: 'podman-compose'
	},
	LanguageTool: {
		layer: 3,
		method: 'podman-compose'
	},
	Transmission: {
		layer: 3,
		method: 'Alpine Package'
	},
	Jellyfin: {
		layer: 3,
		method: 'Alpine Package'
	},
	Rustfs: {
		layer: 3,
		method: 'TrueNas Container'
	},
};

export const hardware = {
	pi5: {
		name: 'RaspberryPi 5',
		os: 'Raspberry Pi OS 13',
		layout: {
			column: 'infra',
			child_rows: [
				{ category: 'packages', y_offset: 150, item_width: 130, item_gap: 20 },
				{ category: 'containers', y_offset: 230, item_width: 130, item_gap: 20 }
			]
		},
		services: {
			lxc: null,
			vms: null,
			packages: {
				PiHole: {
					layer: 2,
					method: 'Debian Package'
				},
				'Nginx (Angie)': {
					layer: 2,
					method: 'Debian Package',
					ansible_roles: ['angie']
				},
				'NUT UPS Mon': {
					layer: 1,
					method: 'Debian Package'
				}
			},
			containers: {
				'Uptime Kuma': {
					layer: 3,
					method: 'podman-compose'
				},
				'Nebula-sync': {
					layer: 3,
					method: 'podman-compose'
				}
			}
		}
	},	
	fbox: {
		name: 'Freebox (HP Mini PC)',
		os: 'Proxmox VE 9',
		layout: {
			column: 'infra',
			child_rows: [
				{ category: 'vms', y_offset: 150, item_width: 130, item_gap: 30 },
				{ category: 'lxc', y_offset: 320, item_width: 120, item_gap: 30, max_per_row: 7 }
			]
		},
		boards: [
			'Marvell PCIe 4 port Sata Controller',
			'Intel PCIe I226-V dual 2.5GBE',
			'Sonoff Zigbee 3.0 USB Dongle Plus'
		],
		services: {
			lxc: lxcs,
			vms: vms,
			packages: null,
			containers: null
		}
	},
	pi3b: {
		name: 'RaspberryPi 3b',
		os: 'Raspberry Pi OS 13',
		layout: {
			column: 'infra',
			child_rows: [
				{ categories: ['packages', 'containers'], y_offset: 150, item_width: 130, item_gap: 20 }
			]
		},
		services: {
			lxc: null,
			vms: null,
			packages: {
				squeezelite: {
					layer: 3,
					method: 'Debian Package'
				}
			},
			containers: {
				'wyoming-satellite': {
					layer: 3,
					method: 'podman-compose'
				},
				openWakeWord: {
					layer: 3,
					method: 'podman-compose'
				}
			}
		}
	},
	darkforce: {
		name: 'Darkforce',
		kind: 'end-user',
		layer: 3,
		os: 'Arch Linux',
		boards: ['AMD Radeon RX 6800 XT'],
		layout: { column: 'first-col' }
	},
	feebook: {
		name: 'Freebook',
		kind: 'end-user',
		layer: 3,
		os: 'Debian',
		layout: { column: 'first-col' }
	},
	guestbook: {
		name: 'Guestbook',
		kind: 'end-user',
		layer: 3,
		os: 'Fedora',
		layout: { column: 'first-col' }
	},
	tv: {
		name: 'TV',
		layer: 3,
		kind: 'end-user',
		os: null,
		layout: { column: 'first-col' }
	},
	'ups-ts': {
		name: 'TShara ups',
		layer: 2,
		kind: 'ups',
		os: null,
		layout: { column: 'first-col' }
	},
	'ups-rag': {
		name: 'Ragtech ups',
		layer: 2,
		kind: 'ups',
		os: null,
		layout: { column: 'first-col' }
	}
};

export const network = {
	'isp-modem': {
		layer: 1,
		name: 'ISP Modem',
		connections: ['isp', 'ucg-max']
	},
	'ucg-max': {
		layer: 1,
		name: 'UCG 2.5GBE',
		connections: ['isp', 'fbox', 'darkforce', 'pi5', 'usw-flex']
	},
	'usw-flex': {
		layer: 1,
		name: 'USW Flex 2.5GBE',
		connections: ['ucg-max', 'tplink-sg108e', 'u7-pro']
	},
	'tplink-sg108e': {
		layer: 1,
		name: 'TPLink sg-108e Switch',
		connections: ['usw-flex', 'tv', 'pi3b']
	},
	'u7-pro': {
		layer: 1,
		name: 'U7 Pro WiFi AP',
		connections: ['usw-flex']
	}
};

export const logoMap = {
	router: '/logos/generic-router-flat-label-colour.svg',
	switch: '/logos/generic-switch-flat-l2-label-v2-mono.svg',
	wifi: '/logos/generic-switch-flat-l2-label-v2-mono.svg',
	firewall: '/logos/generic-switch-flat-l2-label-v2-mono.svg',
	proxmox: '/logos/proxmox.svg',
	vm: '/logos/Qemu_logo.svg',
	lxc: '/logos/Linux_Containers_logo.svg',
	pihole: '/logos/pi-hole.svg',
	nginx: '/logos/nginx.svg',
	npm: '/logos/nginx-proxy-manager.svg',
	prometheus: '/logos/Prometheus_software_logo.svg',
	grafana: '/logos/Grafana_logo.svg',
	alloy: '/logos/grafana-alloy.svg',
	loki: '/logos/grafana-loki.svg',
	xmpp: '/logos/XMPP_logo.svg',
	postgresql: '/logos/Postgresql_elephant.svg',
	raspberry: '/logos/raspberry-pi.svg',
	arch: '/logos/arch_logo.svg',
	fedora: '/logos/Fedora_icon.svg',
	debian: '/logos/Openlogo-debianV2.svg',
	rustfs: "/logos/rustfs.svg",
	server: '/logos/web-server-icon.svg'
};

export function getLogo(type) {
	return logoMap[type] || logoMap.server;
}

const nodeTypeMap = {
	'isp-modem': 'firewall',
	'ucg-max': 'router',
	'usw-flex': 'switch',
	'tplink-sg108e': 'switch',
	'u7-pro': 'wifi',
	tv: 'server',
	server: 'server',
	pi5: 'raspberry',
	pi3b: 'raspberry',
	fbox: 'proxmox',
	darkforce: 'arch',
	feebook: 'debian',
	guestbook: 'fedora',
	HAOS: 'vm',
	TRUENAS: 'vm',
	'PiHole 2': 'pihole',
	PiHole: 'pihole',
	'Nginx (Angie)': 'nginx',
	'Nginx Proxy Manager': 'npm',
	Grafana: 'grafana',
	"Grafana Loki": 'loki',
	"Alloy (many)": 'alloy',
	PostgreSQL: 'postgresql',
	Prometheus: 'prometheus',
	Prosody: 'xmpp',
	Rustfs: "rustfs"
};

function getTypeFor(key) {
	return nodeTypeMap[key] || 'server';
}

function makeId(prefix, key) {
	return `${prefix}-${String(key).replace(/\s+/g, '-')}`;
}

function directionBetween(fromPos, toPos) {
	const dx = toPos.x - fromPos.x;
	const dy = toPos.y - fromPos.y;
	if (Math.abs(dy) > Math.abs(dx)) {
		return dy > 0 ? 'south' : 'north';
	}
	return dx > 0 ? 'east' : 'west';
}

function rowSpan(n, itemWidth, gap) {
	return n * itemWidth + (n - 1) * gap;
}

function centerRow(n, itemWidth, gap, centerX) {
	const total = rowSpan(n, itemWidth, gap);
	const start = centerX - total / 2;
	return Array.from({ length: n }, (_, i) => start + i * (itemWidth + gap));
}

function getServiceKeys(entry, row) {
	const items = [];
	if (row.category) {
		const services =
			row.category === 'vms'
				? vms
				: row.category === 'lxc'
					? lxcs
					: entry.services?.[row.category] || {};
		const cat =
			row.category === 'vms'
				? 'vm'
				: row.category === 'lxc'
					? 'lxc'
					: row.category === 'packages'
						? 'package'
						: 'container';
		for (const key of Object.keys(services)) {
			items.push({ key, category: cat });
		}
	} else if (row.categories) {
		for (const catName of row.categories) {
			const services = entry.services?.[catName] || {};
			const cat = catName === 'packages' ? 'package' : 'container';
			for (const key of Object.keys(services)) {
				items.push({ key, category: cat });
			}
		}
	}
	return items;
}

export function generateNodes() {
	const nodes = [];
	const Y_NET = 50;
	const Y_ups = 120;
	const Y_HW = 200;
	const COL_PAD = 80;
	const HW_WIDTH = 180;

	let nx = 50;
	const NET_Y_STEP = 10;
	const netOrder = ['isp-modem', 'ucg-max', 'usw-flex', 'tplink-sg108e', 'u7-pro'];
	for (let ni = 0; ni < netOrder.length; ni++) {
		const key = netOrder[ni];
		const entry = network[key];
		if (!entry) continue;
		nodes.push({
			id: makeId('net', key),
			label: entry.name || key,
			type: getTypeFor(key),
			logo: getLogo(getTypeFor(key)),
			position: { x: nx, y: Y_NET + ni * NET_Y_STEP },
			dimensions: { width: 140, height: 60 },
			layer: 1,
			parent: null,
			data: entry,
			category: 'network'
		});
		nx += 150;
	}

	const allHwKeys = Object.keys(hardware);
	const firstColKeys = allHwKeys.filter((k) => hardware[k]?.layout?.column === 'first-col');
	const infraKeys = allHwKeys.filter((k) => hardware[k]?.layout?.column === 'infra');

	const colDefs = [];

	// First column: UPS + end-user, stacked vertically
	if (firstColKeys.length > 0) {
		let firstColW = HW_WIDTH;
		for (const k of firstColKeys) {
			const entry = hardware[k];
			if (!entry) continue;
			if (entry.layout?.child_rows) {
				for (const row of entry.layout.child_rows) {
					const items = getServiceKeys(entry, row);
					const w = rowSpan(items.length, row.item_width, row.item_gap);
					if (w > firstColW) firstColW = w;
				}
			}
		}
		colDefs.push({
			hwKey: 'first-col',
			width: firstColW,
			members: firstColKeys
		});
	}

	// Infrastructure columns (individual, at Y_HW)
	for (const key of infraKeys) {
		const entry = hardware[key];
		if (!entry) continue;
		const layout = entry.layout;
		if (!layout) continue;

		let colW = HW_WIDTH;
		for (const row of layout.child_rows) {
			const items = getServiceKeys(entry, row);
			const perRow = row.max_per_row || items.length;
			const rowW = rowSpan(Math.min(items.length, perRow), row.item_width, row.item_gap);
			if (rowW > colW) colW = rowW;
		}
		colDefs.push({ hwKey: key, width: colW, child_rows: layout.child_rows });
	}

	let colX = 50;
	for (const col of colDefs) {
		col.x = colX;
		col.centerX = colX + col.width / 2;
		colX += col.width + COL_PAD;
	}

	for (const col of colDefs) {
		if (col.hwKey === 'first-col') {
			let stackY = Y_ups;
			for (const key of col.members) {
				const entry = hardware[key];
				if (!entry) continue;

				const hasServices = entry.layout?.child_rows?.length > 0;
				const hwHeight = hasServices ? 70 : 60;
				nodes.push({
					id: makeId('hw', key),
					label: entry.name || key,
					type: getTypeFor(key),
					logo: getLogo(getTypeFor(key)),
					position: { x: col.centerX - HW_WIDTH / 2, y: stackY },
					dimensions: { width: HW_WIDTH, height: hwHeight },
					layer: 2,
					parent: null,
					data: entry,
					category: 'hardware'
				});
				stackY += hwHeight + 10;

				if (entry.layout?.child_rows) {
					for (const row of entry.layout.child_rows) {
						const items = getServiceKeys(entry, row);
						const xs = centerRow(items.length, row.item_width, row.item_gap, col.centerX);
						for (let i = 0; i < items.length; i++) {
							const item = items[i];
							const cat = item.category;
							const prefix =
								cat === 'package'
									? 'pkg'
									: cat === 'container'
										? 'ct'
										: cat === 'vm'
											? 'vm'
											: 'lxc';
							const sdata =
								cat === 'vm'
									? vms[item.key]
									: cat === 'lxc'
										? lxcs[item.key]
										: entry.services?.[cat === 'package' ? 'packages' : 'containers']?.[item.key];
							const nodeId =
								cat === 'vm'
									? makeId('vm', item.key)
									: cat === 'lxc'
										? makeId('lxc', item.key)
										: makeId(prefix, `${key}-${item.key}`);
							nodes.push({
								id: nodeId,
								label: item.key,
								type: getTypeFor(item.key),
								logo: getLogo(getTypeFor(item.key)),
								position: { x: xs[i], y: stackY },
								dimensions: { width: row.item_width, height: 60 },
								layer: 3,
								parent: `hw-${key}`,
								data: sdata || {},
								category: cat
							});
						}
						stackY += 70;
					}
				}
			}
			continue;
		}

		const key = col.hwKey;
		const entry = hardware[key];
		if (!entry) continue;

		nodes.push({
			id: makeId('hw', key),
			label: entry.name || key,
			type: getTypeFor(key),
			logo: getLogo(getTypeFor(key)),
			position: { x: col.centerX - HW_WIDTH / 2, y: Y_HW },
			dimensions: { width: HW_WIDTH, height: 60 },
			layer: 2,
			parent: null,
			data: entry,
			category: 'hardware'
		});

		if (col.child_rows) {
			for (const row of col.child_rows) {
				const items = getServiceKeys(entry, row);
				const perRow = row.max_per_row || items.length;
				const nRows = Math.ceil(items.length / perRow);
				for (let r = 0; r < nRows; r++) {
					const rowItems = items.slice(r * perRow, (r + 1) * perRow);
					const xs = centerRow(rowItems.length, row.item_width, row.item_gap, col.centerX);
					for (let i = 0; i < rowItems.length; i++) {
						const item = rowItems[i];
						const cat = item.category;
						const prefix =
							cat === 'package' ? 'pkg' : cat === 'container' ? 'ct' : cat === 'vm' ? 'vm' : 'lxc';
						const sdata =
							cat === 'vm'
								? vms[item.key]
								: cat === 'lxc'
									? lxcs[item.key]
									: entry.services?.[cat === 'package' ? 'packages' : 'containers']?.[item.key];
						const nodeId =
							cat === 'vm'
								? makeId('vm', item.key)
								: cat === 'lxc'
									? makeId('lxc', item.key)
									: makeId(prefix, `${key}-${item.key}`);
						const y = Y_HW + row.y_offset + r * 70;
						const h = cat === 'vm' ? 55 : 50;
						nodes.push({
							id: nodeId,
							label: item.key,
							type: getTypeFor(item.key),
							logo: getLogo(getTypeFor(item.key)),
							position: { x: xs[i], y },
							dimensions: { width: row.item_width, height: h },
							layer: 3,
							parent: `hw-${key}`,
							data: sdata || {},
							category: cat
						});
					}
				}
			}
		}
	}

	return nodes;
}

export function generateEdges(nodes) {
	const edges = [];
	const nodeIds = new Set(nodes.map((n) => n.id));

	const netEdges = [
		['net-isp-modem', 'net-ucg-max'],
		['net-ucg-max', 'net-usw-flex'],
		['net-usw-flex', 'net-tplink-sg108e'],
		['net-usw-flex', 'net-u7-pro']
	];
	for (const [from, to] of netEdges) {
		if (nodeIds.has(from) && nodeIds.has(to)) edges.push({ from, to });
	}

	const hwConnections = [
		['net-ucg-max', 'hw-pi5'],
		['net-ucg-max', 'hw-ups-ts'],
		['net-ucg-max', 'hw-ups-rag'],
		['net-ucg-max', 'hw-fbox'],
		['net-ucg-max', 'hw-darkforce'],
		['net-ucg-max', 'hw-feebook'],
		['net-ucg-max', 'hw-guestbook'],
		['net-tplink-sg108e', 'hw-pi3b'],
		['net-tplink-sg108e', 'hw-tv']
	];
	for (const [from, to] of hwConnections) {
		if (nodeIds.has(from) && nodeIds.has(to)) edges.push({ from, to });
	}

	for (const node of nodes) {
		if (node.parent && nodeIds.has(node.parent)) {
			edges.push({ from: node.parent, to: node.id });
		}
	}

	return edges;
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

export function getNodeDetails(nodeId) {
	const allNodes = generateNodes();
	const node = allNodes.find((n) => n.id === nodeId);
	if (!node) return null;

	const details = {
		name: node.label,
		type: node.type,
		category: node.category,
		layer: node.layer,
		os: null,
		method: null,
		details: null,
		services: [],
		ansible_roles: [],
		hardware_passthrough: [],
		storage_pools: [],
		boards: [],
		connections: []
	};

	if (node.category === 'network' && node.data) {
		details.connections = node.data.connections || [];
	}

	if (node.category === 'hardware' && node.data) {
		details.os = node.data.os;
		details.boards = node.data.boards || [];
	}

	if (
		(node.category === 'vm' ||
			node.category === 'lxc' ||
			node.category === 'package' ||
			node.category === 'container') &&
		node.data
	) {
		details.method = node.data.method || null;
		details.details = node.data.details || null;
		details.services = node.data.services || [];
		details.ansible_roles = node.data.ansible_roles || [];
		details.hardware_passthrough = node.data.hardware_passthrough || [];
		details.storage_pools = node.data.storage_pools || [];
	}

	if (node.category === 'vm') {
		const vmKey = Object.keys(vms).find((k) => makeId('vm', k) === nodeId);
		if (vmKey) {
			const vmData = vms[vmKey];
			details.hardware_passthrough = vmData.hardware_passthrough || [];
			details.storage_pools = vmData.storage_pools || [];
		}
	}

	if (node.category === 'lxc') {
		const lxcKey = Object.keys(lxcs).find((k) => makeId('lxc', k) === nodeId);
		if (lxcKey) {
			const lxcData = lxcs[lxcKey];
			details.method = lxcData.method || null;
			details.services = lxcData.services || [];
			details.ansible_roles = lxcData.ansible_roles || [];
		}
	}

	return details;
}
