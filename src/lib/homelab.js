export const entities = {
	'isp-modem': {
		entityType: 'infrastructure',
		kind: 'modem',
		name: 'ISP Modem'
	},
	'ucg-max': {
		entityType: 'infrastructure',
		kind: 'router',
		name: 'UCG 2.5GBE',
		logo: 'generic-router-flat-label-colour'
	},
	'usw-flex': {
		entityType: 'infrastructure',
		kind: 'switch',
		name: 'USW Flex 2.5GBE',
		logo: 'generic-switch-flat-l2-label-v2-mono'
	},
	'tplink-sg108e': {
		entityType: 'infrastructure',
		kind: 'switch',
		name: 'TPLink sg-108e Switch'
	},
	'u7-pro': {
		entityType: 'infrastructure',
		kind: 'wifi-ap',
		name: 'U7 Pro WiFi AP'
	},

	'ups-ts': {
		entityType: 'infrastructure',
		kind: 'ups',
		name: 'TShara ups',
		logo: 'ups'
	},
	'ups-rag': {
		entityType: 'infrastructure',
		kind: 'ups',
		name: 'Ragtech ups',
		logo: 'ups'
	},

	fbox: {
		entityType: 'infrastructure',
		kind: 'server',
		name: 'Freebox (HP Mini PC)',
		logo: 'server',
		boards: [
			'Marvell PCIe 4 port Sata Controller',
			'Intel PCIe I226-V dual 2.5GBE',
			'Sonoff Zigbee 3.0 USB Dongle Plus'
		]
	},
	pi5: {
		entityType: 'infrastructure',
		kind: 'raspberry-pi',
		name: 'RaspberryPi 5'
	},
	pi3b: {
		entityType: 'infrastructure',
		kind: 'raspberry-pi',
		name: 'RaspberryPi 3b'
	},
	// client computers
	// sidbox: {
	// 	entityType: 'infrastructure',
	// 	kind: 'desktop',
	// 	name: 'Sidbox (PC)',
	// 	logo: 'debian',
	// 	boards: ['AMD Radeon RX 6800 XT'],
	// },
	// feebook: {
	// 	entityType: 'infrastructure',
	// 	kind: 'laptop',
	// 	name: 'Freebook',
	// 	logo: 'debian',
	// },
	// guestbook: {
	// 	entityType: 'infrastructure',
	// 	kind: 'laptop',
	// 	name: 'Guestbook',
	// 	logo: 'fedora',
	// },

	'proxmox-fbox': {
		entityType: 'platform',
		kind: 'hypervisor',
		name: 'Proxmox VE 9',
		runsOn: ['fbox']
	},
	'qemu-fbox': {
		entityType: 'platform',
		kind: 'qemu',
		name: 'Qemu',
		runsOn: ['proxmox-fbox'],
		group: true
	},
	'lxc-fbox': {
		entityType: 'platform',
		kind: 'lxc-runtime',
		name: 'LXC',
		runsOn: ['proxmox-fbox'],
		group: true
	},

	truenas: {
		entityType: 'platform',
		kind: 'vm',
		name: 'TrueNas Scale',
		runsOn: ['qemu-fbox'],
		passthrough: ['Marvell PCIe 4 port Sata Controller'],
		group: true,
		storagePools: [
			{
				scheme: 'Raid Z1',
				disks: [
					'Seagate IronWolf 4TB CMR 5400rpm',
					'Seagate IronWolf 4TB CMR 5400rpm',
					'WD RED 4TB CMR 5400rpm'
				]
			}
		]
	},

	// Proxmox VMs
	haos: {
		entityType: 'service',
		kind: 'vm',
		name: 'Home Assistant OS',
		runsOn: ['qemu-fbox'],
		passthrough: ['Sonoff Zigbee 3.0 USB Dongle Plus']
	},

	'vm-k3': {
		entityType: 'platform',
		kind: 'vm',
		name: 'K3S Node 3',
		logo: 'k3s',
		runsOn: ['qemu-fbox']
	},
	'vm-k2': {
		entityType: 'platform',
		kind: 'vm',
		name: 'K3S Node 2',
		logo: 'k3s',
		runsOn: ['qemu-fbox']
	},
	'vm-k1': {
		entityType: 'platform',
		kind: 'vm',
		name: 'K3S Node 1',
		logo: 'k3s',
		runsOn: ['qemu-fbox']
	},

	// Proxmox LXCs
	'lxc-pihole2': {
		entityType: 'service',
		kind: 'lxc',
		name: 'PiHole 2',
		runsOn: ['lxc-fbox'],
		method: 'Debian Package',
		logo: 'pi-hole'
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
		nestedServices: ['grafana', 'prometheus', 'unpoller', 'matchtower']
	},
	'lxc-loki': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Grafana Loki',
		runsOn: ['lxc-fbox'],
		method: 'docker-compose',
		ansibleRoles: ['loki'],
		logo: 'grafana-loki',
		connections: ['truenas-rustfs']
	},
	'lxc-prometheus': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Prometheus',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose',
		ansibleRoles: ['grafana'],
		logo: 'prometheus',
		details: 'Same compose as Grafana'
	},
	'lxc-traefik': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Traefik',
		runsOn: ['lxc-fbox'],
		method: 'docker-compose',
		logo: 'traefik'
	},
	'lxc-prosody': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Prosody',
		runsOn: ['lxc-fbox'],
		method: 'Debian Packages + podman-compose',
		ansibleRoles: ['prosody', 'biboumi', 'alloy'],
		logo: 'xmpp',
		nestedServices: ['prosody', 'biboumi']
	},
	'lxc-lore': {
		entityType: 'service',
		kind: 'lxc',
		name: 'lore',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose'
	},
	'lxc-copyparty': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Copyparty',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose'
	},
	'lxc-immich': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Immich',
		runsOn: ['lxc-fbox'],
		method: 'podman-compose'
	},
	'lxc-transmission': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Transmission',
		runsOn: ['lxc-fbox'],
		method: 'Alpine Package'
	},
	'lxc-jellyfin': {
		entityType: 'service',
		kind: 'lxc',
		name: 'Jellyfin',
		runsOn: ['lxc-fbox'],
		method: 'Alpine Package'
	},
	'netbird-fbox': {
		entityType: 'service',
		kind: 'package',
		name: 'NetBird Peer',
		runsOn: ['lxc-fbox'],
		method: 'Docker'
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
		connections: ['lxc-loki']
	},

	// Truenas Containers
	'truenas-rustfs': {
		entityType: 'service',
		kind: 'container',
		name: 'Rustfs',
		runsOn: ['truenas'],
		method: 'TrueNas Container',
		logo: 'rustfs'
	},
	'truenas-rsyncd': {
		entityType: 'service',
		kind: 'container',
		name: 'rsyncd',
		runsOn: ['truenas'],
		method: 'TrueNas Container'
	},
	'truenas-nextcloud': {
		entityType: 'service',
		kind: 'container',
		name: 'Nextcloud',
		runsOn: ['truenas'],
		method: 'TrueNas Container'
	},
	'truenas-distribution': {
		entityType: 'service',
		kind: 'container',
		name: 'Distribution',
		runsOn: ['truenas'],
		method: 'TrueNas Container'
	},

	// Pi5 services

	'pkg-pi5-pihole': {
		entityType: 'service',
		kind: 'package',
		name: 'PiHole',
		runsOn: ['pi5'],
		method: 'Debian Package',
		logo: 'pi-hole'
	},
	'pkg-pi5-nginx': {
		entityType: 'service',
		kind: 'package',
		name: 'Nginx (Angie)',
		runsOn: ['pi5'],
		method: 'Debian Package',
		ansibleRoles: ['angie'],
		logo: 'nginx'
	},
	'pkg-pi5-nut': {
		entityType: 'service',
		kind: 'package',
		name: 'NUT UPS Mon',
		runsOn: ['pi5'],
		method: 'Debian Package'
	},
	'netbird-pi5': {
		entityType: 'service',
		kind: 'package',
		name: 'NetBird Peer',
		runsOn: ['pi5'],
		method: 'Docker'
	},
	'pi5-nebulasync': {
		entityType: 'service',
		kind: 'container',
		name: 'Nebula-sync',
		runsOn: ['pi5'],
		method: 'podman-compose'
	},

	// pi3 services
	'pkg-pi3b-squeezelite': {
		entityType: 'service',
		kind: 'package',
		name: 'squeezelite',
		runsOn: ['pi3b'],
		method: 'Debian Package'
	},

	'pi3b-wyoming': {
		entityType: 'service',
		kind: 'container',
		name: 'wyoming-satellite',
		runsOn: ['pi3b'],
		method: 'podman-compose'
	},
	'pi3b-openwakeword': {
		entityType: 'service',
		kind: 'container',
		name: 'openWakeWord',
		runsOn: ['pi3b'],
		method: 'podman-compose'
	},

	// k8s
	k3s: {
		entityType: 'platform',
		kind: 'orchestrator',
		name: 'K3S Cluster',
		group: true,
		runsOn: ['vm-k1', 'vm-k2', 'vm-k3'],
		logo: 'k8s',
		method: 'ansible'
	},
	languagetool: {
		entityType: 'service',
		kind: 'pod',
		name: 'LanguageTool',
		runsOn: ['k3s'],
		method: 'podman-compose'
	},
	'pi5-uptimekuma': {
		entityType: 'service',
		kind: 'pod',
		name: 'Uptime Kuma',
		runsOn: ['k3s'],
		method: 'helm'
	},
	matrix: {
		entityType: 'service',
		kind: 'pod',
		name: 'Matrix (Continuwuity)',
		runsOn: ['k3s'],
		method: 'helm'
	},
    kubewarden: {
		entityType: 'service',
		kind: 'controller',
		name: 'Kubewarden',
		runsOn: ['k3s'],
		method: 'helm'
	}
};

