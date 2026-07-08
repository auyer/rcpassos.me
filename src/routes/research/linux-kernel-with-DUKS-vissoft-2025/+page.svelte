<script>
	import pdfUrl from './linux-kernel-with-duks-preprint.pdf?url';
</script>

<svelte:head>
	<title>Research | Streamlining Analyses on the Linux Kernel with DUKS</title>
</svelte:head>

<div class="research-article">
	<article class="prose">
		<header class="research-header">
			<h1>Streamlining Analyses on the Linux Kernel with DUKS</h1>
		</header>
		<p>This article was accepted by the IEEE VISSOFT 2025, Visualization Challenge Track.</p>
		<p>
			Published by IEEE: <a href="https://doi.org/10.1109/VISSOFT67405.2025.00025"
				>10.1109/VISSOFT67405.2025.00025</a
			>
		</p>
		<p>
			DUKS an innovative framework that supports multiple visualizations and data analyses
			previously unsupported for the Linux kernel. Using the Linux kernel mainline as an example, we
			demonstrate how DUKS could provide valuable insights for understanding the health of the
			kernel maintainership model. By coupling information from the kernel git trees collected from
			the Software Heritage repository alongside authorship information shared in mailing lists, we
			envision DUKS as a cornerstone open-access utility to support analyses on the Linux kernel
			evolution and maintenance.
		</p>
		<embed src={pdfUrl} type="application/pdf" class="pdf-embed" height="1200px" />
		<p>
			© 2025 IEEE. Personal use of this material is permitted. Permission from IEEE must be obtained
			for all other uses, in any current or future media, including reprinting/republishing this
			material for advertising or promotional purposes, creating new collective works, for resale or
			redistribution to servers or lists, or reuse of any copyrighted component of this work in
			other works. DOI: <a href="https://doi.org/10.1109/VISSOFT67405.2025.00025"
				>10.1109/VISSOFT67405.2025.00025</a
			>
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
