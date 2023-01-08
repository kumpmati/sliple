<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import EndMenu from '$lib/components/EndMenu.svelte';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import { createEditorStore } from '$lib/stores/editor';
	import { createGridStore } from '$lib/stores/grid';
	import type { FinishEvent } from '$lib/types/puzzle';
	import { GridIcon, RotateCcwIcon } from 'svelte-feather-icons';

	const editor = createEditorStore();
	const grid = createGridStore($editor);

	let showMenu = false;
	let endType: 'win' | 'loss' = 'win';
	let moves = 0;

	const handleFinish = (e: CustomEvent<FinishEvent>) => {
		endType = e.detail.type;
		moves = e.detail.moves;

		setTimeout(() => {
			showMenu = true;
		}, 500);
	};

	const handleReset = () => {
		grid.reset();
		showMenu = false;
	};
</script>

<svelte:head>
	<title>Level editor - Preview</title>
</svelte:head>

{#if showMenu}
	<EndMenu
		type={endType}
		{moves}
		puzzle={{ publishedAt: new Date(), id: 'preview', data: $grid, version: '2' }}
	>
		<Button on:click={handleReset}>
			Retry
			<RotateCcwIcon />
		</Button>

		<Button on:click={() => goto('/editor')}>
			Back to editor
			<GridIcon />
		</Button>
	</EndMenu>
{/if}

<LevelPlayer {grid} title="Editor preview" on:finish={handleFinish}>
	<p slot="description">
		Spell “<span class="highlight">{$grid.solution.toLowerCase()}</span>” within
		<span class="highlight">{$grid.maxMoves.bronze}</span> moves
	</p>
</LevelPlayer>

<style lang="scss">
	p {
		color: var(--gray);
	}

	.highlight {
		font-weight: bold;
		color: var(--black);
	}
</style>
