<script lang="ts">
	import TablerShare from '~icons/tabler/share';
	import TablerChevronsRight from '~icons/tabler/chevrons-right';
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
	import { getLocalStatsContext, markCompleted } from '$lib/v2/stats/local.svelte.js';
	import { sleep } from '$lib/utils/sleep.js';
	import Button from '$lib/v2/Button.svelte';
	import { shareRandomPuzzle } from '$lib/v2/share.js';

	let { data } = $props();

	const actions = superActions<StatsEndpoint>('/api/stats');
	const game = new GameState(data.puzzle);
	const localStats = getLocalStatsContext();

	let stats = $state<{
		id: string | null;
		current: V2Statistics | null;
		loading: boolean;
		error?: string;
	}>({
		id: null,
		current: null,
		loading: false
	});

	const loadStats = async () => {
		stats.loading = true;
		await actions
			.getv2Stats({ puzzleId: data.puzzle.id })
			.then((d) => {
				stats.id = data.puzzle.id;
				stats.current = d;
			})
			.catch((err) => (stats.error = err));
		stats.loading = false;
	};

	game.on('end', ({ type, moves }) => {
		actions
			.markCompletion({
				type,
				numMoves: moves,
				puzzleId: game.puzzle.id
			})
			.catch(() => alert('failed to mark completion'))
			.then(() => loadStats());

		markCompleted(localStats, {
			puzzleId: game.puzzle.id,
			type: 'random',
			win: type === 'w',
			moves: game.moves,
			timestamp: new Date().toISOString()
		});

		sleep(400).then(() => (modalOpen = true));
	});

	let modalOpen = $state(false);

	$effect(() => {
		if (modalOpen && (!stats.current || stats.id !== data.puzzle.id)) {
			untrack(() => {
				console.log('loading stats');
				loadStats(); // only load stats once when puzzle changes
			});
		}
	});

	$effect(() => {
		data.puzzle.id; // reactivity dependency

		untrack(() => game.setPuzzle(data.puzzle));
	});
</script>

<svelte:head>
	<title>Random puzzle - {data.puzzle.data.solution}</title>
	<meta
		name="description"
		content="Solve a randomly generated puzzle: '{data.puzzle.data.solution}'"
	/>
</svelte:head>

<main class="flex flex-col items-center">
	<GameControls {game} bind:statsOpen={modalOpen} />

	<h1 class="relative z-0 w-fit font-heading text-2xl font-bold">
		Random puzzle
		<Underline class="bg-orange-700" />
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
		>
			<div class="mt-8 grid w-full grid-cols-2 gap-4">
				<Button color="lightgray" onclick={() => shareRandomPuzzle(game.puzzle)}>
					Share <TablerShare class="size-5" />
				</Button>
				<Button color="orange" href="/play/random" onclick={() => (modalOpen = false)}>
					Next <TablerChevronsRight class="size-5" />
				</Button>
			</div>
		</PuzzleStatistics>
	</BottomSheet>
</main>