export const networkEdges = [
	['isp-modem', 'ucg-max'],
	['ucg-max', 'usw-flex'],
	['ucg-max', 'fbox'],
	['ucg-max', 'pi5'],
	['ucg-max', 'sidbox'],
	['ucg-max', 'feebook'],
	['ucg-max', 'guestbook'],
	['ucg-max', 'ups-ts'],
	['usw-flex', 'ups-rag'],
	['usw-flex', 'tplink-sg108e'],
	['usw-flex', 'u7-pro'],
	['tplink-sg108e', 'pi3b']
];

const DEFAULT_LOGOS = {
	hypervisor: 'proxmox',
	vm: 'Qemu_logo',
	lxc: 'Linux_Containers_logo',
	'lxc-runtime': 'Linux_Containers_logo',
	container: 'app',
	package: 'app',
	qemu: 'Qemu_logo',
	router: 'generic-router-flat-label-colour',
	switch: 'generic-switch-flat-l2-label-v2-mono',
	'wifi-ap': 'generic-switch-flat-l2-label-v2-mono',
	modem: 'generic-switch-flat-l2-label-v2-mono',
	server: 'app',
	'raspberry-pi': 'raspberry-pi',
	desktop: 'Openlogo-debianV2',
	laptop: 'Openlogo-debianV2',
	ups: 'app',
	os: 'app',
	orchestrator: 'app',

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
	rustfs: 'rustfs'
};

