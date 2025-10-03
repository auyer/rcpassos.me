<script lang="js">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	/**
	 * @param {string} href
	 */
	function classesActive(href) {
		href === $page.url.pathname ? 'variant-filled-primary' : 'variant-ghost-primary';
	}

	function clickHandler() {
		const nav = document.getElementById('menu-content');
		if (nav != null) {
			if (nav.style.display === 'none') {
				nav.style.display = 'block';
			} else {
				nav.style.display = 'none';
			}
		}
	}

	onMount(() => {
		const handleResize = () => {
			const nav = document.getElementById('menu-content');
			if (nav != null) {
				if (window.innerWidth > 1024) {
					nav.style.display = 'flex';
				} else {
					nav.style.display = 'none';
				}
			}
		};

		window.addEventListener('resize', handleResize);
	});
</script>

<div>
	<AppBar slotTrail="place-content-end">
		<svelte:fragment slot="lead">
			<div class="flex items-center justify-between flex-wrap">
				<div class="flex items-center flex-shrink-0 text-white mr-6">
					<a class="btn min-w-fit" href="/" data-sveltekit-preload-data="hover">
						<img src="/assets/logo.svg" alt="Auyer" width="30px" height="30px" />
					</a>
				</div>
				<div
					id="menu-content"
					class="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:block hidden"
				>
					<div class="text-sm lg:flex-grow">
						<a
							class="block lg:inline-block btn no-underline {classesActive('/posts')}"
							href="/posts"
							data-sveltekit-preload-data="hover"
						>
							Posts
						</a>
						<a
							class="block lg:inline-block btn no-underline {classesActive('/research')}"
							href="/research"
							data-sveltekit-preload-data="hover"
						>
							Research
						</a>
						<a
							class="block lg:inline-block btn no-underline {classesActive('/projects/kv')}"
							href="/projects"
							data-sveltekit-preload-data="hover">Projects</a
						>
						<!-- <a class="block lg:inline-block btn no-underline {classesActive('/about')}" href="/about" data-sveltekit-preload-data="hover" >About</a> -->
						<a
							class="block lg:inline-block btn no-underline {classesActive('/projects/github')}"
							href="https://github.com/auyer/">GitHub</a
						>
					</div>
				</div>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<div class="block lg:hidden">
				<button
					class="flex items-center px-3 py-2 rounded"
					aria-label="expand head menu"
					on:click={clickHandler}
				>
					<svg aria-label="expand head links icon" viewBox="0 0 100 80" class="fill-token w-4 h-4">
						<rect width="100" height="20" />
						<rect y="30" width="100" height="20" />
						<rect y="60" width="100" height="20" />
					</svg>
				</button>
			</div>
			<LightSwitch />
		</svelte:fragment>
	</AppBar>
</div>
