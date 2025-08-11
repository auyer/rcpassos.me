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

<container class="flex flex-col flex-grow w-full mx-auto max-w-6xl">
	<!-- bio -->
	<section class="flex flex-col items-center gap-16 pt-8 pb-16">
		<div class="flex flex-col items-center w-full gap-6">
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
			<div class="flex gap-6">
				<SocialLinks />
			</div>
			<div class="gap-3">
				{#each bio_splitted as item}
					<p class="text-lg text-center text-zinc-600 dark:text-zinc-400">
						{item}
					</p>
				{/each}
			</div>
		</div>
	</section>
	<section class="w-full">
		<div class="flex items-center justify-between gap-4 mb-8">
			<h2 class="text-sm font-medium sm:text-base text-zinc-500 dark:text-zinc-400">
				Recently Published
			</h2>
			<a href="/posts" class="flex items-center gap-1 text-sm font-medium text-teal-500"
				>View All <ArrowRightIcon class="w-4 h-4 m-2" /></a
			>
		</div>
		<PostsList posts={data.posts} />
	</section>
</container>

<style lang="scss">
	.profile {
		@apply mx-auto rounded-full w-36 h-36;
	}
	.profile-box {
		@apply profile ring-2 ring-zinc-200 dark:ring-zinc-700;
	}
	$w-s: 750px;

	.role {
		position: relative;
		display: inline-block;
		font-weight: 900;
		color: var(--t-bg);
		background-color: var(--t-fg);
		padding: 0.25em 0.5em;
		z-index: 2;

		@media (min-width: $w-s) {
			font-size: var(--f-u3);
		}

		&:nth-of-type(1) {
			.invert {
				background-color: var(--c-pink);
			}
		}

		&:nth-of-type(2) {
			.invert {
				background-color: var(--c-blue);
			}
		}

		&:nth-of-type(3) {
			.invert {
				background-color: var(--c-green);
			}
		}

		&:hover {
			.invert {
				clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
			}
		}
	}

	.invert {
		position: absolute;
		color: var(--t-fg);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
		clip-path: polygon(0% 100%, 100% 100%, 100% 200%, 0% 200%);
		transition: clip-path cubic-bezier(0.4, 0, 0.5, 1) 150ms;
	}
</style>
