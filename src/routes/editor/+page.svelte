<script lang="ts">
	import EditorGrid from '$lib/components/editor/EditorGrid.svelte';
	import EditorSolution from '$lib/components/editor/EditorSolution.svelte';
	import EditorLevelSettings from '$lib/components/editor/EditorLevelSettings.svelte';
	import { createEditorStore } from '$lib/stores/editor';
	import { ArrowLeftIcon, PlayIcon, SaveIcon } from 'svelte-feather-icons';
	import EditorTileDrawer from '$lib/components/editor/EditorTileDrawer.svelte';
	import type { Tile } from '$lib/types/grid';
	import { copy } from '$lib/utils/copy';
	import EditorTileEditModal from '$lib/components/editor/EditorTileEditModal.svelte';
	import EditorSaveForm from '$lib/components/editor/EditorSaveForm.svelte';

	const editor = createEditorStore();

	const handleTilePlace = (e: CustomEvent<{ type: string; x: number; y: number }>) => {
		const { type, x, y } = e.detail;
		editor.placeTile(type, x, y);
	};

	const handleEditTile = (e: CustomEvent) => {
		showModal = true;
		// make a copy of the tile to prevent mutation
		currentTile = copy(e.detail);
	};

	const closeModal = () => {
		showModal = false;
		currentTile = null;
	};

	let showModal = false;
	let showSaveModal = false;
	let currentTile: Tile | null = null;
</script>

<svelte:head>
	<title>Level editor</title>
</svelte:head>

<nav>
	<a href="/"><ArrowLeftIcon /></a>
	<p class="center">Level editor</p>

	<span class="right">
		<a href="/editor/preview"><PlayIcon /></a>
		<button
			on:click={() => {
				showSaveModal = true;
				console.log($editor);
			}}
		>
			<SaveIcon />
		</button>
	</span>
</nav>

<EditorTileEditModal
	{editor}
	{currentTile}
	{showModal}
	on:cancel={closeModal}
	on:confirm={closeModal}
/>

<EditorSaveForm {editor} {showSaveModal} on:close={() => (showSaveModal = false)} />

<main>
	<EditorLevelSettings {editor} />
	<span class="grid">
		<EditorGrid {editor} {currentTile} on:edit={handleEditTile} />
	</span>
	<EditorSolution {editor} />
	<EditorTileDrawer {editor} on:place={handleTilePlace} />
</main>

<style lang="scss">
	nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;

		p {
			color: var(--gray);
		}

		.right {
			margin-left: auto;
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

	.grid {
		margin-top: 40px;
	}
</style>
