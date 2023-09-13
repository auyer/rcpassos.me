<script lang="js">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	/**
	 * @param {string} href
	 */
	function classesActive(href) {
		href === $page.url.pathname ? 'variant-filled-primary' : 'variant-ghost-primary';
	}

	/**
	 * @param {string} href
	 */
	function classesActiveContains(href) {
		$page.url.pathname.includes(href) ? 'variant-filled-primary' : 'variant-ghost-primary';
	}

	let isExpanded = 'hidden';

	function clickHandler() {
		isExpanded === 'hidden' ? (isExpanded = '') : (isExpanded = 'hidden');
	}
</script>

<div>
	<AppBar slotTrail="place-content-end">
		<svelte:fragment slot="lead">
			<a class="btn min-w-fit" href="/" data-sveltekit-preload-data="hover">
				<img src="/assets/logo.svg" alt="Auyer" width="30px" height="30px" />
			</a>
		</svelte:fragment>
		<a
			class="btn no-underline {classesActive('/about')}"
			href="/about"
			data-sveltekit-preload-data="hover"
		>
			About
		</a>
		<a
			class="btn no-underline {classesActive('/posts')}"
			href="/posts"
			data-sveltekit-preload-data="hover"
		>
			Posts
		</a>
		<a
			class="btn no-underline {classesActive('/projects/kv')}"
			href="/projects/kv"
			data-sveltekit-preload-data="hover"
			on:click={clickHandler}>MemoryKV</a
		>
		<a
			class="btn no-underline {classesActive('/projects/github')}"
			href="https://github.com/auyer/"
			on:click={clickHandler}>GitHub</a
		>

		<svelte:fragment slot="trail">
			<LightSwitch />
		</svelte:fragment>
	</AppBar>
</div>
