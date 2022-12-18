<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import type { GoalBlock, LetterBlock } from '$lib/types/grid';

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
		y: 4
	};
</script>

<h1>WordGrid</h1>

<Grid
	initialData={{
		width: 5,
		height: 5,
		blocks: [t, t2, t3]
	}}
/>

<style lang="scss">
	:global(*) {
		box-sizing: border-box;
	}
</style>
