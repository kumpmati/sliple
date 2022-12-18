<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import type { GoalBlock, LetterBlock, StickyBlock, WallBlock } from '$lib/types/grid';

	let numSwipes = 0;

	let t: LetterBlock = {
		id: 'a',
		type: 'letter',
		letter: 'A',
		x: 0,
		y: 4
	};
	let t2: LetterBlock = {
		id: 'b',
		type: 'letter',
		letter: 'B',
		x: 1,
		y: 1
	};

	let t3: GoalBlock = {
		id: 'c',
		type: 'goal',
		required: true,
		x: 1,
		y: 4,
		index: 0
	};

	let t4: StickyBlock = {
		id: 'd',
		type: 'sticky',
		x: 3,
		y: 4
	};

	let t5: WallBlock = {
		id: 'e',
		type: 'wall',
		x: 1,
		y: 2
	};
</script>

<h1>WordGrid</h1>

<Grid
	initialData={{
		width: 6,
		height: 6,
		blocks: [t, t2, t3, t4, t5]
	}}
	on:move={() => numSwipes++}
/>

<p>Number of moves: {numSwipes}</p>

<style lang="scss">
	:global(*) {
		box-sizing: border-box;
	}
</style>
