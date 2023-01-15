<script lang="ts">
	import { GRID_CELL_SIZE } from '$lib/constants/grid';
	import type { Direction } from '$lib/stores/grid';

	export let direction: Direction;

	const transform: Record<Direction, string> = {
		top: '180',
		left: '90',
		right: '270',
		bottom: '0'
	};
</script>

<g
	opacity="0.5"
	fill="transparent"
	transform="rotate({transform[direction]})"
	style:--size={GRID_CELL_SIZE}
>
	<path
		d="M20.3333 34.3333L32 46L43.6667 34.3333"
		stroke="#9747FF"
		stroke-width="5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M20.3333 18L32 29.6667L43.6667 18"
		stroke="#9747FF"
		stroke-width="5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</g>

<style>
	g {
		transform-origin: 34px 34px;
	}
</style>
