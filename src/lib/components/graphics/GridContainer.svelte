<script lang="ts">
	export let width: number;
	export let height: number;
	export let style = '';
</script>

<svg
	width="100%"
	viewBox="0 0 {width * 68} {height * 68}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style:max-width="{width * 68}px"
	style:max-height="{height * 68}px"
	{style}
>
	<rect
		x={-5}
		y={-5}
		width={width * 68 + 10}
		height={height * 68 + 10}
		rx="17.5"
		fill="var(--white)"
		stroke="var(--black)"
		stroke-opacity="0.25"
		stroke-width="2"
	/>

	<slot />
</svg>

<style lang="scss">
	svg {
		overflow: visible;
		position: relative;
	}
</style>
