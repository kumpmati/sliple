<script lang="ts">
	import GameBoard from '$lib/v2/game/GameBoard.svelte';
	import GameControls from '$lib/v2/game/GameControls.svelte';
	import SolutionPreview from '$lib/v2/game/SolutionPreview.svelte';
	import { GameState } from '$lib/v2/game/state.svelte';
	import BottomSheet from '$lib/v2/BottomSheet.svelte';
	import PuzzleStatistics from '$lib/v2/stats/PuzzleStatistics.svelte';
	import Underline from '$lib/v2/Underline.svelte';
	import { superActions } from 'sveltekit-superactions';
	import type { StatsEndpoint } from '../../../api/stats/+server.js';
	import { untrack } from 'svelte';
	import type { V2Statistics } from '$lib/server/db/handlers/stats.js';

	let { data } = $props();

	const actions = superActions<StatsEndpoint>('/api/stats');
	const game = new GameState(data.puzzle);

	let stats = $state<V2Statistics | null>(null);

	game.on('move', () => console.log('moved'));
	game.on('win', () => {
		actions.markCompletion({
			type: 'w',
			puzzleId: game.puzzle.id,
			numMoves: game.moves
		});

		setTimeout(() => (modalOpen = true), 400);
	});

	let modalOpen = $state(false);

	$effect(() => {
		if (modalOpen) {
			untrack(() => {
				actions
					.getv2Stats({
						puzzleId: data.puzzle.id,
						numMoves: game.moves
					})
					.then((d) => (stats = d));
			});
		}
	});

	$inspect(stats);
</script>

<svelte:head>
	<title>Random puzzle</title>
</svelte:head>

<main class="flex flex-col items-center">
	<GameControls {game} />

	<h1 class="relative z-0 w-fit font-heading text-2xl font-bold">
		Daily puzzle
		<Underline class="bg-blue-700" />
	</h1>

	<p class="mt-4 text-sm text-slate-400">
		Spell "<span class="font-bold text-white">{game.puzzle.data.solution}</span>" within
		{game.puzzle.data.maxMoves.bronze} moves
	</p>

	<GameBoard {game} />

	<SolutionPreview state={game} />

	<BottomSheet bind:open={modalOpen}>
		<PuzzleStatistics
			moves={game.moves}
			maxMoves={{ bronze: 30, silver: 25, gold: 20 }}
			ownPlayed={150}
			ownStreak={5}
			ownMaxStreak={15}
			ownPercentile={stats?.percentile ?? 100}
			globalDistribution={stats?.distribution ?? []}
			globalAverageMoves={stats?.totals.averageMoves ?? 0}
			globalCompletions={stats?.totals.totalAttempts ?? 0}
		/>
	</BottomSheet>
</main>
