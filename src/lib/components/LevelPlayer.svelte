<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { currentWord, type GridStore } from '$lib/stores/grid';
	import { swipe } from 'svelte-gestures';
	import WordVisualizer from '$lib/components/WordVisualizer.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { ArrowLeftIcon, ChevronsLeftIcon, RefreshCcwIcon } from 'svelte-feather-icons';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { goto } from '$app/navigation';
	import { spring } from 'svelte/motion';
	import { GameAudio } from '$lib/services/sound';
	import { sleep } from '$lib/utils/sleep';

	export let title: string;
	export let grid: GridStore;
	export let backLink: string;
	export let titleColor = 'var(--orange-light)';
	export let canUndo = false;

	const resetAnimation = spring(0, { stiffness: 0.01, damping: 0.05, precision: 0.001 });
	const undoAnimation = spring(0, { stiffness: 0.1, damping: 0.3, precision: 0.01 });

	const dispatch = createEventDispatcher<{ finish: FinishEvent; reset: null }>();
	const word = currentWord(grid);

	const sfx = new GameAudio();

	$: movesExhausted = $grid.numMovesTaken >= $grid.maxMoves.bronze;
	$: isAnswer = grid.isAnswer($word);
	$: hasEnded = isAnswer || (movesExhausted && !isAnswer);

	$: if (isAnswer) {
		dispatch('finish', { type: 'win', moves: $grid.numMovesTaken });
		sfx.play('win', 500);
	}

	$: if (movesExhausted && !isAnswer) {
		dispatch('finish', { type: 'loss', moves: $grid.numMovesTaken });
		sfx.play('lose', 500);
	}

	const handleSwipe = async (e: CustomEvent) => {
		if (movesExhausted) return;

		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['tileId'];
		if (!id) return;

		sfx.play('swipe');

		await sleep(10);

		const { moved } = grid.moveTile(id, dir);
		if (moved) {
			sleep(90).then(() => {
				// if ('vibrate' in navigator) navigator.vibrate(5);
				sfx.play('click');
			});
		}
	};

	onMount(() => sfx.init());
</script>

<nav>
	<button class="back" on:click={() => goto(backLink)}>
		<ArrowLeftIcon />
	</button>

	<div class="buttons">
		<slot name="buttons" />

		{#if canUndo && !hasEnded}
			<button
				class="undo"
				disabled={$grid.numMovesTaken === 0}
				on:click={() => {
					grid.undo();
					undoAnimation.set(-4).then(() => undoAnimation.set(0));
					sfx.play('undo');
				}}
				style:transform="translateX({$undoAnimation}px)"
			>
				<ChevronsLeftIcon />
			</button>
		{/if}

		<button
			class="reset"
			disabled={$grid.numMovesTaken === 0}
			on:click={() => {
				dispatch('reset');
				$resetAnimation++;
				sfx.play('reset');
			}}
			style:transform="rotate({-$resetAnimation * 180}deg)"
		>
			<RefreshCcwIcon />
		</button>
	</div>
</nav>

<span
	class="container"
	use:swipe={{ minSwipeDistance: 20, timeframe: 500, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	<div class="heading">
		<UnderlinedHeading color={titleColor}>
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

	.buttons {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.back,
	.reset,
	.undo {
		color: var(--text);
		display: grid;
		place-content: center;
		width: fit-content;
		background-color: transparent;
		border: none;
		cursor: pointer;
		padding: 0;

		&:disabled {
			opacity: 0.5;
			cursor: default;
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
