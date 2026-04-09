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

	// Close menu when navigating
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
				<img src="/assets/logo.svg" alt="Auyer" width="30" height="30" />
			</a>
		</li>
	</ul>

	<!-- Links (desktop: inline, mobile: dropdown) -->
	<ul class="nav-links" class:show={menuOpen}>
		<li>
			<a
				href="/posts"
				data-sveltekit-preload-data="hover"
				aria-current={isActive('/posts') ? 'page' : undefined}
			>
				Posts
			</a>
		</li>
		<li>
			<a
				href="/research"
				data-sveltekit-preload-data="hover"
				aria-current={isActive('/research') ? 'page' : undefined}
			>
				Research
			</a>
		</li>
		<li>
			<a
				href="/projects"
				data-sveltekit-preload-data="hover"
				aria-current={isActive('/projects') ? 'page' : undefined}
			>
				Projects
			</a>
		</li>
		<li>
			<a
				href="https://github.com/auyer/"
				aria-current={isActive('/projects/github') ? 'page' : undefined}
			>
				GitHub
			</a>
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
					width="24"
					height="24"
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

<style>
	/* Hamburger button */
	:global(.hamburger-btn) {
		padding: 0.25rem;
		min-height: auto;
		height: auto;
		border: none;
		background: transparent;
		cursor: pointer;
		color: var(--pico-color);
	}

	:global(.hamburger-btn:hover) {
		background-color: var(--pico-primary-hover);
		color: var(--pico-primary-inverse);
		border-radius: var(--pico-border-radius);
	}

	/* LightSwitch button sizing */
	:global(.navbar .btn-icon) {
		padding: 0.25rem;
		min-height: auto;
		height: auto;
	}
</style>
