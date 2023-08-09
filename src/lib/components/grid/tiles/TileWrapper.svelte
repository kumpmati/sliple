<script lang="ts">
	import { GRID_CELL_SIZE } from '$lib/constants/grid';
	import type { Tile } from '$lib/types/grid';
	import { expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let tile: Tile;

	const x = tweened(tile.x, { duration: 150, easing: expoOut });
	const y = tweened(tile.y, { duration: 150, easing: expoOut });

	// make sure values change when tile is updated
	$: $x = tile.x;
	$: $y = tile.y;
</script>

<g transform="translate({$x * GRID_CELL_SIZE}, {$y * GRID_CELL_SIZE})" data-tile-id={tile.id}>
	<slot />
</g>

<style lang="scss">
	g {
		pointer-events: all;

		// this is needed to keep animations smooth (especially on high refresh rate screens)
		will-change: transform;
	}
</style>
