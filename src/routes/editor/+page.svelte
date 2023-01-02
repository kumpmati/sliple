<script lang="ts">
	import EditorGrid from '$lib/components/editor/EditorGrid.svelte';
	import EditorSolution from '$lib/components/editor/EditorSolution.svelte';
	import EditorLevelSettings from '$lib/components/editor/EditorLevelSettings.svelte';
	import { createEditorStore } from '$lib/stores/editor';
	import { ArrowLeftIcon, PlayIcon, SaveIcon } from 'svelte-feather-icons';
	import EditorTileDrawer from '$lib/components/editor/EditorTileDrawer.svelte';
	import { createGoal, createLetter, createSticky, createWall } from '$lib/utils/parse';
	import type { Tile } from '$lib/types/grid';

	const editor = createEditorStore();

	const handleTilePlace = (e: CustomEvent<any>) => {
		const { type, x, y } = e.detail;

		const highestIndex = $editor.tiles.reduce((t, curr) => (curr.type === 'goal' ? t + 1 : t), -1);

		let tile: Tile | null = null;

		switch (type) {
			case 'wall': {
				tile = createWall(x, y);
				break;
			}
			case 'letter': {
				tile = createLetter(x, y, 'A');
				break;
			}
			case 'goal': {
				tile = createGoal(x, y, ['A', (highestIndex + 1).toString()]);
				break;
			}
			case 'sticky': {
				tile = createSticky(x, y);
				break;
			}
		}

		if (tile) {
			$editor.tiles = [...$editor.tiles, tile];
		}
	};
</script>

<svelte:head>
	<title>Sliple - Level editor</title>
</svelte:head>

<nav>
	<a href="/"><ArrowLeftIcon /></a>
	<p>Level editor</p>

	<span>
		<button on:click={() => null}><PlayIcon /></button>
		<button on:click={() => null}><SaveIcon /></button>
	</span>
</nav>

<main>
	<EditorLevelSettings {editor} />
	<EditorGrid {editor} />
	<EditorSolution {editor} />
	<EditorTileDrawer {editor} on:place={handleTilePlace} />
</main>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;

		p {
			color: var(--gray);
		}

		button {
			background-color: transparent;
			cursor: pointer;
			border: none;
		}

		a {
			color: var(--black);
		}
	}

	main {
		margin: 16px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
</style>
