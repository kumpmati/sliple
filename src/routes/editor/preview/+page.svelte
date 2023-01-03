<script lang="ts">
	import EndMenu from '$lib/components/EndMenu.svelte';
	import Grid from '$lib/components/grid/Grid.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import WordVisualizer from '$lib/components/WordVisualizer.svelte';
	import { createEditorStore } from '$lib/stores/editor';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { ArrowLeftIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { swipe } from 'svelte-gestures';

	const editor = createEditorStore();

	let showEndMenu = false;

	// create the game based on the editor state
	const grid = createGridStore($editor);
	const word = currentWord(grid);

	$: movesExhausted = $grid.maxMoves === 0 ? false : $grid.numMovesTaken >= $grid.maxMoves;
	$: isAnswer = grid.isAnswer($word);

	$: if (isAnswer) {
		setTimeout(() => (showEndMenu = true), 500);
	}

	$: if (movesExhausted && !isAnswer) {
		setTimeout(() => (showEndMenu = true), 500);
	}

	const handleSwipe = (e: CustomEvent) => {
		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['tileId'];
		if (!id) return;

		grid.moveTile(id, dir);
	};
</script>

<svelte:head>
	<title>Level editor - Preview</title>
</svelte:head>

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
		heading={isAnswer ? 'Completed!' : 'Out of moves!'}
		stats={{
			moves: `${$grid.numMovesTaken} / ${$grid.maxMoves}`
		}}
		on:close={() => (showEndMenu = false)}
		on:reset={() => {
			grid.reset();
			showEndMenu = false;
		}}
	/>
{/if}

<span
	class="container"
	use:swipe={{ minSwipeDistance: 20, timeframe: 500, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	<div class="heading">
		<UnderlinedHeading color="var(--orange-light)">Preview</UnderlinedHeading>

		<p>
			Spell “<span class="highlight">{$grid.solutions[0]?.toLowerCase()}</span>” within
			<span class="highlight">{$grid.maxMoves}</span> moves
		</p>
	</div>

	<div class="content">
		<div class="stats">
			<p>
				{$grid.numMovesTaken} / {$grid.maxMoves} moves
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
