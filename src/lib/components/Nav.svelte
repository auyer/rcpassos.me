<script>
	import { page } from '$app/stores';
	import LightSwitch from './LightSwitch.svelte';
	import { onMount } from 'svelte';

	/**
	 * @param {string} href
	 */
	function classesActive(href) {
		return href === $page.url.pathname ? 'active' : '';
	}

	function clickHandler() {
		const nav = document.getElementById('menu-content');
		if (nav != null) {
			nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
		}
	}

	onMount(() => {
		const handleResize = () => {
			const nav = document.getElementById('menu-content');
			if (nav != null) {
				nav.style.display = window.innerWidth > 1024 ? 'flex' : 'none';
			}
		};

		window.addEventListener('resize', handleResize);
	});
</script>

<nav>
	<ul>
		<li class="nav-brand">
			<a href="/" data-sveltekit-preload-data="hover">
				<img src="/assets/logo.svg" alt="Auyer" width="30px" height="30px" />
			</a>
		</li>
	</ul>
</nav>

<div
	id="menu-content"
	class="nav-links"
>
	<nav>
		<ul>
			<li>
				<a
					class="{classesActive('/posts')}"
					href="/posts"
					data-sveltekit-preload-data="hover"
				>
					Posts
				</a>
			</li>
			<li>
				<a
					class="{classesActive('/research')}"
					href="/research"
					data-sveltekit-preload-data="hover"
				>
					Research
				</a>
			</li>
			<li>
				<a
					class="{classesActive('/projects/kv')}"
					href="/projects"
					data-sveltekit-preload-data="hover">Projects</a
				>
			</li>
			<li>
				<a
					class="{classesActive('/projects/github')}"
					href="https://github.com/auyer/">GitHub</a
				>
			</li>
		</ul>
	</nav>
</div>

<div class="nav-trail">
	<button
		class="btn-icon hamburger-btn"
		aria-label="expand head menu"
		onclick={clickHandler}
	>
		<svg aria-label="expand head links icon" viewBox="0 0 100 80" class="social-icon">
			<rect width="100" height="20" />
			<rect y="30" width="100" height="20" />
			<rect y="60" width="100" height="20" />
		</svg>
	</button>
	<LightSwitch />
</div>

<style>
	/* Navigation layout */
	:global(nav) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
	}

	:global(.nav-brand) {
		flex-shrink: 0;
	}

	:global(.nav-links) {
		display: none;
	}

	:global(.nav-trail) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.hamburger-btn) {
		display: block;
	}

	@media (min-width: 1024px) {
		:global(.nav-links) {
			display: block !important;
		}

		:global(.hamburger-btn) {
			display: none;
		}
	}

	/* Active link styling */
	:global(a.active) {
		background-color: var(--pico-primary);
		color: var(--pico-primary-inverse);
	}

	:global(nav ul) {
		gap: 0.25rem;
	}
</style>
