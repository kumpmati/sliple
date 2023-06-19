<script lang="ts">
	import type { PageData } from './$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import { ChevronsRightIcon, HomeIcon, RotateCcwIcon, StarIcon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { createGridStore } from '$lib/stores/grid';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { showTutorial } from '$lib/stores/tutorial';
	import { browser } from '$app/environment';
	import { authUser } from '$lib/stores/auth';
	import { tooltip } from '$lib/utils/tooltip';

	export let data: PageData;

	$: grid = createGridStore(data.puzzle.data);

	let showEndMenu = false;
	let type: 'win' | 'loss' = 'win';
	let moves = 0;
	let loadingSavedStatus = false;
	$: isSaved = !!data.saved;

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

	const handleSaveLevel = async () => {
		if (!$authUser) {
			return await goto('/auth/signin');
		}
		loadingSavedStatus = true;

		try {
			if (!isSaved) {
				const response = await fetch('/api/puzzle/save', {
					method: 'POST',
					body: JSON.stringify({
						type: 'random',
						puzzle: data.puzzle
					})
				}).then((d) => d.json());

				console.log('save', response);
				if (response?.puzzleId) {
					isSaved = true;
				}
			} else {
				const response = await fetch('/api/puzzle/unsave', {
					method: 'POST',
					body: JSON.stringify({ puzzleId: data.puzzle.id })
				}).then((d) => d.json());

				console.log('unsave', response);
				if (response?.puzzleId) {
					isSaved = false;
				}
			}
		} catch (err) {
			console.log('error while saving...', err);
		} finally {
			loadingSavedStatus = false;
		}
	};
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
		<button
			on:click|preventDefault={handleSaveLevel}
			slot="buttons"
			use:tooltip={!$authUser ? 'You must be signed in to favourite levels' : ''}
			class:disabled={loadingSavedStatus || !$authUser}
		>
			<StarIcon size="24" class="star gold {isSaved ? 'filled' : ''}" />
		</button>

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

	button {
		border: none;
		background-color: transparent;
		display: flex;
		cursor: pointer;

		&.disabled {
			opacity: 0.5;
		}

		:global(.star) {
			stroke: var(--text);
		}

		:global(.star.filled) {
			fill: var(--orange);
			stroke: var(--orange);
		}
	}
</style>
