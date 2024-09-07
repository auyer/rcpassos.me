<script>
	import { bio, name } from '$lib/info.js';
</script>

<svelte:head>
	<title>About: {name}</title>
	<meta name="description" content={bio} />
</svelte:head>
<br />
<container class="w-full mx-auto grid md:grid-cols-2 gap-24 sm:grid-cols-1 max-w-6xl">
	<div>
		<container class="flex flex-col flex-grow w-full mx-auto max-w-6xl">
			<header class="hero">
				<img alt="Rafael in front of the sea" width="2592" height="1654" src="/assets/hero.avif" />
				<div class="gradient" />
				<div class="overlay" />
			</header>
		</container>

		<article class="prose dark:prose-invert">
			<h1>Who am I</h1>

			<p
				class="py text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left"
			>
				I am driven by an insatiable curiosity and a love for exploration. The quest for
				understanding is one of my greatest motivations in life.
			</p>

			<p class="py text-justify">
				Regarding technology, I constantly explore and experiment with new programming languages,
				software, and projects, pushing my boundaries to learn and grow.
			</p>

			<p class="py text-justify">
				I have a deep love for traveling. Discovering different places, cultures, and people from
				various backgrounds enriches my life.
			</p>

			<p class="py text-justify">
				In essence, my journey as a curious person and explorer revolves around the pursuit of
				knowledge, new experiences, and the appreciation of the diverse world we inhabit.
			</p>
		</article>
		<br />
	</div>
	<div>
		<article class="prose dark:prose-invert">
			<h1>As a professional</h1>
			<p
				class="py text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left"
			>
				I am a software engineer with a keen and curious mind. Guided by reason, I am always eager
				to question and explore new ideas.
			</p>
			<p class="py text-justify">
				I hold a Bachelor's Degree in Computer Science from IFB - <i
					>Instituto Federal de Brasília</i
				>
				(Federal Institute of Brasília), which has provided me with a strong academic foundation.
			</p>
			<p class="py text-justify">
				Building trust in my workspace is crucial to me, as it enables me to propose and engage in
				constructive discussions about potential changes that can enhance our projects.
			</p>
			<p class="py text-justify">
				My approach to work involves both the technical engineering aspects and the product
				development side, aiming to consistently improve the quality of the projects I am involved
				in.
			</p>
			<p class="py text-justify">
				As part of my journey, I had the privilege of forming and leading a team of six talented
				individuals, comprising Data analysts and Data engineers. Taking on the role of the
				technical leader, we created and evolved a robust data platform that remains in use today.
			</p>
			<p class="py text-justify">
				In summary, my journey as a software engineer has been driven by a deep sense of curiosity,
				a commitment to quality, and a continuous pursuit of growth and learning. I am dedicated to
				making meaningful contributions to the field of technology and to the success of the
				projects I undertake.
			</p>
		</article>
	</div>
</container>

<style lang="scss">
	$w-s: 750px;
	.hero {
		position: relative;
		overflow: hidden;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
	}

	.gradient {
		background-image: url('/assets/mesh-gradient.avif');
		background-size: cover;
		pointer-events: none;
		mix-blend-mode: screen;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding-left: 2rem;

		@media (min-width: $w-s) {
			padding-left: 4rem;
		}
	}
</style>
