<script>
	import { website, name, bio, avatar_avif } from '$lib/info.js';
	import ToC from '$lib/components/ToC.svelte';
	import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { afterNavigate } from '$app/navigation';
	import PostDate from '$lib/components/PostDate.svelte';

	
	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();

	// generated open-graph image for sharing on social media.
	// see https://og-image.vercel.app/ for more options.
	const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
		data.post.title
	)}**?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;

	const url = `${website}/${data.post.slug}`;

	// if we came from /posts, we will use history to go back to preserve
	// posts pagination
	let canGoBack = $state(false);
	afterNavigate(({ from }) => {
		if (from && from.url.pathname.startsWith('/posts')) {
			canGoBack = true;
		}
	});

	function goBack() {
		if (canGoBack) {
			history.back();
		}
	}
</script>

<svelte:head>
	<title>{data.post.title} - {name}</title>
	<meta name="description" content={data.post.preview.text} />
	<meta name="author" content={name} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.preview.text} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={website} />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.preview.text} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="flex mx-auto lg:max-w-none">
	<div class="hidden lg:w-1/6 lg:block pt-8">
		<div class="sticky top-0 w-full flex justify-end pt-11 pr-8">
			<svelte:element
				this={canGoBack ? 'button' : 'a'}
				tabindex="0"
				role="button"
				aria-pressed="false"
				class="items-center justify-center hidden w-10 h-10 mb-8 transition bg-white rounded-full shadow-md -top-1 -left-16 lg:flex group shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:focus-visible:ring-2 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
				href={canGoBack ? undefined : '/posts'}
				aria-label="Go back to posts"
				onclick={goBack}
				onkeydown={goBack}
			>
				<ArrowLeftIcon
					class="w-4 h-4 transition stroke-zinc-500 group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
				/>
			</svelte:element>
		</div>
	</div>

	<div class="w-full justify-center lg:w-4/6 mx-auto overflow-x-hidden">
		<article class="prose max-w-none">
			<header class="flex flex-col">
				<h1
					class="mt-4 font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-2xl lg:text-4xl md:text-3xl"
				>
					{data.post.title}
				</h1>
				<PostDate class="text-sm sm:text-base" post={data.post} decorate collapsed />
			</header>

			<!-- render the post -->
			<div class="prose max-w-5xl dark:prose-invert">
				<data.component />
			</div>
		</article>

		<!-- bio -->
		<hr />
		<div class="py-8">
			<div class="grid gap-8">
				<div class="flex justify-center order-1 col-span-2 gap-6 md:order-2">
					<SocialLinks />
				</div>
				<div class="flex justify-center order-2 md:order-1 md:col-span-2">
					<a href="/" class="inline-block rounded-full">
						<img
							src={avatar_avif}
							alt={name}
							class="w-24 h-24 mx-auto rounded-full md:w-28 md:h-28 ring-2 ring-zinc-200 dark:ring-zinc-700"
						/>
					</a>
				</div>
				<p class="order-3 text-base text-zinc-600 dark:text-zinc-400">
					{bio}
				</p>
			</div>
		</div>
	</div>

	<!-- table of contents -->
	<div class="hidden items-start xl:w-2/6 lg:w-fit xl:block pt-10">
		{#if data.post.headings.length > 0}
			<aside class="sticky hidden w-48 ml-8 xl:block top-8" aria-label="Table of Contents">
				<ToC post={data.post} />
			</aside>
		{/if}
	</div>
</div>
