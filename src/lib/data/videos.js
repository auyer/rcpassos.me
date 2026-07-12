export const videos = [
	{
		slug: 'debian-debcargo-git-proposal',
		src: '/videos/debcargo-git-proposal.mp4',
		coverImage: '/videos/debcargo-git-proposal.png',
		title: 'Debian debcargo packaging from Git Proposal / Demo',
		date: '2026-07-11',
		description: `While working on packaging Niri ans Cosmic DE, we hit a few blocking dependencies being used from git.
                        Current debcargo implementaion only fetches source code from crates.io.
                        Alternatively, using gbp works, but differs too much from what current debian rust packages look like.
                        This video is a demo and a proposal for Debcargo: use Cargo internals to allow fetching packages from git.

                        This video is also available on YouTube: https://youtu.be/0Td2Z4ysZxo`
	},
	{
		slug: 'wiimote-led-linux-driver',
		src: '/videos/wiimote-led-linux-driver.mp4',
		coverImage: '/videos/wiimote-led-linux-driver.jpg',
		title: 'Wiimote Linux LED Driver',
		date: '2026-07-10',
		description: `A feature demo for the Wiimote Linux Driver.
                    Previously, the Linux Driver for the Wii remotes turned the first LED on every connected controller.
                    Now, each controller that connects receive an ID, and this is used to turn on a specific LED (from 1 to 4).
                    The demo video presents 4 controllers connecting in different order, with a dmesg log in the background.

                    Video also available on YouTube: https://youtu.be/Y1UP-ObZcL0
                    `
	},
	{
		slug: 'concurrency-in-the-linux-kernel',
		youtube: 'zEUWrMmij4A',
		youtubeSi: '1kBdsbxew-nHCyPa',
		title: ' Concurrency in the Linux Kernel: Intro, How Bugs happen + Paper Review [English] ',
		date: '2026-06-21',
		description: `In this video I present an introduction to Concurrency in the Linux Kernel, as well as a review of an article "A Comprehensive Study of Concurrency Bugs in the Linux Kernel" presented in the International Conference on Software Engineering ICSE 2026.

        https://conf.researchr.org/details/icse-2026/icse-2026-research-track/262/A-Comprehensive-Study-of-Concurrency-Bugs-in-the-Linux-Kernel`
	},
	{
		slug: 'concorrencia-no-linux-kernel',
		youtube: 'mSN9-PnBy_E',
		youtubeSi: 'X_c0JPk6W56roYsw',
		title:
			'Concorrência no Kernel Linux: Introdução, como Bugs acontecem + Revisão de Artigo [PT-BR]',
		date: '2026-06-21',
		description: `Neste video apresendo uma introdução ao assunto de Concorrência no Kernel Linux, e uma revisão do artigo "A Comprehensive Study of Concurrency Bugs in the Linux Kernel" apresentado na Conferência Internacional de Engenharia de Software ICSE.

        https://conf.researchr.org/details/icse-2026/icse-2026-research-track/262/A-Comprehensive-Study-of-Concurrency-Bugs-in-the-Linux-Kernel
            `
	},
	{
		slug: 'duks-dashboard-linux',
		youtube: 'upn4a_sb2os',
		youtubeSi: 'pwIGlqzN-957P4TZ',
		title: '🦆 DUKS   Dashboard for Unified Kernel Statistics',
		date: '2025-06-14',
		description: `With its remarkably extensive source code, uniquely long lifespan, and undeniable importance to modern society, the Linux kernel is trivially hard to maintain. However, its decentralized development spread over many git trees and mailing lists makes empirically assessing the health of its maintainership model nothing short of a challenge. 
        Off-the-shelf data analysis tools fail to capture crucial nuances exclusive to the kernel development model, such as the actual authors who take part in every patch submitted or how the commit flow between trees changes as new release candidates are created for every merge and stabilization window.
        We propose the Dashboard for Unified Kernel Statistics (DUKS), an innovative framework that supports multiple visualizations and data analyses previously unsupported for the Linux kernel. Using the Linux kernel mainline as an example, we demonstrate how DUKS could provide valuable insights for understanding the health of the kernel maintainership model.
        By coupling information from the kernel git trees collected from the Software Heritage repository alongside authorship information shared in mailing lists, we envision DUKS as a cornerstone open-access utility to support analyses on the Linux kernel evolution and maintenance.`
	},
	{
		slug: 'elixir-introducao-linguagem-funcional',
		youtube: 'dqg1lgYERHY',
		youtubeSi: '34r7emBNEbnQqqMv',
		title: 'Introduçao a Programaçao Funcional em Elixir [PT-BR]',
		date: '2017-11-08',
		description: 'Este vídeo é uma introduçao à Linguagem de Programaçao Funcional Elixir.'
	}
];
