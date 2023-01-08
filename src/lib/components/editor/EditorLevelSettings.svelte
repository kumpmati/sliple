<script lang="ts">
	import type { Grid } from '$lib/types/grid';
	import { createEventDispatcher } from 'svelte';
	import { EditIcon } from 'svelte-feather-icons';
	import type { Writable } from 'svelte/store';
	import Modal from '../Modal.svelte';
	import NumberField from '../NumberField.svelte';

	export let editor: Writable<Grid>;

	const dispatch = createEventDispatcher();

	let showModal = false;
	let width = $editor.width;
	let height = $editor.height;
	let maxMoves = $editor.maxMoves;

	const handleCancel = () => {
		width = $editor.width;
		height = $editor.height;
		maxMoves = $editor.maxMoves;
		showModal = false;
		dispatch('cancel');
	};

	const handleConfirm = () => {
		$editor.width = width;
		$editor.height = height;
		$editor.maxMoves = maxMoves;

		// remove any tiles outside the resized grid
		$editor.tiles = $editor.tiles.filter((t) => t.x < width && t.y < height);

		showModal = false;
		dispatch('confirm');
	};
</script>

{#if showModal}
	<div class="modal">
		<Modal
			title="Edit level settings"
			closeButton={true}
			on:close={handleCancel}
			on:confirm={handleConfirm}
		>
			<span class="modal-content">
				<span class="row">
					Size
					<span>
						<NumberField
							bind:value={width}
							min={2}
							max={10}
							style="width: 8ch; font-family: var(--font-heading); font-weight: bold"
						/>
						x
						<NumberField
							bind:value={height}
							min={2}
							max={10}
							style="width: 8ch; font-family: var(--font-heading); font-weight: bold"
						/>
					</span>
				</span>

				<span class="row">
					Moves (gold)

					<NumberField
						bind:value={maxMoves.gold}
						min={1}
						max={100}
						style="width: 10ch; font-family: var(--font-heading); font-weight: bold"
					/>
				</span>

				<span class="row">
					Moves (silver)

					<NumberField
						bind:value={maxMoves.silver}
						min={1}
						max={100}
						style="width: 10ch; font-family: var(--font-heading); font-weight: bold"
					/>
				</span>

				<span class="row">
					Moves (bronze)

					<NumberField
						bind:value={maxMoves.bronze}
						min={1}
						max={100}
						style="width: 10ch; font-family: var(--font-heading); font-weight: bold"
					/>
				</span>
			</span>
		</Modal>
	</div>
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="settings">
	<h2>Settings</h2>

	<button class="edit" on:click={() => (showModal = true)}>
		<EditIcon size="14" />
	</button>

	<span class="row">
		<p>Size</p>
		<p class="value">{$editor.width}x{$editor.height}</p>
	</span>
	<span class="row">
		<p>Moves</p>
		<p class="value">
			{$editor.maxMoves.gold} / {$editor.maxMoves.silver} / {$editor.maxMoves.bronze}
		</p>
	</span>
</div>

<style lang="scss">
	.settings {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: var(--border-radius);
		background-color: var(--orange-light);
		padding: 10px 20px 20px 20px;
		max-width: 250px;
		margin: 0 auto;

		p {
			margin: 0;
			color: var(--gray);
		}

		h2 {
			font-family: var(--font-heading);
			font-size: 16px;
			margin: 0;
		}

		.edit {
			color: var(--gray);
			background-color: transparent;
			border: none;
			position: absolute;
			top: 12px;
			right: 12px;
			cursor: pointer;
		}

		.row {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin: 2px 0;

			.value {
				color: var(--black);
				font-weight: bold;
				font-family: var(--font-heading);
			}
		}
	}

	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}

	.modal-content {
		max-width: 250px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100vw;

		.row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: var(--gray);
		}
	}
</style>
