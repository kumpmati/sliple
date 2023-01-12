<script lang="ts">
	import { GRID_CELL_SIZE } from '$lib/constants/grid';
	import type { EditorStore } from '$lib/stores/editor';
	import type { Tile } from '$lib/types/grid';
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import Sortable from 'sortablejs';
	import { createEventDispatcher, onMount } from 'svelte';
	import GoalGraphic from '../graphics/GoalGraphic.svelte';
	import LetterGraphic from '../graphics/LetterGraphic.svelte';
	import StickyGraphic from '../graphics/StickyGraphic.svelte';
	import WallGraphic from '../graphics/WallGraphic.svelte';

	export let editor: EditorStore;
	export let currentTile: Tile | null;

	let sortable: any;
	const dispatch = createEventDispatcher();

	// letters should be the last items to be drawn,
	// so that they are drawn on top of every other tile.
	const sortTiles = (a: Tile) => (a.type === 'letter' ? 1 : -1);

	onMount(() => {
		Sortable.create(sortable, {
			group: {
				name: 'editor',
				put: true,
				pull: true
			},
			filter: '.nodrag'
		});
	});
</script>

<svg
	viewBox="0 0 {$editor.width * GRID_CELL_SIZE} {$editor.height * GRID_CELL_SIZE}"
	bind:this={sortable}
>
	{#each new Array($editor.width + 1) as _, x}
		{#each new Array($editor.height + 1) as _, y}
			<circle
				class="nodrag"
				cx={x * GRID_CELL_SIZE}
				cy={y * GRID_CELL_SIZE}
				r="1.25"
				fill="var(--gray-light)"
			/>
		{/each}
	{/each}

	<!-- Tiles -->
	{#each $editor.tiles.sort(sortTiles) as tile (tile.id)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<g
			transform="translate({tile.x * GRID_CELL_SIZE}, {tile.y * GRID_CELL_SIZE})"
			on:click={() => dispatch('edit', tile)}
			class:selected={currentTile?.id === tile.id}
		>
			{#if isLetterTile(tile)}
				<LetterGraphic letter={tile.letter} />
			{:else if isWallTile(tile)}
				<WallGraphic />
			{:else if isGoalTile(tile)}
				<GoalGraphic letter={tile.letter ?? '?'} />
			{:else if isStickyTile(tile)}
				<StickyGraphic />
			{/if}
		</g>
	{/each}
</svg>

<style lang="scss">
	svg {
		position: relative;
		padding: 4px;
		display: flex;
		border-radius: var(--border-radius-big);
		border: 2px solid var(--gray-light);
		overflow: visible;
		width: 100%;
	}

	g {
		pointer-events: all;

		&.selected {
			filter: drop-shadow(0 0 4px red);
		}
	}
</style>
