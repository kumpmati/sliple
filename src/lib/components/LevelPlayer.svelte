<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { currentWord, type GridStore } from '$lib/stores/grid';
	import { swipe } from 'svelte-gestures';
	import WordVisualizer from '$lib/components/WordVisualizer.svelte';
	import { createEventDispatcher } from 'svelte';
	import { ArrowLeftIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { goto } from '$app/navigation';

	export let title: string;
	export let grid: GridStore;
	export let backLink: string;

	const dispatch = createEventDispatcher<{ finish: FinishEvent; reset: null }>();
	const word = currentWord(grid);

	$: movesExhausted = $grid.numMovesTaken >= $grid.maxMoves.bronze;
	$: isAnswer = grid.isAnswer($word);

	$: if (isAnswer) {
		dispatch('finish', { type: 'win', moves: $grid.numMovesTaken });
	}

	$: if (movesExhausted && !isAnswer) {
		dispatch('finish', { type: 'loss', moves: $grid.numMovesTaken });
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
	<button class="back" on:click={() => goto(backLink)}>
		<ArrowLeftIcon />
	</button>

	<button class="reset" on:click={() => dispatch('reset')}>
		<RotateCcwIcon />
	</button>
</nav>

<span
	class="container"
	use:swipe={{ minSwipeDistance: 20, timeframe: 500, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	<div class="heading">
		<UnderlinedHeading color="var(--orange-light)">
			{title}
		</UnderlinedHeading>

		<slot name="description" />
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
		z-index: 2;
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

	.container {
		max-height: 700px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.heading {
		margin-top: 64px;
		margin-bottom: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
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
