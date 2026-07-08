<script>
	import pdfUrl from './lkml5ws-icsme2026-preprint.pdf?url';
</script>

<svelte:head>
	<title>Research | LKML5Ws: The What, When, Who, Where, and Why in the Linux Kernel Mailing Lists</title>
</svelte:head>

<div class="research-article">
	<article class="prose">
		<header class="research-header">
			<h1>LKML5Ws: The What, When, Who, Where, and Why in the Linux Kernel Mailing Lists</h1>
		</header>
		<p>This article was accepted by the IEEE ICSME 2026, Tool Demonstration and Data Showcase Track.</p>
		<!-- <p> -->
		<!-- 	Published by IEEE: <a href="https://doi.org/10.1109/VISSOFT67405.2025.00025" -->
		<!-- 		>10.1109/VISSOFT67405.2025.00025</a -->
		<!-- 	> -->
		<!-- </p> -->
        <p><a href="https://conf.researchr.org/details/icsme-2026/icsme-2026-tool-demonstration/18/LKML5Ws-The-What-When-Who-Where-and-Why-in-the-Linux-Kernel-Mailing-Lists">Conference Page</a></p>
		<p>
            The Linux kernel uses mailing lists as the primary medium for all development, bug reporting, and pivotal discussions regarding the project’s future, a practice also observed in other large and long-lived Free Software projects.
            However, as a consequence of the decentralized development model used for the Linux kernel, these emails are spread across hundreds of mailing lists, each with different communities and maintenance models.
            We present the LKML5Ws dataset and our MailingListsHeritage tool, developed to create and maintain mailing list archives.
            With over 30 million emails from 350 different mailing lists, our massive relational dataset provides a comprehensive overview of the last 30 years of Linux kernel development.
            Beyond shedding light on the awe-inspiring number of patches, discussions, and contributors involved in the project, our dataset provides a foundation for those interested in studying the intricate, knowledge-rich nature of Linux kernel development.
		</p>
		<embed src={pdfUrl} type="application/pdf" class="pdf-embed" height="1200px" />
		<p>
			© 2026 IEEE. Personal use of this material is permitted. Permission from IEEE must be obtained
			for all other uses, in any current or future media, including reprinting/republishing this
			material for advertising or promotional purposes, creating new collective works, for resale or
			redistribution to servers or lists, or reuse of any copyrighted component of this work in
			other works. 
			<!--          DOI: <a href="https://doi.org/10.1109/VISSOFT67405.2025.00025" -->
			<!-- 	>10.1109/VISSOFT67405.2025.00025</a -->
			<!-- > -->
		</p>
	</article>
</div>

<style>
	:global(.research-article) {
		width: 100%;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		overflow-x: hidden;
	}

	@media (min-width: 1024px) {
		:global(.research-article) {
			width: 66.666667%;
		}
	}

	:global(.research-header) {
		display: flex;
		flex-direction: column;
	}

	:global(.pdf-embed) {
		width: 100%;
	}
</style>
