<script lang="ts">
	import type { HeavyTile } from '$lib/types/grid';
	import TileWrapper from './TileWrapper.svelte';
	import HeavyGraphic from '$lib/components/graphics/HeavyGraphic.svelte';

	export let tile: HeavyTile;
</script>

<TileWrapper {tile}>
	<HeavyGraphic id={tile.id} />
</TileWrapper>
