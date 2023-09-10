<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? 'variant-filled-primary' : 'variant-ghost-primary';

	$: classesActiveContains = (href: string) =>
		$page.url.pathname.includes(href) ? 'variant-filled-primary' : 'variant-ghost-primary';

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
		<!-- <button class="btn variant-ghost-primary justify-between" on:click={clickHandler}>
      <span> Projects</span>
      <span>↓</span>
    </button> -->
		<!-- <div class="{isExpanded}"> -->
		<!-- <ul class="list">
        <li> -->
		<a
			class="btn no-underline {classesActive('/projects/kv')}"
			href="/projects/kv"
			data-sveltekit-preload-data="hover"
			on:click={clickHandler}>MemoryKV</a
		>
		<!-- </li>
        <li> -->
		<a
			class="btn no-underline {classesActive('/projects/github')}"
			href="https://github.com/auyer/"
			on:click={clickHandler}>GitHub</a
		>
		<!-- </li>
      </ul> -->
		<!-- </div> -->

		<svelte:fragment slot="trail">
			<LightSwitch />
		</svelte:fragment>
	</AppBar>
</div>
