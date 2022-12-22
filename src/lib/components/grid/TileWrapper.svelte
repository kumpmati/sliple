<script lang="ts">
	import type { Tile } from '$lib/types/grid';
	import { spring } from 'svelte/motion';

	export let tile: Tile;
	export let movable = false;
	export let zIndex = 0;

	const x = spring(tile.x, { stiffness: 0.25 });
	const y = spring(tile.y, { stiffness: 0.25 });

	// make sure values change when tile is updated
	$: $x = tile.x;
	$: $y = tile.y;
</script>

<g
	class="tile"
	transform="translate({$x * 64}, {$y * 64})"
	width={64}
	height={64}
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
