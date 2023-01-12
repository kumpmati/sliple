<script lang="ts">
	import { GRID_CELL_SIZE } from '$lib/constants/grid';

	export let width: number;
	export let height: number;
	export let style = '';
</script>

<svg
	width="100%"
	viewBox="0 0 {width * GRID_CELL_SIZE} {height * GRID_CELL_SIZE}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style:max-width="{width * GRID_CELL_SIZE}px"
	style:max-height="{height * GRID_CELL_SIZE}px"
	{style}
>
	<rect
		x={-5}
		y={-5}
		width={width * GRID_CELL_SIZE + 10}
		height={height * GRID_CELL_SIZE + 10}
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
