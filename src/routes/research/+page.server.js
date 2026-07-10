/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const orcidId = '0009-0003-3657-5519';

	const papers = [
		{
			name: 'LKML5Ws: The What, When, Who, Where, and Why in the Linux Kernel Mailing Lists',
			published: '42nd ICSME (IEEE)',
			year: 2026,
			url: 'research/lkml5ws-ICSME-2026'
		},
		{
			name: 'Streamlining Analyses on the Linux Kernel with DUKS',
			published: '13th VISSOFT (IEEE)',
			year: 2025,
			url: 'research/linux-kernel-with-DUKS-vissoft-2025'
		},
		{
			name: 'DUKS: visualizações e análises unificadas para o Kernel Linux',
			published: 'XIII VEM (CBSoft)',
			year: 2025,
			language: 'PT-BR 🇧🇷',
			url: 'https://doi.org/10.5753/vem.2025.14637'
		}
	];

	const coPapers = [
		{
			name: 'When Do You Repeat Yourself? Voices from the Trenches of Linux Kernel Maintainers on Code Duplication',
			published: 'TechDebt 2026 (ICSE)',
			year: 2026,
			url: 'https://conf.researchr.org/details/TechDebt-2026/TechDebt-2026-main/8/When-Do-You-Repeat-Yourself-Voices-from-the-Trenches-of-Linux-Kernel-Maintainers-on-'
		},
		{
			name: 'Guidelines for Boosting Long-Lasting FLOSS Contributors',
			published: 'DebConf25 Brest',
			year: 2025,
			url: 'https://hal.science/hal-05334509'
		},
		{
			name: 'Estratégias de ensino para incentivar a participação consistente em projetos de Software Livre',
			published: 'XIII VEM (CBSoft)',
			year: 2025,
			language: 'PT-BR 🇧🇷',
			url: 'https://doi.org/10.5753/vem.2025.14524'
		}
	];

	return {
		orcidId,
		papers,
		coPapers
	};
}
