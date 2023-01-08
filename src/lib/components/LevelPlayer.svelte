<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { swipe } from 'svelte-gestures';
	import { userStore } from '$lib/stores/user';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import WordVisualizer from '$lib/components/WordVisualizer.svelte';
	import type { Puzzle_v2 } from '$lib/types/puzzle';
	import { createEventDispatcher } from 'svelte';
	import { ArrowLeftIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { getRank } from '$lib/utils/grid';

	export let puzzle: Puzzle_v2;
	export let preview: boolean;

	const dispatch = createEventDispatcher();

	let showEndMenu = false;

	const grid = createGridStore(puzzle.data);
	const word = currentWord(grid);

	$: movesExhausted = $grid.numMovesTaken >= $grid.maxMoves.bronze;
	$: isAnswer = grid.isAnswer($word);

	$: if (isAnswer) {
		if (!preview) {
			userStore.setPuzzleStatus(puzzle.id, 'completed', getRank($grid, $grid.numMovesTaken));
		}
		setTimeout(() => (showEndMenu = true), 500);
	}

	$: if (movesExhausted && !isAnswer) {
		setTimeout(() => (showEndMenu = true), 500);
	}

	if (!$userStore.puzzles[puzzle.id]) {
		if (!preview) userStore.setPuzzleStatus(puzzle.id, 'inprogress', null);
	}

	const handleSwipe = (e: CustomEvent) => {
		if (movesExhausted) return;

		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['tileId'];
		if (!id) return;

		grid.moveTile(id, dir);
	};
</script>

<nav>
	<button class="back" on:click={() => history.back()}>
		<ArrowLeftIcon />
	</button>

	<button class="reset" on:click={grid.reset}>
		<RotateCcwIcon />
	</button>
</nav>

{#if showEndMenu}
	<EndMenu
		type={isAnswer ? 'win' : 'lose'}
		moves={$grid.numMovesTaken}
		{puzzle}
		on:close={() => {
			showEndMenu = false;
			dispatch('close');
		}}
		on:reset={() => {
			grid.reset();
			showEndMenu = false;
			dispatch('reset');
		}}
	/>
{/if}

<span
	class="container"
	use:swipe={{ minSwipeDistance: 20, timeframe: 500, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	<div class="heading">
		<UnderlinedHeading color="var(--orange-light)">
			{puzzle.publishedAt.toLocaleDateString()}
		</UnderlinedHeading>

		<p>
			Spell “<span class="highlight">{puzzle.data.solution.toLowerCase()}</span>” within
			<span class="highlight">{puzzle.data.maxMoves.bronze}</span> moves
		</p>
	</div>

	<div class="content">
		<div class="stats">
			<p>
				{$grid.numMovesTaken} / {$grid.maxMoves.bronze} moves
			</p>
		</div>

		<span class="grid">
			<Grid {grid} />
		</span>

		<span class="word">
			<WordVisualizer {grid} {word} />
		</span>
	</div>
</span>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
	}

	.back,
	.reset {
		color: var(--black);
		display: grid;
		place-content: center;
		width: fit-content;
		background-color: transparent;
		border: none;
		cursor: pointer;
		padding: 0;

		transition: transform 200ms;
		&:active {
			transform: scale(0.95);
		}
	}

	.heading {
		margin-top: 16px;
		margin-bottom: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			color: var(--gray);
		}

		.highlight {
			font-weight: bold;
			color: var(--black);
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		p {
			color: var(--gray);
			margin: 8px 0;
		}

		.grid {
			padding: 4px;
			max-width: 400px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: var(--border-radius-big);
		}

		.stats {
			display: flex;
			justify-content: center;
			width: 100%;
			max-width: 250px;
		}

		.word {
			margin-top: 32px;
		}
	}
</style>
