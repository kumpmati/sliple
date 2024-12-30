<script lang="ts">
	import TablerPlay from '~icons/tabler/play';
	import TablerDice3 from '~icons/tabler/dice-3';
	import Button from '$lib/v2/Button.svelte';
	import GameBoard from '$lib/v2/game/GameBoard.svelte';
	import GameControls from '$lib/v2/game/GameControls.svelte';
	import { GameState } from '$lib/v2/game/state.svelte';
	import Underline from '$lib/v2/Underline.svelte';
	import { sleep } from '@antfu/utils';
	import { onMount } from 'svelte';

	let { data } = $props();

	const game = new GameState(data.tutorial.levels[0]);

	let currentLevel = $state(0);
	let isDone = $state(false);

	onMount(() => {
		game.on('end', ({ type }) => {
			sleep(1000).then(() => {
				if (type === 'w') {
					currentLevel++;
					if (currentLevel < data.tutorial.levels.length) {
						game.setPuzzle(data.tutorial.levels[currentLevel]);
					} else {
						isDone = true;
					}
				} else {
					game.reset();
				}
			});
		});
	});
</script>

<svelte:head>
	<title>Tutorial</title>
	<meta name="description" content="Learn how to play the game" />
</svelte:head>

<main class="flex flex-col items-center">
	<GameControls {game} statsOpen={false} showStatsButton={false} />

	{#if !isDone}
		<h1 class="relative z-0 w-fit font-heading text-2xl font-bold">
			Tutorial ({currentLevel + 1} / {data.tutorial.levels.length})
			<Underline class="bg-orange-700" />
		</h1>

		<p class="mt-4 max-w-sm text-center text-sm text-slate-400">
			{data.tutorial.levels[currentLevel].message}
		</p>

		<GameBoard {game} />
	{:else}
		<h1 class="relative z-0 w-fit font-heading text-2xl font-bold">
			Tutorial complete!
			<Underline class="bg-orange-700" />
		</h1>

		<p class="mt-8 text-slate-400">Continue playing:</p>

		<div class="mt-4 flex flex-col gap-4">
			<Button color="blue" href="/play/daily">
				Daily puzzle <TablerPlay class="size-5" />
			</Button>
			<Button color="orange" href="/play/random">
				Random puzzle
				<TablerDice3 class="size-5" />
			</Button>
		</div>
	{/if}
</main>
