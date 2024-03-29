<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import { createGridStore } from '$lib/stores/grid';
	import { showTutorial } from '$lib/stores/tutorial';
	import { userStore } from '$lib/stores/user';
	import type { Campaign } from '$lib/types/campaign';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { getFirstInProgressLevel } from '$lib/utils/campaign';
	import { onMount } from 'svelte';
	import {
		CheckIcon,
		ChevronRightIcon,
		ChevronsRightIcon,
		HomeIcon,
		RotateCcwIcon
	} from 'svelte-feather-icons';

	export let data: Campaign;

	let currentLevel = browser ? getFirstInProgressLevel(data.levels, $userStore) : 0;

	let showMenu = false;
	let endType: 'win' | 'loss' = 'win';
	let moves = 0;

	$: isLastOne = currentLevel >= data.levels.length - 1;
	$: grid = data.levels.length > 0 ? createGridStore(data.levels[currentLevel].data) : null;

	// when the puzzle changes, mark it as in progress
	$: {
		userStore.deletePuzzleProgress(data.levels[currentLevel].id);
		userStore.markPuzzleInProgress(data.levels[currentLevel].id);
	}

	const handleFinish = (e: CustomEvent<FinishEvent>) => {
		endType = e.detail.type;
		moves = e.detail.moves;
		userStore.markPuzzleComplete(data.levels[currentLevel].id, 'completed', null);

		setTimeout(() => (showMenu = true), 500);
	};

	const handleNextLevel = () => {
		if (isLastOne) {
			data.levels.forEach((l) => userStore.deletePuzzleProgress(l.id));
			goto('/');
			return;
		}

		grid?.reset();
		currentLevel = (currentLevel + 1) % data.levels.length;
		showMenu = false;
	};

	const handleResetLevel = () => {
		grid?.reset();
		showMenu = false;
	};

	onMount(() => ($showTutorial = false));
</script>

<svelte:head>
	<title>Tutorial - level {currentLevel + 1}</title>
	<meta name="description" content="Learn how to play the game" />
</svelte:head>

{#if showMenu}
	<EndMenu
		type={endType}
		{moves}
		puzzle={{ ...data.levels[currentLevel], publishedAt: data.publishedAt, version: '2' }}
		buttons={[
			{
				text: isLastOne ? 'Finish' : 'Next tutorial',
				onClick: handleNextLevel,
				icon: isLastOne ? CheckIcon : ChevronsRightIcon,
				hightlight: 'win',
				enabled: 'win'
			},
			{ text: 'Try again', onClick: handleResetLevel, icon: RotateCcwIcon, hightlight: 'loss' }
		]}
	/>
{/if}

{#if data.levels.length > 0 && grid}
	{#key currentLevel}
		<LevelPlayer
			backLink="/"
			title="Tutorial ({currentLevel + 1} / {data.levels.length})"
			{grid}
			on:finish={handleFinish}
			on:reset={handleResetLevel}
		>
			<p slot="description">
				{data.levels[currentLevel].message ?? 'Complete the puzzle'}
			</p>
		</LevelPlayer>
	{/key}
{/if}

<style lang="scss">
	p {
		color: var(--gray);
		max-width: 30ch;
	}
</style>
