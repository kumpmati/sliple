<script lang="ts">
	import type { PageData } from './$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import Button from '$lib/components/Button.svelte';
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
	<EndMenu {type} {moves} puzzle={data.puzzle}>
		{#if type === 'win'}
			<Button
				on:click={() => goto('/play/random').then(() => (showEndMenu = false))}
				color="green"
				highlight
			>
				Next puzzle
				<ChevronsRightIcon />
			</Button>

			<Button on:click={handleReset}>
				Try again
				<RotateCcwIcon />
			</Button>
		{:else}
			<Button on:click={handleReset} color="red" highlight>
				Try again
				<RotateCcwIcon />
			</Button>

			<Button on:click={() => goto('/play/random').then(() => (showEndMenu = false))}>
				Next puzzle
				<ChevronsRightIcon />
			</Button>
		{/if}

		<Button on:click={() => goto('/')}>
			Main menu
			<HomeIcon />
		</Button>
	</EndMenu>
{/if}

{#key data.puzzle.id}
	<LevelPlayer
		backLink="/"
		{grid}
		title="Random puzzle"
		titleColor="var(--purple-light)"
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
		color: var(--gray);
	}

	.highlight {
		font-weight: bold;
		color: var(--black);
	}
</style>
