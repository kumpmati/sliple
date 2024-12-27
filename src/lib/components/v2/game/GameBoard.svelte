<script lang="ts">
	import { isGoalTile, isLetterTile, isWallTile } from '$lib/utils/typeguards';
	import { swipe } from 'svelte-gestures';
	import LetterTile from './LetterTile.svelte';
	import { GameState } from './state.svelte';
	import { CELL_SIZE } from '$lib/constants/grid';
	import WallTile from './WallTile.svelte';
	import GoalTile from './GoalTile.svelte';
	import { handleSwipeEvent } from './swipe';
	import { getLetterStatus } from './utils';
	import TweenedTile from './TweenedTile.svelte';

	type Props = {
		state: GameState;
	};

	let { state }: Props = $props();
</script>

<div
	class="flex w-full px-4 py-10"
	use:swipe
	onswipe={(e) => {
		const { tileId, direction } = handleSwipeEvent(e);
		if (!tileId) return;

		state.move(tileId, direction);
	}}
>
	<svg
		class="mx-auto overflow-visible"
		style="max-width: {CELL_SIZE * state.puzzle.data.width * 1.2}px"
		viewBox="-1 -1 {CELL_SIZE * state.puzzle.data.width + 2} {CELL_SIZE * state.puzzle.data.height +
			2}"
	>
		<!-- Background -->
		<rect
			x={-1}
			y={-1}
			class="fill-slate-950 stroke-slate-900"
			rx="18"
			width={CELL_SIZE * state.puzzle.data.width + 2}
			height={CELL_SIZE * state.puzzle.data.height + 2}
			stroke-width="2"
		/>

		<!-- Draw tiles in sorted order because svg doesn't have z-index -->
		{#each state.sortedTiles as tile (tile.id)}
			{@const x = tile.x * CELL_SIZE}
			{@const y = tile.y * CELL_SIZE}

			<TweenedTile tileId={tile.id} {x} {y}>
				{#if isLetterTile(tile)}
					{@const { status, goalLetter } = getLetterStatus(state.tiles, tile)}
					<LetterTile letter={tile.letter} {status} secondaryLetter={goalLetter} />
				{:else if isWallTile(tile)}
					<WallTile />
				{:else if isGoalTile(tile)}
					<GoalTile letter={tile.letter} />
				{/if}
			</TweenedTile>
		{/each}
	</svg>
</div>
