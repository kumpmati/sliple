<script lang="ts">
	import { createGridStore } from '$lib/stores/grid';
	import { userStore } from '$lib/stores/user';
	import type { Campaign } from '$lib/types/campaign';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { ArrowLeftIcon, ChevronRightIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button.svelte';
	import EndMenu from '../EndMenu.svelte';
	import LevelPlayer from '../LevelPlayer.svelte';
	import { goto } from '$app/navigation';
	import { getRank } from '$lib/utils/grid';

	export let data: Campaign;
	export let currentLevel: number;

	const dispatch = createEventDispatcher();

	let showMenu = false;
	let endType: 'win' | 'loss' = 'win';
	let moves = 0;

	$: isLastOne = currentLevel >= data.levels.length - 1;
	$: grid = data.levels.length > 0 ? createGridStore(data.levels[currentLevel].data) : null;

	// when the puzzle changes, mark it as in progress
	$: userStore.markPuzzleInProgress(data.levels[currentLevel].id);

	const handleFinish = (e: CustomEvent<FinishEvent>) => {
		endType = e.detail.type;
		moves = e.detail.moves;
		userStore.markPuzzleComplete(data.levels[currentLevel].id, 'completed', getRank($grid!, moves));

		setTimeout(() => (showMenu = true), 500);
	};

	const handleNextLevel = () => {
		if (isLastOne) {
			return goto(`/campaign/${data.id}`);
		}

		grid?.reset();
		showMenu = false;

		dispatch('next');
	};

	const handleResetLevel = () => {
		grid?.reset();
		showMenu = false;
	};
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<p class="name">
	{data.name} ({currentLevel + 1} / {data.levels.length})
</p>

{#if showMenu}
	<EndMenu
		type={endType}
		{moves}
		puzzle={{ ...data.levels[currentLevel], publishedAt: data.publishedAt, version: '2' }}
	>
		<Button on:click={handleResetLevel} color="red" highlight={endType === 'loss'}>
			Try again
			<RotateCcwIcon />
		</Button>

		{#if endType === 'win'}
			<Button on:click={handleNextLevel} color="green" highlight={endType === 'win'}>
				{#if isLastOne}
					Back to levels
				{:else}
					Next level
				{/if}
				<ChevronRightIcon />
			</Button>
		{/if}
	</EndMenu>
{/if}

{#if data.levels.length > 0 && grid}
	{#key currentLevel}
		<LevelPlayer
			backLink="/campaign/{data.id}"
			title="Level {currentLevel + 1}"
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

	.name {
		position: absolute;
		top: 2px;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
