<script lang="ts">
	import type { Grid } from '$lib/types/grid';
	import { isGoalTile } from '$lib/utils/typeguards';
	import type { Writable } from 'svelte/store';

	export let editor: Writable<Grid>;

	$: solution = $editor.tiles.reduce<string[]>((s, tile) => {
		if (!isGoalTile(tile)) return s;

		s[tile.index] = tile.letter;
		return s;
	}, []);
</script>

<div class="solution">
	<h3>Solution</h3>
	<p class:empty={solution.length === 0}>
		{solution.length === 0 ? '< empty >' : solution.join('')}
	</p>
</div>

<style lang="scss">
	.solution {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 16px 0;

		h3 {
			font-size: 14px;
			font-family: var(--font-heading);
			margin: 0;
		}

		p {
			&.empty {
				color: var(--gray);
			}
		}
	}
</style>
