<script lang="ts">
	import type { PuzzleAnalysisData } from '$lib/services/generator/analyze';
	import type { Puzzle } from '$lib/types/puzzle';
	import { BarChart2Icon, XIcon } from 'svelte-feather-icons';
	import ThreeStarDots from '../graphics/ThreeStarDots.svelte';
	import CompletedPuzzleIconGold from '../graphics/CompletedPuzzleIconGold.svelte';
	import CompletedPuzzleIconSilver from '../graphics/CompletedPuzzleIconSilver.svelte';
	import CompletedPuzzleIconBronze from '../graphics/CompletedPuzzleIconBronze.svelte';

	export let puzzle: Puzzle;
	export let analysis: PuzzleAnalysisData;

	let ref: HTMLDialogElement;
	let show = false;

	const toggleModal = () => {
		if (show) {
			ref.close();
			show = false;
		} else {
			ref.showModal();
			show = true;
		}
	};
</script>

<button class="toggle" on:click={toggleModal}>
	<BarChart2Icon />
</button>

<dialog bind:this={ref} on:close={() => (show = false)}>
	<button class="close" on:click={toggleModal}>
		<XIcon size="20" />
	</button>

	<h2>Puzzle analytics <sup>Beta</sup></h2>

	<table>
		<tr>
			<th style="width: 33%">
				<div style="display: flex; align-items: center; gap: 0.5rem;">
					<CompletedPuzzleIconGold size={20} /> Gold
				</div>
			</th>

			<th style="width: 33%">
				<div style="display: flex; align-items: center; gap: 0.5rem;">
					<CompletedPuzzleIconSilver size={20} /> Silver
				</div>
			</th>

			<th style="width: 33%">
				<div style="display: flex; align-items: center; gap: 0.5rem;">
					<CompletedPuzzleIconBronze size={20} />Bronze
				</div>
			</th>
		</tr>

		<tr>
			<td>{puzzle.data.maxMoves.gold} moves</td>
			<td>{puzzle.data.maxMoves.silver} moves</td>
			<td>{puzzle.data.maxMoves.bronze} moves</td>
		</tr>
	</table>

	<table>
		<tr>
			<td>Optimal Solution*</td>
			<td class="bold" style="width:33%">{analysis.minRequiredMoves} moves</td>
		</tr>
	</table>

	<small>
		*This feature is in Beta and might show a number that is smaller than what is actually possible.
	</small>
</dialog>

<style lang="scss">
	.bold {
		font-weight: bold;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 0;
		cursor: pointer;
		background-color: transparent;
		border: none;
		color: var(--text);
	}

	dialog {
		background-color: var(--dialog-bg);
		position: relative;
		padding: 1rem;
		border: 1px solid var(--dialog-border);
		border-radius: 0.75rem;
		width: calc(100% - 1rem);
		max-width: 400px;
		color: var(--text);
		box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.5);
		}

		h2 {
			font-family: var(--font-heading);
			text-align: center;
			margin: 0;
			margin-bottom: 2rem;

			sup {
				font-size: 12px;
				font-family: var(--font-body);
				font-weight: normal;
				opacity: 0.5;
			}
		}

		.close {
			color: var(--text-subtle);
			position: absolute;
			top: 0.5rem;
			right: 0.5rem;

			&:hover {
				color: var(--text);
			}
		}
	}
	table {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		margin-bottom: 2rem;

		th {
			font-weight: normal;
			color: var(--text-subtle);
			padding: 0.5rem 0;
		}

		td {
			color: var(--text);
			padding: 0.5rem;
			border: 1px solid var(--table-border);
		}
	}

	small {
		color: var(--text-subtle);
		opacity: 0.5;
	}
</style>
