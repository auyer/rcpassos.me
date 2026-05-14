<script>
	import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { avatar_avif, avatar_png, bio, bio_splitted, name } from '$lib/info.js';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{name}: Home</title>
	<meta name="description" content={bio} />
</svelte:head>

<container class="container home-container">
	<!-- bio -->
	<section class="bio-section">
		<div class="bio-content">
			<picture class="profile-box">
				<source class="profile" type="image/avif" srcset={avatar_avif} />
				<img class="profile" src={avatar_png} alt={name} />
			</picture>
			<div>
				<span class="role"
					>💻 Software Engineer<span class="invert">💻 Software Engineer</span>
				</span>
				<span class="role">📡 Researcher<span class="invert">📡 Researcher</span> </span>
				<span class="role">
					🐧 FOSS & Linux Enthusiast
					<span class="invert">🐧 FOSS & Linux Enthusiast</span>
				</span>
			</div>
			<p class="desc"><strong>Stay Curious</strong></p>
			<div class="social-links">
				<SocialLinks />
			</div>
			<div class="bio-text">
				{#each bio_splitted as item (item)}
					<p>{item}</p>
				{/each}
			</div>
		</div>
	</section>
	<section class="recent-posts">
		<div class="section-header">
			<h2>Recently Published</h2>
			<a href="/posts" class="view-all">View All <ArrowRightIcon class="arrow-icon" /></a>
		</div>
		<PostsList posts={data.posts} />
		<div class="section-header">
			<a href="/posts" class="view-all">View All <ArrowRightIcon class="arrow-icon" /></a>
		</div>
	</section>
</container>

<style>
	:global(.home-container) {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		width: 100%;
		max-width: 72rem;
		margin-left: auto;
		margin-right: auto;
	}

	:global(.bio-section) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rem;
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	:global(.bio-content) {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 1.5rem;
	}

	:global(.social-links) {
		display: flex;
		gap: 1.5rem;
	}

	:global(.bio-text) {
		gap: 0.75rem;
	}

	:global(.bio-text p) {
		font-size: 1.125rem;
		text-align: center;
		color: var(--pico-muted-color);
	}

	:global(.recent-posts) {
		width: 100%;
	}

	:global(.section-header) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	:global(.section-header h2) {
		font-size: 1rem;
		font-weight: 500;
		color: var(--pico-muted-color);
	}

	@media (min-width: 640px) {
		:global(.section-header h2) {
			font-size: 1.125rem;
		}
	}

	:global(.view-all) {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--pico-primary);
		text-decoration: none;
	}

	:global(.view-all:hover) {
		text-decoration: underline;
	}
</style>
