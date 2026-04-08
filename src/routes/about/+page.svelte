<script>
	import { bio, name } from '$lib/info.js';
</script>

<svelte:head>
	<title>About: {name}</title>
	<meta name="description" content={bio} />
</svelte:head>
<br />
<container class="about-grid">
	<div>
		<container class="hero-container">
			<header class="hero">
				<img alt="Rafael in front of the sea" width="2592" height="1654" src="/assets/hero.avif" />
				<div class="gradient"></div>
				<div class="overlay"></div>
			</header>
		</container>

		<article class="about-article">
			<h1>Who am I</h1>

			<p class="about-paragraph">
				I am driven by an insatiable curiosity and a love for exploration. The quest for
				understanding is one of my greatest motivations in life.
			</p>

			<p class="about-paragraph">
				Regarding technology, I constantly explore and experiment with new programming languages,
				software, and projects, pushing my boundaries to learn and grow.
			</p>

			<p class="about-paragraph">
				I have a deep love for traveling. Discovering different places, cultures, and people from
				various backgrounds enriches my life.
			</p>

			<p class="about-paragraph">
				In essence, my journey as a curious person and explorer revolves around the pursuit of
				knowledge, new experiences, and the appreciation of the diverse world we inhabit.
			</p>
		</article>
		<br />
	</div>
	<div>
		<article class="about-article">
			<h1>As a professional</h1>
			<p class="about-paragraph">
				I am a software engineer with a keen and curious mind. Guided by reason, I am always eager
				to question and explore new ideas.
			</p>
			<p class="about-paragraph">
				I hold a Bachelor's Degree in Computer Science from IFB - <i
					>Instituto Federal de Brasília</i
				>
				(Federal Institute of Brasília), which has provided me with a strong academic foundation.
			</p>
			<p class="about-paragraph">
				Building trust in my workspace is crucial to me, as it enables me to propose and engage in
				constructive discussions about potential changes that can enhance our projects.
			</p>
			<p class="about-paragraph">
				My approach to work involves both the technical engineering aspects and the product
				development side, aiming to consistently improve the quality of the projects I am involved
				in.
			</p>
			<p class="about-paragraph">
				As part of my journey, I had the privilege of forming and leading a team of six talented
				individuals, comprising Data analysts and Data engineers. Taking on the role of the
				technical leader, we created and evolved a robust data platform that remains in use today.
			</p>
			<p class="about-paragraph">
				In summary, my journey as a software engineer has been driven by a deep sense of curiosity,
				a commitment to quality, and a continuous pursuit of growth and learning. I am dedicated to
				making meaningful contributions to the field of technology and to the success of the
				projects I undertake.
			</p>
		</article>
	</div>
</container>

<style>
	:global(.about-grid) {
		width: 100%;
		display: grid;
		gap: 6rem;
		max-width: 72rem;
		margin-left: auto;
		margin-right: auto;
	}

	@media (min-width: 768px) {
		:global(.about-grid) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 767px) {
		:global(.about-grid) {
			grid-template-columns: 1fr;
		}
	}

	:global(.hero-container) {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		width: 100%;
		max-width: 72rem;
		margin-left: auto;
		margin-right: auto;
	}

	:global(.about-article) {
		max-width: 65ch;
	}

	:global(.about-article h1) {
		font-size: 2.25rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.about-article p) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	:global(.about-paragraph) {
		text-align: justify;
	}

	:global(.about-paragraph.first-letter) {
		font-size: 3.75rem;
		font-weight: 700;
		margin-right: 0.75rem;
		float: left;
	}

	:global(.about-paragraph::first-letter) {
		font-size: 3.75rem;
		font-weight: 700;
		margin-right: 0.75rem;
		float: left;
	}
</style>
