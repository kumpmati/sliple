<script lang="ts">
	import type { WallTile } from '$lib/types/grid';
	import Tile from './Tile.svelte';

	export let tile: WallTile;
</script>

<Tile {tile}>
	<div class="wall" />
</Tile>

<style lang="scss">
	.wall {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		border: 2px solid rgba(0, 0, 0, 0.25);
		pointer-events: none;
		z-index: 0;
		background-color: gray;
	}
</style>
