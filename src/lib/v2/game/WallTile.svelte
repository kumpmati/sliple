<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let props: SVGAttributes<SVGElement> = $props();
</script>

<svg
	width="64"
	height="64"
	viewBox="0 0 64 64"
	fill="none"
	class="overflow-visible"
	xmlns="http://www.w3.org/2000/svg"
	{...props}
>
	<rect width="64" height="64" rx="16" fill="#64748B" />

	<g clip-path="url(#clip0_733_350)" transform="translate(0,-6)">
		<rect width="64" height="64" rx="16" fill="#94A3B8" />
		<path
			d="M0 16H15.622M31.2441 16H47.622M31.2441 16H15.622M31.2441 16V0M64 16H47.622M47.622 16V48M47.622 48H64M47.622 48H31.622M15.622 16V48M15.622 48H0M15.622 48H31.622M31.622 48V64"
			stroke="#64748B"
			stroke-width="2"
		/>

		<rect
			x="1"
			y="1"
			width="62"
			height="62"
			rx="15"
			stroke="#CBD5E1"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</g>

	<defs>
		<clipPath id="clip0_733_350">
			<rect width="64" height="64" rx="16" fill="white" />
		</clipPath>
	</defs>
</svg>
