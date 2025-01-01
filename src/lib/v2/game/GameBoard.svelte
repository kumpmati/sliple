<script lang="ts">
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import { swipe } from 'svelte-gestures';
	import LetterTile from './LetterTile.svelte';
	import { GameState } from './state.svelte';
	import { CELL_SIZE } from '$lib/constants/grid';
	import WallTile from './WallTile.svelte';
	import GoalTile from './GoalTile.svelte';
	import { getTileId, handleSwipeEvent } from './swipe';
	import { getLetterStatus } from './utils';
	import TweenedTile from './TweenedTile.svelte';
	import { GameSounds } from './sounds';
	import { getSfxContext } from '$lib/stores/sound';
	import StickyTile from './StickyTile.svelte';
	import CompletePopup from './CompletePopup.svelte';
	import { getDirFromDeltas, getDragOffset, type TouchCtx } from './touch.svelte';

	type Props = {
		game: GameState;
	};

	const DRAG_THRESHOLD = 30;

	let { game }: Props = $props();

	const sfx = getSfxContext();

	let touch = $state<TouchCtx>({
		id: null,
		start: null,
		end: null,
		drag: getDragOffset(null, null, DRAG_THRESHOLD)
	});

	$effect(() => {
		const sounds = new GameSounds(game, sfx);
		return () => sounds.disconnect();
	});

	const handleDragStart = (e: TouchEvent | MouseEvent) => {
		const id = getTileId(e.target as Element);
		if (!id) return;

		if (e instanceof MouseEvent) {
			touch = {
				id,
				start: [e.clientX, e.clientY],
				end: null,
				drag: getDragOffset(null, null, DRAG_THRESHOLD)
			};
		} else {
			touch = {
				id,
				start: [e.touches[0].clientX, e.touches[0].clientY],
				end: null,
				drag: getDragOffset(null, null, DRAG_THRESHOLD)
			};
		}
	};

	const handleDragMove = (e: TouchEvent | MouseEvent) => {
		if (!touch.id) return;

		const id = getTileId(e.target as Element);
		if (!id) return;

		if (e instanceof MouseEvent) {
			if (touch.id === id) {
				touch.end = [e.clientX, e.clientY];
				touch.drag = getDragOffset(touch.start, touch.end, DRAG_THRESHOLD);
			}
		} else {
			if (touch.id === id) {
				touch.end = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
				touch.drag = getDragOffset(touch.start, touch.end, DRAG_THRESHOLD);
			}
		}
	};

	const handleDragEnd = () => {
		const dir = getDirFromDeltas(touch.drag.x, touch.drag.y);
		if (dir && touch.id) {
			game.move(touch.id, dir);
		}

		touch = {
			id: null,
			start: null,
			end: null,
			drag: getDragOffset(null, null, DRAG_THRESHOLD)
		};
	};

	$effect(() => {
		window.addEventListener('touchstart', handleDragStart);
		window.addEventListener('touchmove', handleDragMove);
		window.addEventListener('touchend', handleDragEnd);

		window.addEventListener('mousedown', handleDragStart);
		window.addEventListener('mousemove', handleDragMove);
		window.addEventListener('mouseup', handleDragEnd);

		return () => {
			window.removeEventListener('touchstart', handleDragStart);
			window.removeEventListener('touchmove', handleDragMove);
			window.removeEventListener('touchend', handleDragEnd);

			window.removeEventListener('mousedown', handleDragStart);
			window.removeEventListener('mousemove', handleDragMove);
			window.removeEventListener('mouseup', handleDragEnd);
		};
	});
</script>

<div
	role="none"
	class="relative flex w-full flex-col items-center px-0 py-10 xs:px-4"
	use:swipe={{ timeframe: 500, minSwipeDistance: 30 }}
	onswipe={(e) => {
		const { tileId, direction } = handleSwipeEvent(e);
		if (!tileId) return;

		game.move(tileId, direction);
	}}
>
	<p class="text-center text-sm text-slate-400">
		{game.moves} / {game.puzzle.data.maxMoves.bronze} moves
	</p>

	<CompletePopup {game} />

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
			{@const offset = touch.id === tile.id ? touch.drag : { x: 0, y: 0 }}

			<TweenedTile tileId={tile.id} x={x + offset.x * 5} y={y + offset.y * 5}>
				{#if isLetterTile(tile)}
					{@const { status, goalLetter } = getLetterStatus(game.tiles, tile)}
					<LetterTile letter={tile.letter} {status} secondaryLetter={goalLetter} />
				{:else if isWallTile(tile)}
					<WallTile />
				{:else if isGoalTile(tile)}
					<GoalTile letter={tile.letter} />
				{:else if isStickyTile(tile)}
					<StickyTile />
				{/if}
			</TweenedTile>
		{/each}
	</svg>
</div>