export function resolveLogo(kindOrEntity) {
	if (typeof kindOrEntity === 'string') {
		return DEFAULT_LOGOS[kindOrEntity] || 'app';
	}
	return kindOrEntity.logo || DEFAULT_LOGOS[kindOrEntity.kind] || 'app';
}

export function getLogoPath(logo) {
	return `/logos/${logo}.svg`;
}

export function getLogo(kindOrName) {
	return getLogoPath(resolveLogo(kindOrName));
}

export function getEntity(id) {
	return entities[id] || null;
}

export function getChildren(parentId) {
	return Object.entries(entities)
		.filter(([, e]) => e.runsOn && e.runsOn.includes(parentId))
		.map(([id, e]) => ({ id, ...e }));
}

export function getAllDescendants(parentId, _visited) {
	const visited = _visited || new Set();
	if (visited.has(parentId)) return [];
	visited.add(parentId);
	const children = getChildren(parentId);
	const descendants = [...children];
	for (const child of children) {
		descendants.push(...getAllDescendants(child.id, visited));
	}
	return descendants;
}

export function getRootEntities() {
	return Object.entries(entities).filter(([, e]) => !e.runsOn);
}

export function getNetworkEntities() {
	const networkKinds = new Set(['modem', 'router', 'switch', 'wifi-ap']);
	return Object.entries(entities)
		.filter(([, e]) => networkKinds.has(e.kind) && !e.runsOn)
		.map(([id]) => id);
}

export function isPlatform(id) {
	const entity = entities[id];
	return entity && entity.entityType === 'platform';
}

export function isService(id) {
	const entity = entities[id];
	return entity && entity.entityType === 'service';
}

export function isInfrastructure(id) {
	const entity = entities[id];
	return entity && entity.entityType === 'infrastructure';
}

export function getNodeDetails(nodeId) {
	const entity = entities[nodeId];
	if (!entity) return null;

	let osValue = entity.os || null;
	if (!osValue && entity.entityType === 'infrastructure') {
		const platformChildren = Object.entries(entities)
			.filter(([, e]) => e.runsOn && e.runsOn.includes(nodeId) && e.entityType === 'platform')
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
		connections
	};
}
