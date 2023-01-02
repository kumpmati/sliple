<script lang="ts">
	import type { Grid, Tile } from '$lib/types/grid';
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import GoalGraphic from '../graphics/GoalGraphic.svelte';
	import LetterGraphic from '../graphics/LetterGraphic.svelte';
	import StickyGraphic from '../graphics/StickyGraphic.svelte';
	import WallGraphic from '../graphics/WallGraphic.svelte';

	export let editor: Writable<Grid>;

	let sortable: any;

	// letters should be the last items to be drawn,
	// so that they are drawn on top of every other tile.
	const sortTiles = (a: Tile) => (a.type === 'letter' ? 1 : -1);

	onMount(() => {
		Sortable.create(sortable, {
			group: {
				name: 'editor',
				put: true,
				pull: true
			}
		});
	});
</script>

<div class="grid" style:width="{$editor.width * 68}px" style:height="{$editor.height * 68}px">
	<!-- Grid points -->
	{#each new Array($editor.width + 1) as _, x}
		{#each new Array($editor.height + 1) as _, y}
			<div class="dot" style:left="{x * 68}px" style:top="{y * 68}px" />
		{/each}
	{/each}

	<div bind:this={sortable}>
		{#each new Array($editor.width) as _, x}
			{#each new Array($editor.height) as _, y}
				<div
					class="slot"
					data-x={x}
					data-y={y}
					style:left="{x * 68}px"
					style:top="{y * 68}px"
					style:width="68px"
					style:height="68px"
				/>
			{/each}
		{/each}
	</div>

	<!-- Tiles -->
	{#each $editor.tiles.sort(sortTiles) as tile (tile.id)}
		<div class="tile" style:left="{tile.x * 68}px" style:top="{tile.y * 68}px">
			<svg viewBox="0 0 68 68">
				{#if isLetterTile(tile)}
					<LetterGraphic letter={tile.letter} />
				{:else if isWallTile(tile)}
					<WallGraphic />
				{:else if isGoalTile(tile)}
					<GoalGraphic letter={tile.letter ?? '?'} />
				{:else if isStickyTile(tile)}
					<StickyGraphic />
				{/if}
			</svg>
		</div>
	{/each}
</div>

<style lang="scss">
	.grid {
		position: relative;
		margin-top: 50px;
		padding: 4px;
		max-width: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--border-radius-big);
		border: 2px solid var(--gray-light);
		overflow: hidden;
	}

	.dot {
		position: absolute;
		border: 1px solid blue;
	}

	.slot {
		position: absolute;
	}

	.tile {
		position: absolute;
		z-index: 10;

		svg {
			width: 68px;
			height: 68px;
		}
	}
</style>
