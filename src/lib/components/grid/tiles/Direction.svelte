<script lang="ts">
	import DirectionGraphic from '$lib/components/graphics/DirectionGraphic.svelte';
	import type { DirectionTile } from '$lib/types/grid';
	import TileWrapper from './TileWrapper.svelte';

	export let tile: DirectionTile;
</script>

<TileWrapper {tile}>
	<DirectionGraphic direction={tile.direction} />
</TileWrapper>
