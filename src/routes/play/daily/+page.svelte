<script lang="ts">
	import GameBoard from '$lib/v2/game/GameBoard.svelte';
	import GameControls from '$lib/v2/game/GameControls.svelte';
	import SolutionPreview from '$lib/v2/game/SolutionPreview.svelte';
	import { GameState } from '$lib/v2/game/state.svelte';
	import BottomSheet from '$lib/v2/BottomSheet.svelte';
	import PuzzleStatistics from '$lib/v2/stats/PuzzleStatistics.svelte';
	import Underline from '$lib/v2/Underline.svelte';
	import { superActions } from 'sveltekit-superactions';
	import type { StatsEndpoint } from '../../api/stats/+server.js';
	import { untrack } from 'svelte';
	import type { V2Statistics } from '$lib/server/db/handlers/stats.js';
	import { getLocalStatsContext, markCompleted } from '$lib/v2/stats/local.svelte';
	import dayjs from 'dayjs';
	import { sleep } from '$lib/utils/sleep.js';

	let { data } = $props();

	const actions = superActions<StatsEndpoint>('/api/stats');
	const game = new GameState(data.puzzle);
	const localStats = getLocalStatsContext();

	let stats = $state<{ current: V2Statistics | null; loading: boolean; error?: string }>({
		current: null,
		loading: false
	});

	const loadStats = async () => {
		stats.loading = true;
		await actions
			.getv2Stats({ puzzleId: data.puzzle.id })
			.then((d) => (stats.current = d))
			.catch((err) => (stats.error = err));
		stats.loading = false;
	};

	game.on('move', () => console.log('moved'));
	game.on('win', () => {
		actions
			.markCompletion({
				type: 'w',
				puzzleId: game.puzzle.id,
				numMoves: game.moves
			})
			.catch(() => alert('failed to mark completion'))
			.then(() => loadStats());

		markCompleted(localStats, {
			puzzleId: game.puzzle.id,
			moves: game.moves,
			type: 'daily',
			win: true,
			timestamp: new Date().toISOString()
		});

		sleep(400).then(() => (modalOpen = true));
	});

	let modalOpen = $state(false);

	$effect(() => {
		if (modalOpen && !stats.current) {
			untrack(() => {
				loadStats(); // only load stats once
			});
		}
	});

	$inspect(stats);
</script>

<svelte:head>
	<title>Daily puzzle - {data.puzzle.publishedAt.toLocaleDateString()}</title>
	<meta name="description" content="Solve the daily puzzle - '{data.puzzle.data.solution}'" />
</svelte:head>

<main class="flex flex-col items-center">
	<GameControls {game} bind:statsOpen={modalOpen} />

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

	<BottomSheet bind:open={modalOpen} urlStateHash="stats">
		<PuzzleStatistics
			puzzleId={game.puzzle.id}
			maxMoves={game.puzzle.data.maxMoves}
			globalsLoading={stats.loading}
			globalsError={stats.error}
			globalDistribution={stats.current?.distribution ?? []}
			globalAverageMoves={stats.current?.totals.averageMoves ?? 0}
			globalCompletions={stats.current?.totals.totalAttempts ?? 0}
		/>
	</BottomSheet>
</main>
