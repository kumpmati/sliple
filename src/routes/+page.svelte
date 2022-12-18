<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import type { GoalTile, LetterTile, StickyTile, WallTile } from '$lib/types/grid';

	let t: LetterTile = { id: 'a', type: 'letter', letter: 'A', x: 0, y: 4 };
	let t2: LetterTile = { id: 'b', type: 'letter', letter: 'B', x: 1, y: 1 };
	let t3: GoalTile = { id: 'c', type: 'goal', required: true, x: 0, y: 4, index: 0 };
	let t31: GoalTile = { id: 'c1', type: 'goal', required: false, x: 1, y: 4, index: 1 };
	let t4: StickyTile = { id: 'd', type: 'sticky', x: 3, y: 4 };
	let t41: StickyTile = { id: 'd1', type: 'sticky', x: 1, y: 4 };
	let t5: WallTile = { id: 'e', type: 'wall', x: 1, y: 2 };

	const store = createGridStore({
		width: 5,
		height: 5,
		numMovesTaken: 0,
		tiles: [t, t2, t3, t31, t4, t41, t5]
	});

	const word = currentWord(store);
</script>

<h1>WordGrid</h1>

<Grid {store} />

<p>Number of moves: {$store.numMovesTaken}</p>

<p>Word: {$word}</p>

<style lang="scss">
	:global(*) {
		box-sizing: border-box;
	}
</style>
