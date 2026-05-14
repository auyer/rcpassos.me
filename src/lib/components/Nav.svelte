<script>
	import { page } from '$app/stores';
	import LightSwitch from './LightSwitch.svelte';

	/**
	 * @param {string} href
	 */
	function isActive(href) {
		return href === $page.url.pathname;
	}

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	$effect(() => {
		const currentPath = $page.url.pathname;
		if (currentPath) {
			menuOpen = false;
		}
	});
</script>

<nav class="navbar">
	<!-- Brand -->
	<ul>
		<li>
			<a href="/" data-sveltekit-preload-data="hover" class="navbar-brand">
				<img src="/assets/logo.svg" alt="Auyer" width="24" height="24" />
				<span class="cursor-block"></span>
			</a>
		</li>
	</ul>

	<!-- Links (desktop: inline, mobile: dropdown) -->
	<ul class="nav-links" class:show={menuOpen}>
		<li>
			<a
				href="/posts"
				data-sveltekit-preload-data="hover"
				aria-current={isActive('/posts') ? 'page' : undefined}>Posts</a
			>
		</li>
		<li>
			<a
				href="/research"
				data-sveltekit-preload-data="hover"
				aria-current={isActive('/research') ? 'page' : undefined}>Research</a
			>
		</li>
		<li>
			<a
				href="/projects"
				data-sveltekit-preload-data="hover"
				aria-current={isActive('/projects') ? 'page' : undefined}>Projects</a
			>
		</li>
		<li>
			<a
				href="/home-lab"
				data-sveltekit-preload-data="hover"
				aria-current={isActive('/home-lab') ? 'page' : undefined}>Home-Lab</a
			>
		</li>
		<li>
			<a
				href="https://github.com/auyer/"
				aria-current={isActive('/projects/github') ? 'page' : undefined}>GitHub</a
			>
		</li>
	</ul>

	<!-- Trail: hamburger + theme toggle -->
	<ul>
		<li class="nav-mobile-toggle">
			<button
				class="hamburger-btn"
				aria-label="Toggle menu"
				aria-expanded={menuOpen}
				onclick={toggleMenu}
			>
				<svg
					viewBox="0 0 24 24"
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="3" y1="6" x2="21" y2="6" />
					<line x1="3" y1="12" x2="21" y2="12" />
					<line x1="3" y1="18" x2="21" y2="18" />
				</svg>
			</button>
		</li>
		<li>
			<LightSwitch />
		</li>
	</ul>
</nav>
