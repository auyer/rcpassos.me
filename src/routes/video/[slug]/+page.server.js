import { videos } from '$lib/data/videos';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { slug } = params;

	// get video with metadata
	const video = videos.find((video) => slug === video.slug);

	if (!video) {
		throw error(404, 'video not found');
	}

	return {
		video
	};
}
