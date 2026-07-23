<script>
	import {
		linkedin,
		github,
		stackoverflow,
		xmpp,
		debian,
		gitlab,
		mastodon,
		matrix,
		gpg
	} from '$lib/info';
</script>

<div class="social-links">
{#if xmpp}
	<a href={`${xmpp}`} class="social-link" aria-label="Contact me on XMPP">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			xml:space="preserve"
			viewBox="0 0 200 200"
			class="social-icon"
		>
			<linearGradient
				id="SVGID_right_"
				y2="1.279e-13"
				gradientUnits="userSpaceOnUse"
				x2="-1073.2"
				gradientTransform="translate(1196.604,15.368977)"
				y1="126.85"
				x1="-1073.2"
			>
				<stop stop-color="#1b3967" offset=".011" />
				<stop stop-color="#13b5ea" offset=".467" />
				<stop stop-color="#002b5c" offset=".9945" />
			</linearGradient>
			<linearGradient
				id="SVGID_left_"
				y2="1.279e-13"
				gradientUnits="userSpaceOnUse"
				x2="-1073.2"
				gradientTransform="matrix(-1,0,0,1,-994.78801,15.367977)"
				y1="126.85"
				x1="-1073.2"
			>
				<stop stop-color="#1b3967" offset=".011" />
				<stop stop-color="#13b5ea" offset=".467" />
				<stop stop-color="#002b5c" offset=".9945" />
			</linearGradient>
			<path
				d="m 151.80512,29.557978 c 0.077,1.313 -1.787,0.968 -1.787,2.293 0,38.551 -46.558,97.366012 -91.687985,108.730012 v 1.639 C 118.28313,136.69999 186.89012,74.419978 188.40012,15.369977 l -36.599,14.189001 z"
				style="fill:url(#SVGID_right_)"
			/>
			<path
				d="m 133.67312,34.300978 c 0.076,1.313 0.12,2.63 0.12,3.957 0,38.551 -30.69898,90.497012 -75.826985,101.860012 v 1.639 c 59.044005,-2.79 105.809995,-63.024012 105.809995,-109.200012 0,-2.375 -0.128,-4.729 -0.371,-7.056 l -29.73,8.798 z"
				style="fill:#e96d1f"
			/>
			<path
				d="m 163.69112,24.951978 -7.61699,2.722 c 0.041,0.962 0.066,2.254 0.066,3.225 0,41.219 -37.271,98.204012 -87.271995,107.120012 -3.24501,1.088 -7.53801,2.077 -10.932,2.931 v 1.638 C 123.19013,137.02799 169.03613,70.721978 163.69612,24.947978 Z"
				style="fill:#d9541e"
			/>
			<path
				d="m 50.011,29.556978 c -0.077,1.313 1.787,0.968 1.787,2.293 0,38.551 46.558007,97.366012 91.68799,108.730012 v 1.639 C 83.533,136.69899 14.926,74.418978 13.416,15.368977 l 36.599,14.189001 z"
				style="fill:url(#SVGID_left_)"
			/>
			<path
				d="m 68.143,34.299978 c -0.076,1.313 -0.12,2.63 -0.12,3.957 0,38.551 30.698995,90.497012 75.82699,101.860012 v 1.639 C 84.806,138.96599 38.04,78.731978 38.04,32.555978 c 0,-2.375 0.128,-4.729 0.371,-7.056 l 29.73,8.798 z"
				style="fill:#a0ce67"
			/>
			<path
				d="m 38.125,24.950978 7.617,2.722 c -0.041,0.962 -0.066,2.254 -0.066,3.225 0,41.219 37.271,98.204012 87.27199,107.120012 3.245,1.088 7.538,2.077 10.932,2.931 v 1.638 C 78.626,137.02699 32.78,70.720978 38.12,24.946978 Z"
				style="fill:#439639"
			/>
			<path
				fill="currentColor"
				d="m 25.988,172.07799 -13.388,-14.65 h 11.643 l 9.127,10.268 9.129,-10.268 h 11.643 l -13.387,14.646 14.401,14.728 h -12.09 l -9.697,-10.67 -9.693,10.67 H 11.584 l 14.404,-14.73 z"
			/>
			<path
				fill="currentColor"
				d="m 58.508,157.42799 h 13.836 l 10.183,18.905 10.183,-18.905 h 13.83199 v 29.374 h -8.761983 v -21.096 h -0.08 L 85.893,186.80199 H 79.16 l -11.807,-21.096 h -0.082 v 21.096 h -8.764 v -29.37 z"
			/>
			<path
				fill="currentColor"
				d="m 112.66199,157.42799 h 24.546 c 8.559,0 10.628,4.302 10.628,10.063 v 2.516 c 0,4.381 -1.908,9.41 -8.275,9.41 h -17.894 v 7.385 h -9.005 v -29.38 z m 9,14.69 h 13.997 c 2.10901,0 2.92401,-1.377 2.92401,-3.123 v -1.135 c 0,-1.99 -0.976,-3.127 -3.694,-3.127 h -13.227 v 7.38 z"
			/>
			<path
				fill="currentColor"
				d="m 152.72199,157.42799 h 24.546 c 8.561,0 10.63,4.302 10.63,10.063 v 2.516 c 0,4.381 -1.907,9.41 -8.275,9.41 h -17.893 v 7.385 h -9.008 v -29.38 z m 9.01,14.69 h 13.996 c 2.11,0 2.922,-1.377 2.922,-3.123 v -1.135 c 0,-1.99 -0.974,-3.127 -3.693,-3.127 h -13.225 v 7.38 z"
			/>
		</svg>
	</a>
{/if}

{#if matrix}
	<a href={`https://matrix.to/#/@${matrix}`} class="social-link" aria-label="Reach me on Matrix">
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 520 520"
			xml:space="preserve"
			class="social-icon"
		>
			<path d="M13.7,11.9v496.2h35.7V520H0V0h49.4v11.9H13.7z" />
			<path
				d="M166.3,169.2v25.1h0.7c6.7-9.6,14.8-17,24.2-22.2c9.4-5.3,20.3-7.9,32.5-7.9c11.7,0,22.4,2.3,32.1,6.8
            c9.7,4.5,17,12.6,22.1,24c5.5-8.1,13-15.3,22.4-21.5c9.4-6.2,20.6-9.3,33.5-9.3c9.8,0,18.9,1.2,27.3,3.6c8.4,2.4,15.5,6.2,21.5,11.5
            c6,5.3,10.6,12.1,14,20.6c3.3,8.5,5,18.7,5,30.7v124.1h-50.9V249.6c0-6.2-0.2-12.1-0.7-17.6c-0.5-5.5-1.8-10.3-3.9-14.3
            c-2.2-4.1-5.3-7.3-9.5-9.7c-4.2-2.4-9.9-3.6-17-3.6c-7.2,0-13,1.4-17.4,4.1c-4.4,2.8-7.9,6.3-10.4,10.8c-2.5,4.4-4.2,9.4-5,15.1
            c-0.8,5.6-1.3,11.3-1.3,17v103.3h-50.9v-104c0-5.5-0.1-10.9-0.4-16.3c-0.2-5.4-1.3-10.3-3.1-14.9c-1.8-4.5-4.8-8.2-9-10.9
            c-4.2-2.7-10.3-4.1-18.5-4.1c-2.4,0-5.6,0.5-9.5,1.6c-3.9,1.1-7.8,3.1-11.5,6.1c-3.7,3-6.9,7.3-9.5,12.9c-2.6,5.6-3.9,13-3.9,22.1
            v107.6h-50.9V169.2H166.3z"
			/>
			<path d="M506.3,508.1V11.9h-35.7V0H520v520h-49.4v-11.9H506.3z" />
		</svg>
	</a>
{/if}

{#if linkedin}
	<a
		href={`https://www.linkedin.com/in/${linkedin}`}
		class="social-link"
		aria-label="Follow on LinkedIn"
	>
		<svg viewBox="0 0 24 24" class="social-icon">
			<path
				d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
				fill="currentColor"
			/>
		</svg>
	</a>
{/if}
{#if debian}
	<a href={debian} class="social-link" aria-label="Check my contributions to Debian">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Debian"
			role="img"
			viewBox="0 0 512 512"
			class="social-icon debian-icon"
			><path
				d="M388 225c.4 11-3 17-6 27-10 3-8 14-9 17-6 3-35 34-25 17-10 7-8 10-24 15l-.4-1c-39 18-94-18-94-68-.4 3-1 2-2 3-1-56 64-88 102-54-25-29-78-31-96 4-10 6-12 26-16 29-5 88 75 145 150 78 8-6 16-16 19-17-3 5.7.6 2-2 7 6-10 1-31 12-16.2.8-19 22-58 11-23 3-12 1-36 6-14-3-12 3-21 5-28-6-15-18-43-4-23-29-60 1-35 12 5-1-10.81-4.9-21.2-8-31 2 1-4-22 3-6-9-33-38-62-65-78 18 18-52-15-69-21 12 7-61 7-20.5.8-14-1-32 4-15-5-10.8.6-25 6-21 1-21 11-85 54-67 31-23 21-37 36-49 64-79 111-2 278 123 325 11 4 29 4 44 4-17-5-20-2-37-8-12-5-15-12-24-20-.7 8-24-.5-16-10-5-.4-14-9-17-14-9 2-17-14-17-20-1 3-37-33-16-23-5-5-12-6-6-12-5-14-18-20-3-15-22-15-35-39-25-40-5-6-5-11-4-19-17-37 1-83 14-114-21 2 38-50 54-50-2-8 11-18 27-23-1-1 56-26 32-8 67-22 141 36 145 96 4 1-.5 45-1 48"
				fill="#d70a53"
			/></svg
		>
	</a>
{/if}

{#if gitlab}
	<a href={gitlab} class="social-link" aria-label="Check me on GitLab">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 380" class="social-icon gitlab-icon">
			<path
				d="M282.83,170.73l-.27-.69-26.14-68.22a6.81,6.81,0,0,0-2.69-3.24,7,7,0,0,0-8,.43,7,7,0,0,0-2.32,3.52l-17.65,54H154.29l-17.65-54A6.86,6.86,0,0,0,134.32,99a7,7,0,0,0-8-.43,6.87,6.87,0,0,0-2.69,3.24L97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82,19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91,40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z"
				fill="currentColor"
			/>
		</svg>
	</a>
{/if}

{#if github}
	<a href={`https://github.com/${github}`} class="social-link" aria-label="Follow on GitHub">
		<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
				fill="currentColor"
			/>
		</svg>
	</a>
{/if}

{#if mastodon}
	<a rel="me" href={mastodon} class="social-link" aria-label="Check me on Mastodon">
		<svg
			class="social-icon"
			style="height:1em;vertical-align:-.125em;transform-origin:center;overflow:visible"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			viewBox="0 80 250 250"
		>
			<path
				d="m409 290c-5 24-43 50-85 56-86 11-137-6-137-6 3 13-4 54 70 52 31 0 58-7 58-7l2 27c-51 24-107 15-140 6-67-17-79-90-81-162v-59c0-74 49-96 49-96 50-24 180-22 222 0 0 0 49 22 49 96 0 0 1 55-7 93"
				fill="currentColor"
			/>
			<path
				d="m358 202v91h-35v-88c0-18-8-27-23-27-18 0-27 11-27 33v47h-34v-47c0-22-9-33-27-33-15 0-23 9-23 27v88h-35v-91c0-18 5-60 52-60 39 0 50 37 50 37s10-37 50-37c45 0 52 42 52 60"
				fill="#ffffff"
			/>
		</svg>
	</a>
{/if}

{#if stackoverflow}
	<a
		href={`https://stackoverflow.com/users/${stackoverflow}`}
		class="social-link"
		aria-label="Check me on StackOverflow"
	>
		<svg
			class="social-icon"
			style="height:1em;vertical-align:-.125em;transform-origin:center;overflow:visible"
			viewBox="0 0 412 412"
			aria-hidden="true"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			><g transform="translate(192 256)" transform-origin="96 0"
				><g transform="translate(0,0) scale(1,1)"
					><path
						d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"
						fill="currentColor"
						transform="translate(-192 -256)"
					/></g
				></g
			></svg
		>
	</a>
{/if}

{#if gpg}
	<a href={`/files/${gpg}`} download={gpg} class="gpg-label" aria-label="Download my GPG Key">
		[GPG]
	</a>
{/if}
</div>

<style>
	.social-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	@media (min-width: 480px) {
		.social-links {
			gap: 1.5rem;
		}
	}

	.social-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: color 0.15s ease-in-out;
		color: var(--terminal-fg2);
	}

	.social-link:hover {
		color: var(--terminal-fg);
	}

	.social-icon {
		width: clamp(1.125rem, 4vw, 1.5rem);
		height: clamp(1.125rem, 4vw, 1.5rem);
		color: inherit;
	}

	.gitlab-icon {
		width: clamp(1.3rem, 4.5vw, 1.7rem);
		height: clamp(1.3rem, 4.5vw, 1.7rem);
	}

	.debian-icon {
		width: clamp(1.3rem, 4.5vw, 1.7rem);
		height: clamp(1.3rem, 4.5vw, 1.7rem);
	}

	.gpg-label {
		font-weight: 600;
		font-size: clamp(0.75rem, 3vw, 1rem);
		color: var(--pico-color);
	}
</style>
