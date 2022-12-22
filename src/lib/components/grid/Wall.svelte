<script lang="ts">
	import type { WallTile } from '$lib/types/grid';
	import TileWrapper from './TileWrapper.svelte';

	export let tile: WallTile;
</script>

<TileWrapper {tile}>
	<rect
		x="1.5"
		y="1.5"
		width="59"
		height="59"
		rx="4.5"
		fill="#B5B5B5"
		stroke="#808080"
		stroke-width="3"
	/>
</TileWrapper>
