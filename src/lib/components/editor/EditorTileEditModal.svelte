<script lang="ts">
	import type { EditorStore } from '$lib/stores/editor';
	import type { Tile } from '$lib/types/grid';
	import { isDirectionTile, isGoalTile, isLetterTile } from '$lib/utils/typeguards';
	import { createEventDispatcher } from 'svelte';
	import { TrashIcon } from 'svelte-feather-icons';
	import { fly } from 'svelte/transition';
	import Modal from '../Modal.svelte';
	import TextField from '../TextField.svelte';

	export let currentTile: Tile | null;
	export let editor: EditorStore;
	export let showModal: boolean;

	const dispatch = createEventDispatcher();

	const handleEditConfirm = () => {
		if (!currentTile) return dispatch('cancel');

		const index = $editor.tiles.findIndex((t) => t.id === currentTile?.id);
		if (index === -1) return dispatch('cancel');

		$editor.tiles[index] = currentTile;

		dispatch('confirm');
	};

	const handleDeleteTile = () => {
		if (!currentTile) return dispatch('cancel');

		const index = $editor.tiles.findIndex((t) => t.id === currentTile?.id);
		if (index === -1) return dispatch('cancel');

		$editor.tiles.splice(index, 1);
		$editor.tiles = $editor.tiles;

		dispatch('confirm');
	};
</script>

{#if showModal && currentTile}
	<div class="modal" transition:fly={{ duration: 200, y: -10 }}>
		<Modal
			title="Edit {currentTile?.type} tile {isGoalTile(currentTile) ? currentTile.index + 1 : ''}"
			closeButton={true}
			on:close={() => dispatch('cancel')}
			on:confirm={handleEditConfirm}
		>
			<span>
				{#if isLetterTile(currentTile) || isGoalTile(currentTile)}
					<TextField
						bind:value={currentTile.letter}
						maxLength={1}
						style="text-align: center; font-weight: bold"
					/>
				{/if}

				{#if isDirectionTile(currentTile)}
					<div class="dir">
						<label>
							<input type="radio" bind:group={currentTile.direction} value="top" />
							Up
						</label>
						<label>
							<input type="radio" bind:group={currentTile.direction} value="bottom" />
							Down
						</label>
						<label>
							<input type="radio" bind:group={currentTile.direction} value="left" />
							Left
						</label>
						<label>
							<input type="radio" bind:group={currentTile.direction} value="right" />
							Right
						</label>
					</div>
				{/if}

				<button class="delete" on:click={handleDeleteTile}>Delete <TrashIcon size="16" /></button>
			</span>
		</Modal>
	</div>
{/if}

<style lang="scss">
	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
		max-width: 250px;
		width: 100%;
	}

	.dir {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
	}

	span {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;

		.delete {
			border: none;
			background-color: transparent;
			color: var(--red);
			cursor: pointer;
			width: fit-content;
			display: flex;
			align-items: center;
			gap: 8px;
			font-family: var(--font-body);
			font-size: 16px;
			height: 32px;
			padding: 0 12px;
			border-radius: var(--border-radius-small);
			transition: color 150ms;

			&:hover {
				background-color: var(--red-light);
				color: var(--red-dark);
			}
		}
	}
</style>
