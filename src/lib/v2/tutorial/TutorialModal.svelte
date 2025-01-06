<script lang="ts">
	import { showTutorial } from '$lib/stores/tutorial';
	import { onMount, untrack } from 'svelte';
	import BottomSheet from '../BottomSheet.svelte';
	import GameBoard from '../game/GameBoard.svelte';
	import { GameState } from '../game/state.svelte';
	import { tutorial } from './tutorial';
	import { sleep } from '$lib/utils/sleep';
	import Button from '../Button.svelte';
	import { fly } from 'svelte/transition';
	import TablerArrowRight from '~icons/tabler/arrow-right';
	import TablerCheck from '~icons/tabler/check';
	import { EndType } from '../persisted/types';

	let step = $state(0);
	let currentLevel = $derived(tutorial.levels[step]);
	let isDone = $derived(step === tutorial.levels.length - 1);

	// svelte-ignore state_referenced_locally
	const game = new GameState(currentLevel);

	$effect(() => {
		currentLevel; // reactivity dependency
		untrack(() => game.setPuzzle(currentLevel));
	});

	const nextLevel = () => {
		if (!isDone) {
			step++;
		} else {
			$showTutorial = false;
		}
	};

	onMount(() => {
		game.on('end', (d) => {
			if (d.type === EndType.LOSS) {
				sleep(1500).then(() => game.reset());
			} else if (step < tutorial.levels.length) {
				sleep(1500).then(() => nextLevel());
			} else {
				game.reset();
			}
		});
	});
</script>

<BottomSheet open={$showTutorial} onClose={() => ($showTutorial = false)}>
	<h1 class="text-center font-heading text-3xl font-bold text-white">How to play</h1>

	{#key step}
		<div in:fly={{ x: 10, duration: 200 }} class="mt-8">
			<p class="text-center text-slate-400">{currentLevel.message}</p>

			<GameBoard {game} class="mt-8" />

			<p class="my-12 text-center text-sm text-slate-400">{currentLevel.tip}</p>
		</div>
	{/key}

	<div class="flex items-center justify-between">
		<p>{step + 1}/{tutorial.levels.length}</p>
		<Button onclick={() => nextLevel()} color="darkgray" raised={false}>
			{#if isDone}
				Finish
				<TablerCheck class="size-5" />
			{:else}
				Skip
				<TablerArrowRight class="size-5" />
			{/if}
		</Button>
	</div>
</BottomSheet>
