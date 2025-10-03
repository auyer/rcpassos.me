<script>
	import pdfUrl from './linux-kernel-with-duks-preprint.pdf?url';
</script>

<div class="w-full justify-center lg:w-4/6 mx-auto overflow-x-hidden">
	<article class="prose max-w-none">
		<header class="flex flex-col">
		<h1>Streamlining Analyses on the Linux Kernel with DUKS</h1>
		</header>
		<div class="prose max-w-5xl dark:prose-invert">
			<p>This article was accepted by the IEEE VISSOFT 2025, Visualization Challenge Track.</p>
			<p>
				DUKS an innovative framework that supports multiple visualizations and data analyses
				previously unsupported for the Linux kernel. Using the Linux kernel mainline as an example,
				we demonstrate how DUKS could provide valuable insights for understanding the health of the
				kernel maintainership model. By coupling information from the kernel git trees collected
				from the Software Heritage repository alongside authorship information shared in mailing
				lists, we envision DUKS as a cornerstone open-access utility to support analyses on the
				Linux kernel evolution and maintenance.
			</p>
			<embed src={pdfUrl} type="application/pdf" class="w-full" height="1200px" />
			<p>
				© 2025 IEEE. Personal use of this material is permitted. Permission from IEEE must be
				obtained for all other uses, in any current or future media, including
				reprinting/republishing this material for advertising or promotional purposes, creating new
				collective works, for resale or redistribution to servers or lists, or reuse of any
				copyrighted component of this work in other works.
			</p>
		</div>
	</article>
</div>
