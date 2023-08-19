<script lang="ts">
	import type { PageData } from './$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import { ChevronsRightIcon, HomeIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { createGridStore } from '$lib/stores/grid';
	import { userStore } from '$lib/stores/user';
	import { getRank } from '$lib/utils/grid';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { showTutorial } from '$lib/stores/tutorial';
	import { browser } from '$app/environment';
	import PuzzleAnalytics from '$lib/components/analytics/PuzzleAnalytics.svelte';

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
	<EndMenu
		{type}
		{moves}
		puzzle={data.puzzle}
		shareText="I solved this featured puzzle in {moves} moves! Try to beat that 😉"
		buttons={[
			{ text: 'Try again', onClick: handleReset, icon: RotateCcwIcon, hightlight: 'loss' },
			{
				text: 'More puzzles',
				onClick: () => goto('/archive'),
				hightlight: 'win',
				icon: ChevronsRightIcon
			},
			{ text: 'Main menu', onClick: () => goto('/'), icon: HomeIcon }
		]}
	/>
{/if}

<LevelPlayer
	backLink="/"
	{grid}
	title={data.puzzle.publishedAt.toLocaleDateString('fi-FI')}
	on:finish={handleFinish}
	on:reset={handleReset}
>
	<PuzzleAnalytics slot="buttons" puzzle={data.puzzle} analysis={data.analysis} />

	<p slot="description">
		Spell “<span class="highlight">{$grid.solution.toLowerCase()}</span>” within
		<span class="highlight">{$grid.maxMoves.bronze}</span> moves
	</p>
</LevelPlayer>

<style lang="scss">
	p {
		color: var(--text-subtle);
	}

	.highlight {
		font-weight: bold;
		color: var(--text);
	}
</style>
