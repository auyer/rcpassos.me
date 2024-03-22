<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Card from './Card.svelte';

	export let post;

	let elements = [];
	let headings = post.headings;

	onMount(() => {
		updateHeadings();
		setActiveHeading();
	});

	let tocFullyVisible = true;
	// the current heading in view
	let activeHeading = headings[0];
	// a subset of headings that are visible in the toc
	// when scroling down, the headings will be ommited from the top
	let visibleHeadings = headings;

	let scrollY;

	function updateHeadings() {
		headings = post.headings;

		if (browser) {
			elements = headings.map((heading) => {
				return document.getElementById(heading.id);
			});
			console.log('elements', elements);
		}
	}
	function setActiveHeading() {
		scrollY = window.scrollY;

		const visibleIndex =
			elements.findIndex((element) => element.offsetTop + element.clientHeight > scrollY) - 1;

		activeHeading = headings[visibleIndex];

		const pageHeight = document.body.scrollHeight;
		const scrollProgress = (scrollY + window.innerHeight) / pageHeight;

		if (!activeHeading) {
			if (scrollProgress > 0.9) {
				activeHeading = headings[headings.length + 1];
			} else {
				activeHeading = headings[0];
			}
		}
		// if the active heading is below the 10th heading, start omitting headings from the top
		if (visibleIndex > 10) {
			tocFullyVisible = false;
			visibleHeadings = headings.slice(visibleIndex - 10);
		} else if (visibleIndex <= 10) {
			tocFullyVisible = true;
			visibleHeadings = headings;
		}
	}
</script>

<svelte:window on:scroll={setActiveHeading} />

<Card>
	<slot slot="description">
		<ul class="flex flex-col gap-2">
			<p>Table of Contents</p>
			{#if !tocFullyVisible}
				<li class="pl-2 text-zinc-500 dark:text-zinc-600">...</li>
			{/if}
			{#each visibleHeadings as heading}
				<li
					class="pl-2 transition-colors border-teal-500 heading text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
					class:active={activeHeading === heading}
					style={`--depth: ${
						// consider h1 and h2 at the same depth, as h1 will only be used for page title
						Math.max(0, heading.depth - 1)
					}`}
				>
					• <a href={`#${heading.id}`}>{heading.value}</a>
				</li>
			{/each}
		</ul>
	</slot>
</Card>

<style lang="postcss">
	.heading {
		padding-left: calc(var(--depth, 0) * 0.35rem);
	}

	.active {
		@apply font-medium text-slate-900 border-l-2 -ml-[2px];
	}

	/* can't use dark: modifier in @apply */
	:global(.dark) .active {
		@apply text-slate-100;
	}
</style>
