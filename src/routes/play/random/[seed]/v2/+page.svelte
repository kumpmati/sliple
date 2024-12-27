<script>
	import GameBoard from '$lib/v2/game/GameBoard.svelte';
	import GameControls from '$lib/v2/game/GameControls.svelte';
	import SolutionPreview from '$lib/v2/game/SolutionPreview.svelte';
	import { GameState } from '$lib/v2/game/state.svelte';
	import BottomSheet from '$lib/v2/BottomSheet.svelte';
	import PuzzleStatistics from '$lib/v2/PuzzleStatistics.svelte';
	import Underline from '$lib/v2/Underline.svelte';

	let { data } = $props();

	const game = new GameState(data.puzzle);

	game.on('move', () => console.log('moved'));
	game.on('win', () => {
		setTimeout(() => (modalOpen = true), 250);
	});

	let modalOpen = $state(false);
</script>

<svelte:head>
	<title>Random puzzle</title>
</svelte:head>

<main class="flex flex-col items-center">
	<GameControls {game} />

	<h1 class="relative z-0 w-fit font-heading text-2xl font-bold">
		Random puzzle
		<Underline class="bg-orange-700" />
	</h1>

	<p class="mt-4 text-slate-400">
		Spell "<span class="font-bold text-white">{game.puzzle.data.solution}</span>" within
		{game.puzzle.data.maxMoves.bronze} moves
	</p>

	<GameBoard state={game} />

	<SolutionPreview state={game} />

	<BottomSheet bind:open={modalOpen}>
		<PuzzleStatistics
			moves={game.moves}
			maxMoves={{ bronze: 30, silver: 25, gold: 20 }}
			ownPlayed={150}
			ownStreak={5}
			ownMaxStreak={15}
			ownPercentile={30}
			globalDistribution={[
				{ value: 10, count: 2 },
				{ value: 11, count: 5 },
				{ value: 12, count: 8 },
				{ value: 13, count: 9 },
				{ value: 14, count: 0 },
				{ value: 15, count: 4 },
				{ value: 16, count: 10 },
				{ value: 17, count: 20 },
				{ value: 18, count: 18 },
				{ value: 19, count: 14 },
				{ value: 20, count: 10 },
				{ value: 21, count: 5 }
			]}
			globalAverageMoves={18}
			globalCompletions={457}
		/>
	</BottomSheet>
</main>
