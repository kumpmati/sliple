<script lang="ts">
	import EditorGrid from '$lib/components/editor/EditorGrid.svelte';
	import EditorSolution from '$lib/components/editor/EditorSolution.svelte';
	import EditorLevelSettings from '$lib/components/editor/EditorLevelSettings.svelte';
	import { createEditorStore } from '$lib/stores/editor';
	import { ArrowLeftIcon, PlayIcon, EyeIcon } from 'svelte-feather-icons';
	import EditorTileDrawer from '$lib/components/editor/EditorTileDrawer.svelte';
	import type { Tile } from '$lib/types/grid';
	import { copy } from '$lib/utils/copy';
	import EditorTileEditModal from '$lib/components/editor/EditorTileEditModal.svelte';
	import { toShareCode } from '$lib/services/generator/serialize';
	import { nanoid } from 'nanoid';
	import { goto } from '$app/navigation';

	const editor = createEditorStore();

	const handleTilePlace = (e: CustomEvent<{ type: string; x: number; y: number }>) => {
		const { type, x, y } = e.detail;
		const tile = editor.placeTile(type, x, y);

		if (tile) handleEditTile({ detail: tile } as any);
	};

	const handleEditTile = (e: CustomEvent<Tile>) => {
		showModal = true;
		// make a copy of the tile to prevent mutation
		currentTile = copy(e.detail);
	};

	const closeModal = () => {
		showModal = false;
		currentTile = null;
	};

	const handlePlay = async () => {
		const shareCode = toShareCode({
			id: nanoid(8),
			publishedAt: new Date(),
			version: 'custom.v1',
			data: $editor
		});

		await goto(`/play/community/${shareCode}`);
	};

	let showModal = false;
	let currentTile: Tile | null = null;
</script>

<svelte:head>
	<title>Level editor</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<nav>
	<a href="/"><ArrowLeftIcon /></a>
	<p class="center">Level editor</p>

	<span class="right">
		<a href="/editor/preview">
			<EyeIcon />
		</a>
		<button on:click={handlePlay}>
			<PlayIcon />
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

<main>
	<EditorLevelSettings {editor} />
	<span class="grid">
		<EditorGrid {editor} {currentTile} on:edit={handleEditTile} />
	</span>
	<EditorSolution {editor} />
	<EditorTileDrawer {editor} on:place={handleTilePlace} />
</main>

<style lang="scss">
	a {
		width: fit-content;
		display: flex;
	}

	nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;

		p {
			color: var(--text-subtle);
			margin: 0;
		}

		.right {
			margin-left: auto;
			display: flex;
			gap: 0.5rem;
		}

		button {
			background-color: transparent;
			cursor: pointer;
			border: none;
		}

		a,
		button {
			color: var(--text);
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
