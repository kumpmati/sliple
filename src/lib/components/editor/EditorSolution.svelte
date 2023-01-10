<script lang="ts">
	import type { EditorStore } from '$lib/stores/editor';
	import { isGoalTile } from '$lib/utils/typeguards';

	export let editor: EditorStore;

	$: $editor.solution = $editor.tiles
		.reduce<string[]>((s, tile) => {
			if (!isGoalTile(tile)) return s;

			s[tile.index] = tile.letter;
			return s;
		}, [])
		.join('');
</script>

<div class="solution">
	<h3>Solution</h3>
	<p class:empty={$editor?.solution.length === 0}>
		{$editor?.solution.length === 0 ? '< empty >' : $editor?.solution}
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
