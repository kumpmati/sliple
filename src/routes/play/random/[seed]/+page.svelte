<script lang="ts">
	import type { PageData } from './$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import { ChevronsRightIcon, HomeIcon, RotateCcwIcon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { createGridStore } from '$lib/stores/grid';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { showTutorial } from '$lib/stores/tutorial';
	import { browser } from '$app/environment';

	export let data: PageData;

	$: grid = createGridStore(data.puzzle.data);

	let showEndMenu = false;
	let type: 'win' | 'loss' = 'win';
	let moves = 0;

	const handleFinish = (e: CustomEvent<FinishEvent>) => {
		type = e.detail.type;
		moves = e.detail.moves;

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
	<title>Sliple - Random puzzle</title>
	<meta
		name="description"
		content="Spell the word '{data.puzzle.data.solution}' within {data.puzzle.data.maxMoves
			.bronze} moves"
	/>
</svelte:head>

{#if showEndMenu}
	<EndMenu
		{type}
		{moves}
		puzzle={data.puzzle}
		shareText="I beat this random puzzle in {moves} moves! Can you beat it?"
		buttons={[
			{
				text: type === 'win' ? 'Improve' : 'Try again',
				onClick: handleReset,
				icon: RotateCcwIcon,
				hightlight: 'loss'
			},
			{
				text: 'Next puzzle',
				onClick: () => goto('/play/random').then(() => (showEndMenu = false)),
				icon: ChevronsRightIcon,
				hightlight: 'win'
			},
			{ text: 'Main menu', onClick: () => goto('/'), icon: HomeIcon }
		]}
	/>
{/if}

{#key data.puzzle.id}
	<LevelPlayer
		backLink="/"
		{grid}
		title="Random puzzle"
		titleColor="var(--purple-light)"
		canUndo
		on:finish={handleFinish}
		on:reset={handleReset}
	>
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
</style>
