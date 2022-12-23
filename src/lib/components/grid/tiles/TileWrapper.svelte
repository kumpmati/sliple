<script lang="ts">
	import { GRID_CELL_SIZE } from '$lib/constants/grid';
	import type { Tile } from '$lib/types/grid';
	import { spring } from 'svelte/motion';

	export let tile: Tile;
	export let movable = false;
	export let zIndex = 0;

	const x = spring(tile.x, { stiffness: 0.25, damping: 0.6 });
	const y = spring(tile.y, { stiffness: 0.25, damping: 0.6 });

	// make sure values change when tile is updated
	$: $x = tile.x;
	$: $y = tile.y;
</script>

<g
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
	g {
		will-change: transform;
		pointer-events: none;

		&.movable {
			pointer-events: all;
		}
	}
</style>
