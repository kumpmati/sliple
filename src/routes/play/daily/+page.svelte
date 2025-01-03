<script lang="ts">
	import GameBoard from '$lib/v2/game/GameBoard.svelte';
	import GameControls from '$lib/v2/game/GameControls.svelte';
	import SolutionPreview from '$lib/v2/game/SolutionPreview.svelte';
	import { GameState } from '$lib/v2/game/state.svelte';
	import BottomSheet from '$lib/v2/BottomSheet.svelte';
	import TablerShare from '~icons/tabler/share';
	import PuzzleStatistics from '$lib/v2/stats/PuzzleStatistics.svelte';
	import Underline from '$lib/v2/Underline.svelte';
	import { superActions } from 'sveltekit-superactions';
	import type { StatsEndpoint } from '../../api/stats/+server.js';
	import { onDestroy, untrack } from 'svelte';
	import type { V2Statistics } from '$lib/server/db/handlers/stats.js';
	import { sleep } from '$lib/utils/sleep.js';
	import Button from '$lib/v2/Button.svelte';
	import { shareDailyPuzzle } from '$lib/v2/share.js';
	import dayjs from 'dayjs';
	import TutorialModal from '$lib/v2/tutorial/TutorialModal.svelte';
	import { getLocalDbContext } from '$lib/v2/persisted/context';

	let { data } = $props();

	const actions = superActions<StatsEndpoint>('/api/stats');
	const game = new GameState(data.puzzle);
	const db = getLocalDbContext();

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

	const unsub = game.on('end', ({ type, moves }) => {
		db.markPuzzleComplete(data.puzzle, moves.length, type);

		actions
			// use the puzzle timestamp when submitting to make sure timezones don't affect the submission
			.markCompletion({ date: dayjs(data.puzzle.publishedAt).format('YYYY-MM-DD'), moves })
			.catch((err) => alert('verification failed: ' + (err?.body?.message ?? err)))
			.then(() => loadStats());

		sleep(750).then(() => (modalOpen = true));
	});

	let modalOpen = $state(false);

	$effect(() => {
		if (modalOpen && !stats.current) {
			untrack(() => {
				loadStats(); // only load stats once
			});
		}
	});

	onDestroy(unsub);
</script>

<svelte:head>
	<title>Daily puzzle - {data.puzzle.publishedAt.toLocaleDateString()}</title>
	<meta name="description" content="Solve the daily puzzle - '{data.puzzle.data.solution}'" />

	<meta property="og:url" content="https://sliple.app/play/daily" />
	<meta property="og:image" content="https://sliple.app/og/daily.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="900" />
	<meta property="og:image:height" content="473" />
</svelte:head>

<TutorialModal />

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

	<BottomSheet
		bind:open={modalOpen}
		urlStateHash="stats"
		onClose={() => game.status !== 'ongoing' && game.reset()}
	>
		<!-- TODO: show streak statistics -->
		<PuzzleStatistics
			puzzleId={game.puzzle.id}
			maxMoves={game.puzzle.data.maxMoves}
			globals={{
				loading: stats.loading,
				error: stats.error,
				distribution: stats.current?.distribution ?? [],
				averageMoves: stats.current?.totals.averageMoves ?? 0,
				completions: stats.current?.totals.totalAttempts ?? 0
			}}
		>
			<Button color="lightgray" raised class="mt-8" onclick={() => shareDailyPuzzle(data.puzzle)}>
				Share
				<TablerShare class="size-5" />
			</Button>
		</PuzzleStatistics>
	</BottomSheet>
</main>
