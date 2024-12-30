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
	import { GameSounds } from './sounds';
	import { getSfxContext } from '$lib/stores/sound';

	type Props = {
		game: GameState;
	};

	let { game }: Props = $props();

	const sfx = getSfxContext();

	$effect(() => {
		const sounds = new GameSounds(game, sfx);
		return () => sounds.disconnect();
	});
</script>

<div
	class="flex w-full flex-col items-center px-0 py-10 xs:px-4"
	use:swipe
	onswipe={(e) => {
		const { tileId, direction } = handleSwipeEvent(e);
		if (!tileId) return;

		game.move(tileId, direction);
	}}
>
	<p class="text-center text-sm text-slate-400">
		{game.moves} / {game.puzzle.data.maxMoves.bronze} moves
	</p>

	<svg
		class="mx-auto mt-2 overflow-visible"
		style="max-width: {CELL_SIZE * game.puzzle.data.width * 1.1}px"
		viewBox="-1 -1 {CELL_SIZE * game.puzzle.data.width + 2} {CELL_SIZE * game.puzzle.data.height +
			2}"
	>
		<!-- Background -->
		<rect
			x={-1}
			y={-1}
			class="fill-slate-950 stroke-slate-800"
			rx="18"
			width={CELL_SIZE * game.puzzle.data.width + 2}
			height={CELL_SIZE * game.puzzle.data.height + 2}
			stroke-width="2"
		/>

		<!-- Draw tiles in sorted order because svg doesn't have z-index -->
		{#each game.sortedTiles as tile (tile.id)}
			{@const x = tile.x * CELL_SIZE}
			{@const y = tile.y * CELL_SIZE}

			<TweenedTile tileId={tile.id} {x} {y}>
				{#if isLetterTile(tile)}
					{@const { status, goalLetter } = getLetterStatus(game.tiles, tile)}
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
