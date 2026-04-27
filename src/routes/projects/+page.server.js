/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let projects = [
		{
			name: 'Protonup-rs',
			description:
				'A Rust app to automate the installation and update of Linux Gaming Compatibility tools, like ProtonGE, Luxtorpeda, Boxtron and others.',
			link: 'https://github.com/auyer/Protonup-rs',
			cta: 'github.com/auyer/Protonup-rs'
		},
		{
			name: 'Steganography Lib',
			description:
				'Pure Golang Library that allows LSB steganography on images using ZERO dependencies',
			link: 'https://github.com/auyer/steganography',
			cta: 'github.com/auyer/steganography'
		},
		// KV is offline. Re add when  back on
		// {
		// 	name: 'MemoryKV',
		// 	description:
		// 		"A KV in memory database built in Rust for learning purposes. It streams all changes using websocket. The demo is hosted in a tiny free-tier instance. <br><b>But go check the Demo! It's fun!</b><br>Open it in two tabs, or two devices for a more interesting experience.",
		// 	link: '/projects/kv',
		// 	cta: 'Check the live demo here'
		// },
		{
			name: 'Linux Patches',
			description:
				'I want to contribute more to the Linux kernel, but I only have small janitor style patches for now.',
			link: 'https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/log/?qt=author&q=Rafael+Passos',
			cta: 'Check my patches upstream'
		},
		{
			name: 'DUKS - Dashboard for Unified Kernel Statistics',
			description:
				'A Proof of concept Analytical platform for the Linux Kernel. Part of the PhD research.',
			link: 'https://duks.rcpassos.me/',
			cta: 'duks.rcpassos.me/'
		},
		{
			name: 'MLH-Archiver',
			description: `Collect and archive locally emails from mailing lists, and transform them into Parquet Datasets.
					A multipart software, with an extensible Rust Collector and Python transformation actors.
						Work in progress.
						Part of the PhD research`,
			link: 'https://github.com/linux-duks/MLH-archiver',
			cta: 'github.com/linux-duks/MLH-archiver'
		},
		{
			name: 'PublicInboxStack',
			description: `Configurable Setup to Mirror and Host the Lore (PublicInbox) Software with Mailing Lists. Part of the PhD research.`,
			link: 'https://github.com/linux-duks/Public-Inbox-Stack',
			cta: 'github.com/linux-duks/Public-Inbox-Stack'
		}
	];

	return {
		projects: projects
	};
}
