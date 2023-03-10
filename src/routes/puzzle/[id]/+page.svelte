<script lang="ts">
	import type { PageData } from './$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ChevronRightIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { createGridStore } from '$lib/stores/grid';
	import { userStore } from '$lib/stores/user';
	import { getRank } from '$lib/utils/grid';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { showTutorial } from '$lib/stores/tutorial';
	import { browser } from '$app/environment';

	export let data: PageData;

	const grid = createGridStore(data.puzzle.data);

	let showEndMenu = false;
	let type: 'win' | 'loss' = 'win';
	let moves = 0;

	if (!$userStore.puzzles[data.puzzle.id]) {
		userStore.markPuzzleInProgress(data.puzzle.id);
	}

	const handleFinish = (e: CustomEvent<FinishEvent>) => {
		type = e.detail.type;
		moves = e.detail.moves;

		userStore.markPuzzleComplete(data.puzzle.id, 'completed', getRank($grid, $grid.numMovesTaken));

		setTimeout(() => (showEndMenu = true), 500);
	};

	const handleReset = () => {
		grid.reset();
		showEndMenu = false;
	};

	$: if (browser && $showTutorial) {
		const yes = confirm('Do you want to do a tutorial first?');
		if (yes) goto('/tutorial');

		$showTutorial = false;
	}
</script>

<svelte:head>
	<title>Sliple - {data.puzzle.publishedAt.toLocaleDateString('fi')}</title>
	<meta
		name="description"
		content="Play the featured puzzle of {data.puzzle.publishedAt.toLocaleDateString('fi')}"
	/>
</svelte:head>

{#if showEndMenu}
	<EndMenu {type} {moves} puzzle={data.puzzle}>
		<Button on:click={handleReset} color="red" highlight={type === 'loss'}>
			Try again
			<RotateCcwIcon />
		</Button>

		<Button on:click={() => goto('/archive')} color="green" highlight={type === 'win'}>
			More puzzles
			<ChevronRightIcon />
		</Button>
	</EndMenu>
{/if}

<LevelPlayer
	backLink="/"
	{grid}
	title={data.puzzle.publishedAt.toLocaleDateString('fi-FI')}
	on:finish={handleFinish}
	on:reset={handleReset}
>
	<p slot="description">
		Spell ???<span class="highlight">{$grid.solution.toLowerCase()}</span>??? within
		<span class="highlight">{$grid.maxMoves.bronze}</span> moves
	</p>
</LevelPlayer>

<style lang="scss">
	p {
		color: var(--gray);
	}

	.highlight {
		font-weight: bold;
		color: var(--black);
	}
</style>
