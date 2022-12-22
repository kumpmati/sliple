<script lang="ts">
	import { GRID_CELL_SIZE } from '$lib/constants/grid';
	import type { Tile } from '$lib/types/grid';
	import { expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let tile: Tile;
	export let movable = false;
	export let zIndex = 0;

	const x = tweened(tile.x, { duration: 200, easing: expoOut });
	const y = tweened(tile.y, { duration: 200, easing: expoOut });

	// make sure values change when tile is updated
	$: $x = tile.x;
	$: $y = tile.y;
</script>

<g
	class="tile"
	transform="translate({$x * GRID_CELL_SIZE}, {$y * GRID_CELL_SIZE})"
	width={GRID_CELL_SIZE}
	height={GRID_CELL_SIZE}
	data-tile-id={tile.id}
	class:movable
	style:z-index={zIndex}
>
	<slot />
</g>

<style lang="scss">
	.tile {
		transition: all 100ms;
		pointer-events: none;

		&.movable {
			pointer-events: all;
		}
	}
</style>
