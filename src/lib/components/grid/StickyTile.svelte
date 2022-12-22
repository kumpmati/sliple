<script lang="ts">
	import type { StickyTile } from '$lib/types/grid';
	import Sticky from '../graphics/Sticky.svelte';
	import Tile from './Tile.svelte';

	export let tile: StickyTile;
</script>

<Tile {tile} zIndex={0}>
	<div class="sticky">
		<Sticky />
	</div>
</Tile>

<style lang="scss">
	.sticky {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: visible;
	}
</style>
