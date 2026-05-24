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
			link: 'https://gitlab.com/ccsl-usp/codev/DUKS',
			cta: 'duks.rcpassos.me/'
		},
		{
			name: 'MailingListsHeritage',
			description: `Long-lived FLOSS projects, like the Linux kernel, use mailing lists as the traditional medium for all development, bug reporting, and pivotal discussions about the project's future. However, as a consequence of the decentralised development model of these projects, the emails are spread across hundreds of mailing lists, with different communities and code maintenance models. The MailingListsHeritage tool was built as a 4-step pipeline. The first 3 are implemented in Rust; the last is implemented in Python. 1) Archiver: collects raw emails from the configured sources (extensible over a Rust trait), 2) Parser: extracts information from the headers and body of the email (applying normalisation on some fields), 3) Anonymizer: applies a hash-based pseudonymisation step to participant identities, 4) Analysis: test and validate the resulting files.
						Part of my PhD research`,
			link: 'https://gitlab.com/ccsl-usp/codev/MailingListsHeritage',
			cta: 'gitlab.com/ccsl-usp/codev/MailingListsHeritage'
		},
		{
			name: 'PublicInboxStack',
			description: `Configurable Setup to Mirror and Host the Lore (PublicInbox) Software with Mailing Lists. Part of the PhD research.`,
			link: 'https://gitlab.com/ccsl-usp/codev/Public-Inbox-Stack',
			cta: 'gitlab.com/ccsl-usp/codev/Public-Inbox-Stack'
		}
	];

	return {
		projects: projects
	};
}
