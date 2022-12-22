<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { swipe } from 'svelte-gestures';
	import type { PageData } from './$types';
	import { ArrowLeftIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { userStore } from '$lib/stores/user';
	import { page } from '$app/stores';
	import EndMenu from '$lib/components/EndMenu.svelte';

	export let data: PageData;

	let showEndMenu = false;

	const grid = createGridStore(data.puzzle.data);
	const word = currentWord(grid);

	$: movesExhausted = $grid.maxMoves === 0 ? false : $grid.numMovesTaken >= $grid.maxMoves;
	$: isAnswer = grid.isAnswer($word);

	$: if (isAnswer) {
		userStore.setPuzzleStatus(data.puzzle.id, 'completed');
		setTimeout(() => (showEndMenu = true), 300);
	}

	$: if (movesExhausted && !isAnswer) {
		setTimeout(() => (showEndMenu = true), 300);
	}

	const handleSwipe = (e: CustomEvent) => {
		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['tileId'];
		if (!id) return;

		grid.moveTile(id, dir);
	};
</script>

<nav>
	<a class="back" href="/">
		<ArrowLeftIcon />
	</a>

	<button class="reset" on:click={() => grid.reset()}>
		<RotateCcwIcon />
	</button>
</nav>

{#if showEndMenu}
	<EndMenu
		type={isAnswer ? 'win' : 'lose'}
		heading={isAnswer ? 'Completed!' : 'Out of moves!'}
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
		<UnderlinedHeading color="var(--orange-light)">
			{#if $page.params['id'] === 'latest'}
				Featured puzzle
			{:else}
				{new Date(data.puzzle.publishedAt).toLocaleDateString()}
			{/if}
		</UnderlinedHeading>

		<p>
			Spell “<span class="highlight">{data.puzzle.data.solutions[0]?.toLowerCase()}</span>” within
			<span class="highlight">{data.puzzle.data.maxMoves}</span> moves
		</p>
	</div>

	<div class="content">
		<p>Moves left: <b>{$grid.maxMoves - $grid.numMovesTaken}</b></p>

		<span class="grid">
			<Grid {grid} />
		</span>

		<h2 class="word">{$word.replaceAll('', ' ')}</h2>
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
			width: 100%;
			max-width: 400px;
			display: flex;
		}

		.word {
			font-size: 32px;
			font-weight: 900;
			font-family: var(--font-heading);
		}
	}
</style>
