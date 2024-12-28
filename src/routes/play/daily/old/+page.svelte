<script lang="ts">
	import type { PageData } from '../$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import { HomeIcon, RotateCcwIcon, Share2Icon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { createGridStore } from '$lib/stores/grid';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { showTutorial } from '$lib/stores/tutorial';
	import { browser } from '$app/environment';
	import dayjs from 'dayjs';
	import localized from 'dayjs/plugin/localizedFormat';
	import PuzzleAnalytics from '$lib/components/analytics/PuzzleAnalytics.svelte';
	import { page } from '$app/stores';
	import { superActions } from 'sveltekit-superactions';
	import type { StatsEndpoint } from '../../../api/stats/+server';

	dayjs.extend(localized);

	export let data: PageData;

	const statsApi = superActions<StatsEndpoint>('/api/stats');

	$: grid = createGridStore(data.puzzle.data);

	let showEndMenu = false;
	let type: 'win' | 'loss' = 'win';
	let moves = 0;

	const handleFinish = (e: CustomEvent<FinishEvent>) => {
		type = e.detail.type;
		moves = e.detail.moves;

		statsApi.markCompletion({
			puzzleId: data.puzzle.id,
			type: type === 'loss' ? 'l' : 'w',
			numMoves: moves
		});

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
	<title>Sliple - Daily puzzle</title>
	<meta name="description" content="Solve the daily puzzle - '{data.puzzle.data.solution}'" />
</svelte:head>

{#if showEndMenu}
	<EndMenu
		{type}
		{moves}
		puzzle={data.puzzle}
		shareText="I solved today's puzzle '{data.puzzle.data
			.solution}' in {moves} moves! Can you do better? 😉"
		buttons={[
			{
				text: type === 'win' ? 'Improve' : 'Try again',
				onClick: handleReset,
				icon: RotateCcwIcon,
				hightlight: 'both'
			},
			{ text: 'Main menu', onClick: () => goto('/'), icon: HomeIcon }
		]}
	/>
{/if}

{#key data.puzzle.id}
	<LevelPlayer
		backLink="/"
		{grid}
		title="Daily puzzle"
		titleColor="var(--blue-light)"
		canUndo
		on:finish={handleFinish}
		on:reset={handleReset}
	>
		<svelte:fragment slot="buttons">
			{#if browser && navigator?.canShare?.({ text: 'Lorem ipsum' })}
				<button
					on:click={() =>
						navigator.share({
							title: 'Sliple - Daily puzzle',
							url: $page.url.toString(),
							text: `Can you solve today's puzzle '${data.puzzle.data.solution}' in ${data.puzzle.data.maxMoves.bronze} moves?`
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
