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
	Transmission: {
		layer: 3,
		method: 'Alpine Package'
	},
	Jellyfin: {
		layer: 3,
		method: 'Alpine Package'
	},
	'Nginx Proxy Manager': {
		layer: 2,
		method: 'podman-compose'
	},
	Grafana: {
		layer: 3,
		method: 'podman-compose',
		services: ['grafana', 'prometheus', 'unpoller', 'matchtower']
	},
	PostgreSQL: {
		layer: 3,
		method: 'Debian Package'
	},
	KV: {
		layer: 3,
		method: 'Binary install + Systemd'
	},
	lore: {
		layer: 3,
		method: 'podman-compose'
	},
	Prosody: {
		layer: 3,
		method: 'podman-compose + Debian Package',
		services: ['prosody', 'biboumi', 'slidge'],
		ansible_roles: ['prosody', 'biboumi', 'slidge']
	},
	Coturn: {
		layer: 3,
		method: 'Debian Package',
		ansible_roles: ['coturn']
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
	}
};

export const hardware = {
	pi5: {
		name: 'RaspberryPi 5',
		os: 'Raspberry Pi OS 13',
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
	pi3b: {
		name: 'RaspberryPi 3b',
		os: 'Raspberry Pi OS 13',
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
	fbox: {
		name: 'Freebox (HP Mini PC)',
		os: 'Proxmox VE 9',
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
	darkforce: {
		name: 'Darkforce',
		kind: 'end-user',
		layer: 3,
		os: 'Arch Linux',
		boards: ['AMD Radeon RX 6800 XT']
	},
	feebook: {
		name: 'Freebook',
		kind: 'end-user',
		layer: 3,
		os: 'Debian'
	},
	guestbook: {
		name: 'Guestbook',
		kind: 'end-user',
		layer: 3,
		os: 'Fedora'
	},
	tv: {
		name: 'TV',
		layer: 3,
		kind: 'end-user',
		os: null
	},
	'ups-ts': {
		name: 'TShara ups',
		layer: 2,
		kind: 'ups',
		os: null
	},
	'ups-rag': {
		name: 'Ragtech ups',
		layer: 2,
		kind: 'ups',
		os: null
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
		name: 'Ubiquity Cloud Gateway 2.5GBE',
		connections: ['isp', 'fbox', 'darkforce', 'pi5', 'usw-flex']
	},
	'usw-flex': {
		layer: 1,
		name: 'Ubiquity USW Flex Switch 2.5GBE',
		connections: ['ucg-max', 'tplink-sg108e', 'u7-pro']
	},
	'tplink-sg108e': {
		layer: 1,
		name: 'TPLink sg-108e Switch',
		connections: ['usw-flex', 'tv', 'pi3b']
	},
	'u7-pro': {
		layer: 1,
		name: 'Ubiquity U7 Pro WiFi AP',
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
	grafana: '/logos/Grafana_logo.svg',
	postgresql: '/logos/Postgresql_elephant.svg',
	raspberry: '/logos/raspberry-pi.svg',
	arch: '/logos/Arch_icon.svg',
	fedora: '/logos/Fedora_icon.svg',
	debian: '/logos/Openlogo-debianV2.svg',
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
	PostgreSQL: 'postgresql'
};

function getTypeFor(key) {
	return nodeTypeMap[key] || 'server';
}

function getLogoFor(key, category) {
	const mapped = nodeTypeMap[key];
	if (mapped) return getLogo(mapped);
	if (category === 'lxc') return getLogo('lxc');
	if (category === 'vm') return getLogo('vm');
	return getLogo('server');
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

export function generateNodes() {
	const nodes = [];
	const Y_NET = 50;
	const Y_ups = 120;
	const Y_HW = 200;
	const Y_SVC1 = 330;
	const Y_SVC2 = 400;
	const Y_LXC1 = 490;
	const Y_LXC2 = 560;
	const COL_PAD = 80;
	const HW_WIDTH = 150;

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
			dimensions: { width: 120, height: 50 },
			layer: 1,
			parent: null,
			data: entry,
			category: 'network'
		});
		nx += 150;
	}

	const svcConfigs = {
		pi5: [
			{ keys: ['PiHole', 'Nginx (Angie)', 'NUT UPS Mon'], cat: 'package', y: Y_SVC1 },
			{ keys: ['Uptime Kuma', 'Nebula-sync'], cat: 'container', y: Y_SVC2 }
		],
		pi3b: [
			{
				keys: ['squeezelite', 'wyoming-satellite', 'openWakeWord'],
				cats: ['package', 'container', 'container'],
				y: Y_SVC1
			}
		]
	};

	const allHwKeys = Object.keys(hardware);
	const upsKeys = allHwKeys.filter((k) => hardware[k]?.kind === 'ups');
	const endUserKeys = allHwKeys.filter((k) => hardware[k]?.kind === 'end-user');
	const firstColKeys = [...upsKeys, ...endUserKeys];
	const infraKeys = allHwKeys.filter((k) => !firstColKeys.includes(k) && (!hardware[k]?.kind || hardware[k]?.kind === 'infra'));

	const colDefs = [];

	// First column: pi5 + UPS + end-user, stacked vertically (already defined above)
	if (firstColKeys.length > 0) {
		const hasPi5 = firstColKeys.includes('pi5');
		const pi5W = hasPi5 ? Math.max(rowSpan(3, 110, 20), rowSpan(2, 110, 20), HW_WIDTH) : 0;
		colDefs.push({
			hwKey: 'first-col',
			width: Math.max(pi5W, HW_WIDTH),
			members: firstColKeys
		});
	}

	// Infrastructure columns (individual, at Y_HW)
	for (const key of infraKeys) {
		if (key === 'pi5') continue; // pi5 is in first column
		if (key === 'fbox') {
			const vmW = 130;
			const vmGap = 30;
			const lxcW = 120;
			const lxcGap = 30;
			const nVms = Object.keys(vms).length;
			const nLxcs = Object.keys(lxcs).length;
			const vmRowW = nVms > 0 ? rowSpan(nVms, vmW, vmGap) : 0;
			const lxcRowW = rowSpan(Math.min(nLxcs, 7), lxcW, lxcGap);
			const colW = Math.max(vmRowW, lxcRowW, HW_WIDTH);
			colDefs.push({ hwKey: 'fbox', y: Y_HW, width: colW, vmW, vmGap, lxcW, lxcGap, nVms, nLxcs });
		} else if (key === 'pi3b') {
			const svcW = 110;
			const svcGap = 20;
			const w = rowSpan(3, svcW, svcGap);
			colDefs.push({ hwKey: 'pi3b', y: Y_HW, width: Math.max(w, HW_WIDTH), svcW, svcGap });
		}
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
				if (key === 'pi5') {
					nodes.push({
						id: makeId('hw', key),
						label: entry.name || key,
						type: getTypeFor(key),
						logo: getLogo(getTypeFor(key)),
						position: { x: col.centerX - HW_WIDTH / 2, y: stackY },
						dimensions: { width: HW_WIDTH, height: 60 },
						layer: 2, parent: null, data: entry, category: 'hardware'
					});
					stackY += 70;
					for (const row of svcConfigs.pi5) {
						const xs = centerRow(row.keys.length, 110, 20, col.centerX);
						for (let i = 0; i < row.keys.length; i++) {
							const skey = row.keys[i];
							const cat = row.cat || 'package';
							const prefix = cat === 'package' ? 'pkg' : 'ct';
							const sdata = entry.services?.[cat === 'package' ? 'packages' : 'containers']?.[skey];
							nodes.push({
								id: makeId(prefix, `pi5-${skey}`),
								label: skey,
								type: getTypeFor(skey),
								logo: getLogo(getTypeFor(skey)),
								position: { x: xs[i], y: stackY },
								dimensions: { width: 110, height: 50 },
								layer: 3, parent: 'hw-pi5', data: sdata || {},
								category: cat === 'package' ? 'package' : 'container'
							});
						}
						stackY += 60;
					}
				} else {
					nodes.push({
						id: makeId('hw', key),
						label: entry.name || key,
						type: getTypeFor(key),
						logo: getLogo(getTypeFor(key)),
						position: { x: col.centerX - HW_WIDTH / 2, y: stackY },
						dimensions: { width: HW_WIDTH, height: 60 },
						layer: 2, parent: null, data: entry, category: 'hardware'
					});
					stackY += 70;
				}
			}
			continue;
		}

		const entry = hardware[col.hwKey];
		if (!entry) continue;

		nodes.push({
			id: makeId('hw', col.hwKey),
			label: entry.name || col.hwKey,
			type: getTypeFor(col.hwKey),
			logo: getLogo(getTypeFor(col.hwKey)),
			position: { x: col.centerX - HW_WIDTH / 2, y: col.y },
			dimensions: { width: HW_WIDTH, height: 60 },
			layer: 2,
			parent: null,
			data: entry,
			category: 'hardware'
		});

		if (col.hwKey === 'fbox') {
			const vmKeys = Object.keys(vms);
			if (vmKeys.length > 0) {
				const vmXs = centerRow(vmKeys.length, col.vmW, col.vmGap, col.centerX);
				for (let i = 0; i < vmKeys.length; i++) {
					const key = vmKeys[i];
					nodes.push({
						id: makeId('vm', key),
						label: vms[key].name || key,
						type: getTypeFor(key),
						logo: getLogo(getTypeFor(key)),
						position: { x: vmXs[i], y: Y_SVC1 },
						dimensions: { width: col.vmW, height: 55 },
						layer: 3,
						parent: 'hw-fbox',
						data: vms[key],
						category: 'vm'
					});
				}
			}

			const lxcKeys = Object.keys(lxcs);
			const perRow = 7;
			const nRows = Math.ceil(lxcKeys.length / perRow);
			for (let r = 0; r < nRows; r++) {
				const rowKeys = lxcKeys.slice(r * perRow, (r + 1) * perRow);
				const xs = centerRow(rowKeys.length, col.lxcW, col.lxcGap, col.centerX);
				for (let i = 0; i < rowKeys.length; i++) {
					const key = rowKeys[i];
					nodes.push({
						id: makeId('lxc', key),
						label: key,
						type: nodeTypeMap[key] || 'lxc',
						logo: getLogoFor(key, 'lxc'),
						position: { x: xs[i], y: r === 0 ? Y_LXC1 : Y_LXC2 },
						dimensions: { width: col.lxcW, height: 50 },
						layer: 3,
						parent: 'hw-fbox',
						data: lxcs[key],
						category: 'lxc'
					});
				}
			}
		}

		if (col.hwKey === 'pi3b') {
			const keys = ['squeezelite', 'wyoming-satellite', 'openWakeWord'];
			const cats = ['package', 'container', 'container'];
			const xs = centerRow(keys.length, col.svcW, col.svcGap, col.centerX);
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				const cat = cats[i];
				const prefix = cat === 'package' ? 'pkg' : 'ct';
				const data = entry.services?.[cat === 'package' ? 'packages' : 'containers']?.[key];
				nodes.push({
					id: makeId(prefix, `pi3b-${key}`),
					label: key,
					type: getTypeFor(key),
					logo: getLogo(getTypeFor(key)),
					position: { x: xs[i], y: Y_SVC1 },
					dimensions: { width: col.svcW, height: 50 },
					layer: 3,
					parent: 'hw-pi3b',
					data: data || {},
					category: cat === 'package' ? 'package' : 'container'
				});
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
		services: [],
		ansible_roles: [],
		hardware_passthrough: [],
		storage_pools: [],
		boards: [],
		connections: [],
		method: null
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
