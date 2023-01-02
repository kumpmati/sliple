<script lang="ts">
	import type { Grid } from '$lib/types/grid';
	import type { Writable } from 'svelte/store';
	import { dndzone } from 'svelte-dnd-action';
	import Wall from '../grid/tiles/Wall.svelte';
	import Letter from '../grid/tiles/Letter.svelte';
	import LetterTile from '../graphics/LetterTile.svelte';
	import WallTile from '../graphics/WallTile.svelte';

	export let editor: Writable<Grid>;

	let items = [
		{ id: 'wall', name: 'Wall' },
		{ id: 'letter', name: 'Letter' },
		{ id: 'goal', name: 'Goal' },
		{ id: 'sticky', name: 'Sticky' }
	];
</script>

<ul
	class="drawer"
	use:dndzone={{ type: 'editor', items: items, dropFromOthersDisabled: true }}
	on:consider={(e) => (items = e.detail.items)}
	on:finalize={(e) => (items = e.detail.items)}
>
	{#each items as item (item.id)}
		<li>
			<svg width="100%" viewBox="0 0 {68} {68}" fill="none" xmlns="http://www.w3.org/2000/svg">
				{#if item.id === 'wall'}
					<WallTile />
				{:else if item.id === 'letter'}
					<LetterTile />
				{/if}
			</svg>
		</li>
	{/each}
</ul>

<style lang="scss">
	.drawer {
		border-radius: var(--border-radius);
		background-color: var(--orange-light);
		display: flex;
		flex-direction: row;
		gap: 8px;
		list-style: none;
		padding: 0 8px;

		li {
			width: 64px;
			height: 64px;
			transform: translateY(-20px);
		}
	}
</style>
