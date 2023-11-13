<script lang="ts">
	export let id: string;
</script>

<mask
	id="mask0_501_660"
	style="mask-type:alpha"
	maskUnits="userSpaceOnUse"
	x="2"
	y="2"
	width="60"
	height="60"
>
	<rect
		x="3"
		y="3"
		width="58"
		height="58"
		rx="4"
		fill="#B5B5B5"
		stroke="#7B7B7B"
		stroke-width="2"
	/>
</mask>
<g mask="url(#mask0_501_660)">
	<rect
		x="3"
		y="3"
		width="58"
		height="58"
		rx="4"
		fill="#C7C7C7"
		stroke="#9B9B9B"
		stroke-width="2"
		data-tile-id={id}
	/>
</g>
<mask
	id="mask1_501_660"
	style="mask-type:alpha"
	maskUnits="userSpaceOnUse"
	x="4"
	y="4"
	width="56"
	height="56"
>
	<rect x="4" y="4" width="56" height="56" rx="3" fill="#B5B5B5" />
</mask>
<g mask="url(#mask1_501_660)">
	<path
		d="M60 5L7 5C5.89543 5 5 5.89543 5 7L5 60"
		stroke="white"
		stroke-opacity="0.26"
		stroke-width="2"
	/>
	<path
		d="M6 59L57 59C58.1046 59 59 58.1046 59 57L59 6.00001"
		stroke="black"
		stroke-opacity="0.06"
		stroke-width="2"
	/>
</g>
<mask
	id="mask2_501_660"
	style="mask-type:alpha"
	maskUnits="userSpaceOnUse"
	x="4"
	y="4"
	width="56"
	height="56"
>
	<rect x="4" y="4" width="56" height="56" rx="3" fill="#B5B5B5" data-tile-id="moi" />
</mask>
<g mask="url(#mask2_501_660)">
	<path d="M36 -5L-5 37" stroke="white" stroke-opacity="0.25" stroke-width="2" />
	<path d="M69 28L31 68" stroke="white" stroke-opacity="0.5" stroke-width="4" />
	<path
		d="M48 -1L0 48"
		stroke="white"
		stroke-opacity="0.75"
		stroke-width="6"
		stroke-linejoin="bevel"
	/>
</g>

<style>
	path {
		pointer-events: none;
	}
</style>
