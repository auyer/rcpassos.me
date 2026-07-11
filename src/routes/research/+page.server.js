import { papers, coPapers } from '$lib/data/research';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const orcidId = '0009-0003-3657-5519';

	return {
		orcidId,
		papers,
		coPapers
	};
}
