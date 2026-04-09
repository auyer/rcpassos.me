<script>
	import { linkedin, github, stackoverflow, medium, bluesky, xmpp } from '$lib/info';
</script>

{#if xmpp}
	<a href={`${xmpp}`} class="social-link" aria-label="Contact me on XMPP">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			xml:space="preserve"
			viewBox="0 0 200 200"
			width="24px"
			height="24px"
			x="0px"
			y="0px"
			enable-background="new 0 0 200 200"
		>
			<style>
				path {
					fill: var(--pico-color);
				}
			</style>
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
				d="m 25.988,172.07799 -13.388,-14.65 h 11.643 l 9.127,10.268 9.129,-10.268 h 11.643 l -13.387,14.646 14.401,14.728 h -12.09 l -9.697,-10.67 -9.693,10.67 H 11.584 l 14.404,-14.73 z"
			/>
			<path
				d="m 58.508,157.42799 h 13.836 l 10.183,18.905 10.183,-18.905 h 13.83199 v 29.374 h -8.761983 v -21.096 h -0.08 L 85.893,186.80199 H 79.16 l -11.807,-21.096 h -0.082 v 21.096 h -8.764 v -29.37 z"
			/>
			<path
				d="m 112.66199,157.42799 h 24.546 c 8.559,0 10.628,4.302 10.628,10.063 v 2.516 c 0,4.381 -1.908,9.41 -8.275,9.41 h -17.894 v 7.385 h -9.005 v -29.38 z m 9,14.69 h 13.997 c 2.10901,0 2.92401,-1.377 2.92401,-3.123 v -1.135 c 0,-1.99 -0.976,-3.127 -3.694,-3.127 h -13.227 v 7.38 z"
			/>
			<path
				d="m 152.72199,157.42799 h 24.546 c 8.561,0 10.63,4.302 10.63,10.063 v 2.516 c 0,4.381 -1.907,9.41 -8.275,9.41 h -17.893 v 7.385 h -9.008 v -29.38 z m 9.01,14.69 h 13.996 c 2.11,0 2.922,-1.377 2.922,-3.123 v -1.135 c 0,-1.99 -0.974,-3.127 -3.693,-3.127 h -13.225 v 7.38 z"
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

{#if stackoverflow}
	<a
		href={`https://stackoverflow.com/users/${stackoverflow}`}
		class="social-link"
		aria-label="Check me on StackOverflow"
	>
		<svg
			class="social-icon"
			style="height:1em;vertical-align:-.125em;transform-origin:center;overflow:visible"
			viewBox="0 0 384 512"
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

{#if bluesky}
	<a
		href={`https://bsky.app/profile/${bluesky}`}
		class="social-link"
		aria-label="Check me on BlueSky"
	>
		<svg
			class="social-icon"
			style="height:1em;vertical-align:-.125em;transform-origin:center;overflow:visible"
			viewBox="0 0 640 512"
			aria-hidden="true"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.039C285.169 375.812 284.017 372.431 284 375.306C283.983 372.431 282.831 375.812 280.369 383.039C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z"
				fill="currentColor"
			/>
		</svg>
	</a>
{/if}

{#if medium}
	<a href={`https://medium.com/${medium}`} class="social-link" aria-label="Check me on Medium">
		<svg
			class="social-icon"
			style="height:1em;vertical-align:-.125em;transform-origin:center;overflow:visible"
			viewBox="0 0 640 512"
			aria-hidden="true"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			><g transform="translate(320 256)" transform-origin="160 0"
				><g transform="translate(0,0) scale(1,1)"
					><path
						d="M180.5 74.26C80.81 74.26 0 155.6 0 256S80.82 437.7 180.5 437.7 361 356.4 361 256 280.2 74.26 180.5 74.26zm288.3 10.65c-49.85 0-90.25 76.62-90.25 171.1s40.41 171.1 90.25 171.1 90.25-76.62 90.25-171.1H559C559 161.5 518.6 84.91 468.8 84.91zm139.5 17.82c-17.53 0-31.74 68.63-31.74 153.3s14.2 153.3 31.74 153.3S640 340.6 640 256C640 171.4 625.8 102.7 608.3 102.7z"
						fill="currentColor"
						transform="translate(-320 -256)"
					/></g
				></g
			></svg
		>
	</a>
{/if}

<style>
	:global(.social-link) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: color 0.15s ease-in-out;
		color: var(--pico-muted-color);
	}

	:global(.social-link:hover) {
		color: var(--pico-color);
	}

	:global(.social-icon) {
		width: 1.5rem;
		height: 1.5rem;
		color: inherit;
	}
</style>
