<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { Tile } from '$lib/types/grid';
	import { getContext } from 'svelte';

	export let tile: Tile;
	export let movable = false;
	export let zIndex = 0;

	const store = getContext('grid') as GridStore;

	$: xPos = (tile.x / $store.width) * 100;
	$: yPos = (tile.y / $store.height) * 100;
</script>

<div
	class="tile"
	class:movable
	data-id={tile.id}
	style:left="{xPos}%"
	style:top="{yPos}%"
	style:width="{(1 / $store.width) * 100}%"
	style:height="{(1 / $store.height) * 100}%"
	style:z-index={zIndex}
>
	<slot />
</div>

<style lang="scss">
	.tile {
		position: absolute;
		display: grid;
		place-content: center;
		transition: left 200ms, top 200ms, transform 100ms;
		pointer-events: none;
		user-select: none;

		&.movable {
			pointer-events: all;

			&:active {
				transform: scale(0.95);
			}
		}
	}
</style>
