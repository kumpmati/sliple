<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { swipe } from 'svelte-gestures';
	import type { PageData } from './$types';
	import { ArrowLeftIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { userStore } from '$lib/stores/user';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import WordVisualizer from '$lib/components/WordVisualizer.svelte';
	import { formatDuration } from '$lib/utils/time';
	import { createTimer } from '$lib/stores/timer';
	import { onMount } from 'svelte';

	export let data: PageData;

	let showEndMenu = false;

	const grid = createGridStore(data.puzzle.data);
	const word = currentWord(grid);
	const timer = createTimer();

	$: movesExhausted = $grid.maxMoves === 0 ? false : $grid.numMovesTaken >= $grid.maxMoves;
	$: isAnswer = grid.isAnswer($word);

	$: if (isAnswer) {
		userStore.setPuzzleStatus(data.puzzle.id, 'completed');
		timer.stop();
		setTimeout(() => (showEndMenu = true), 500);
	}

	$: if (movesExhausted && !isAnswer) {
		timer.stop();
		setTimeout(() => (showEndMenu = true), 500);
	}

	if (!$userStore.puzzles[data.puzzle.id]) {
		userStore.setPuzzleStatus(data.puzzle.id, 'inprogress');
	}

	const handleSwipe = (e: CustomEvent) => {
		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['tileId'];
		if (!id) return;

		grid.moveTile(id, dir);
	};

	onMount(() => timer.start());
</script>

<svelte:head>
	<title>Sliple - {data.puzzle.publishedAt.toLocaleDateString()}</title>
</svelte:head>

<nav>
	<button class="back" on:click={() => history.back()}>
		<ArrowLeftIcon />
	</button>

	<button
		class="reset"
		on:click={() => {
			grid.reset();
			timer.start();
		}}
	>
		<RotateCcwIcon />
	</button>
</nav>

{#if showEndMenu}
	<EndMenu
		type={isAnswer ? 'win' : 'lose'}
		heading={isAnswer ? 'Completed!' : 'Out of moves!'}
		stats={{
			duration: $timer,
			moves: `${$grid.numMovesTaken} / ${$grid.maxMoves}`
		}}
		on:close={() => (showEndMenu = false)}
		on:reset={() => {
			grid.reset();
			showEndMenu = false;
			timer.start();
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
			{data.puzzle.publishedAt.toLocaleDateString()}
		</UnderlinedHeading>

		<p>
			Spell “<span class="highlight">{data.puzzle.data.solutions[0]?.toLowerCase()}</span>” within
			<span class="highlight">{data.puzzle.data.maxMoves}</span> moves
		</p>
	</div>

	<div class="content">
		<div class="stats">
			<p>
				{$grid.numMovesTaken} / {$grid.maxMoves} moves
			</p>

			<p>{$timer}</p>
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

			b {
				color: var(--black);
			}
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
			justify-content: space-between;
			width: 100%;
			max-width: 250px;
		}

		.word {
			margin-top: 32px;
		}
	}
</style>
