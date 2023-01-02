<script lang="ts">
	import type { Grid, Tile } from '$lib/types/grid';
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import type { Writable } from 'svelte/store';
	import GridContainer from '../graphics/GridContainer.svelte';
	import Goal from '../grid/tiles/Goal.svelte';
	import Letter from '../grid/tiles/Letter.svelte';
	import Sticky from '../grid/tiles/Sticky.svelte';
	import Wall from '../grid/tiles/Wall.svelte';

	export let editor: Writable<Grid>;

	// letters should be the last items to be drawn,
	// so that they are drawn on top of every other tile.
	const sortTiles = (a: Tile) => (a.type === 'letter' ? 1 : -1);
</script>

<div class="grid">
	<GridContainer width={$editor.width} height={$editor.height}>
		<!-- Grid points -->
		{#each new Array($editor.width + 1) as _, x}
			{#each new Array($editor.height + 1) as _, y}
				<circle cx={x * 68} cy={y * 68} r="2" fill="var(--gray-light)" />
			{/each}
		{/each}

		<!-- Tiles -->
		{#each $editor.tiles.sort(sortTiles) as tile (tile.id)}
			<g>
				{#if isLetterTile(tile)}
					<Letter {tile} />
				{:else if isGoalTile(tile)}
					<Goal {tile} />
				{:else if isWallTile(tile)}
					<Wall {tile} />
				{:else if isStickyTile(tile)}
					<Sticky {tile} />
				{/if}
			</g>
		{/each}
	</GridContainer>
</div>

<style lang="scss">
	.grid {
		margin-top: 50px;
		padding: 4px;
		max-width: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--border-radius-big);
	}
</style>
