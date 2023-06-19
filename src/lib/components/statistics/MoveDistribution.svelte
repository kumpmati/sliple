<script lang="ts">
	import type { PuzzleStats } from '$lib/schemas/puzzle';
	import type { Puzzle } from '$lib/types/puzzle';
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';

	export let data: PuzzleStats | null;
	export let puzzle: Puzzle;

	$: movesDistribution = Array(puzzle.data.maxMoves.bronze + 1)
		.fill(null)
		.map((_, i) => ({
			x: i,
			y: data?.completions.filter((c) => c.moves === i).length
		}));

	let ref: HTMLCanvasElement;
	let chart;

	onMount(() => {
		chart = new Chart(ref, {
			type: 'bar',
			data: {
				labels: Array(puzzle.data.maxMoves.bronze + 1)
					.fill(0)
					.map((_, i) => i),
				datasets: [
					{
						label: 'Number of people',
						data: movesDistribution.map((m) => m.y)
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				responsive: true,
				aspectRatio: 2 / 1,
				scales: {
					y: {
						beginAtZero: true,
						display: false,
						grace: '10%'
					}
				}
			}
		});

		chart.render();
	});
</script>

{#if data}
	<canvas bind:this={ref} />
{:else}
	<p>No data</p>
{/if}
