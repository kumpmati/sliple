<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { swipe } from 'svelte-gestures';
	import type { PageData } from './$types';
	import { ArrowLeftIcon, RotateCcwIcon } from 'svelte-feather-icons';

	export let data: PageData;

	const grid = createGridStore(data.puzzle.data);
	const word = currentWord(grid);

	const handleSwipe = (e: CustomEvent) => {
		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['id'];
		if (!id) return;

		grid.moveTile(id, dir);
	};
</script>

<nav>
	<a href="/">
		<ArrowLeftIcon />
	</a>

	<button on:click={() => grid.reset()}>
		<RotateCcwIcon />
	</button>
</nav>

<span
	class="container"
	use:swipe={{ minSwipeDistance: 20, timeframe: 500, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	<div class="heading">
		<UnderlinedHeading color="var(--orange-light)">Featured puzzle</UnderlinedHeading>

		<p>
			Spell "<span class="highlight">{data.puzzle.data.solutions[0].toLowerCase()}</span>" within
			<span class="highlight">{data.puzzle.data.maxMoves}</span> moves
		</p>
	</div>

	<div class="content">
		<p>Moves left: <b>{$grid.maxMoves - $grid.numMovesTaken}</b></p>
		<Grid {grid} />

		<h2>{$word}</h2>
	</div>
</span>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
	}

	.container {
		display: contents;
	}

	a,
	button {
		color: var(--black);
		display: grid;
		place-content: center;
		width: fit-content;
		padding: 8px;
	}

	.heading {
		margin-top: 32px;
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
		text-align: center;
		width: 100%;
	}
</style>