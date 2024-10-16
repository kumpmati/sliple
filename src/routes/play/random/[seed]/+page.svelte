<script lang="ts">
	import type { PageData } from './$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import { ChevronsRightIcon, HomeIcon, RotateCcwIcon, Share2Icon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { createGridStore } from '$lib/stores/grid';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { showTutorial } from '$lib/stores/tutorial';
	import { browser } from '$app/environment';
	import PuzzleAnalytics from '$lib/components/analytics/PuzzleAnalytics.svelte';
	import { page } from '$app/stores';
	import { markCompletion } from '$lib/utils/completions';

	export let data: PageData;

	$: grid = createGridStore(data.puzzle.data);

	let showEndMenu = false;
	let type: 'win' | 'loss' = 'win';
	let moves = 0;

	const handleFinish = (e: CustomEvent<FinishEvent>) => {
		type = e.detail.type;
		moves = e.detail.moves;

		markCompletion(data.puzzle.id, type === 'loss' ? 'l' : 'w', moves);

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
	<title>Sliple - Random puzzle</title>
	<meta
		name="description"
		content="Solve a randomly generated puzzle - '{data.puzzle.data.solution}'"
	/>
</svelte:head>

{#if showEndMenu}
	<EndMenu
		{type}
		{moves}
		puzzle={data.puzzle}
		shareText="I solved this randomly generated puzzle '{data.puzzle.data
			.solution}' in {moves} moves! Can you do better? 😉"
		buttons={[
			{
				text: type === 'win' ? 'Improve' : 'Try again',
				onClick: handleReset,
				icon: RotateCcwIcon,
				hightlight: 'loss'
			},
			{
				text: 'Next puzzle',
				onClick: () => goto('/play/random').then(() => (showEndMenu = false)),
				icon: ChevronsRightIcon,
				hightlight: 'win'
			},
			{ text: 'Main menu', onClick: () => goto('/'), icon: HomeIcon }
		]}
	/>
{/if}

{#key data.puzzle.id}
	<LevelPlayer
		backLink="/"
		{grid}
		title="Random puzzle"
		titleColor="var(--purple-light)"
		canUndo
		on:finish={handleFinish}
		on:reset={handleReset}
	>
		<svelte:fragment slot="buttons">
			{#if browser && navigator?.canShare?.({ text: 'Lorem ipsum' })}
				<button
					on:click={() =>
						navigator.share({
							title: 'Sliple - Random puzzle',
							url: $page.url.toString(),
							text: `Can you solve this puzzle '${data.puzzle.data.solution}' in ${data.puzzle.data.maxMoves.bronze} moves?`
						})}
				>
					<Share2Icon size="22" />
				</button>
			{/if}

			<PuzzleAnalytics puzzle={data.puzzle} analysis={data.analysis} />
		</svelte:fragment>

		<p slot="description">
			Spell “<span class="highlight">{$grid.solution.toLowerCase()}</span>” within
			<span class="highlight">{$grid.maxMoves.bronze}</span> moves
		</p>
	</LevelPlayer>
{/key}

<style lang="scss">
	p {
		color: var(--text-subtle);
	}

	.highlight {
		font-weight: bold;
		color: var(--text);
	}

	button {
		display: flex;
		background-color: transparent;
		border: none;
		color: var(--button-text);
		cursor: pointer;
	}
</style>
