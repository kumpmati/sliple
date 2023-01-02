<script lang="ts">
	import type { Grid } from '$lib/types/grid';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Sortable from 'sortablejs';
	import { createEventDispatcher } from 'svelte';
	import WallGraphic from '../graphics/WallGraphic.svelte';
	import LetterGraphic from '../graphics/LetterGraphic.svelte';
	import GoalGraphic from '../graphics/GoalGraphic.svelte';
	import StickyGraphic from '../graphics/StickyGraphic.svelte';

	export let editor: Writable<Grid>;

	const dispatch = createEventDispatcher();

	let sortable: any;

	let items = [
		{ id: 'wall', name: 'Wall' },
		{ id: 'letter', name: 'Letter' },
		{ id: 'goal', name: 'Goal' },
		{ id: 'sticky', name: 'Sticky' }
	];

	onMount(() => {
		Sortable.create(sortable, {
			group: {
				name: 'editor',
				put: false,
				pull: false
			},
			animation: 200,

			onEnd: (e) => {
				const targetTile = (e as any).explicitOriginalTarget as SVGRectElement;
				const x = parseInt(targetTile.dataset?.['x'] ?? '');
				const y = parseInt(targetTile.dataset?.['y'] ?? '');

				const type = e.item.dataset?.['type'];

				if (!isNaN(x) && !isNaN(y) && typeof type === 'string') {
					dispatch('place', { type, x, y });
				}
			}
		});
	});
</script>

<ul class="drawer" bind:this={sortable}>
	{#each items as item (item.id)}
		<li data-type={item.id}>
			<svg viewBox="0 0 68 68">
				{#if item.id === 'wall'}
					<WallGraphic />
				{:else if item.id === 'letter'}
					<LetterGraphic letter="A" />
				{:else if item.id === 'goal'}
					<GoalGraphic letter="A" />
				{:else if item.id === 'sticky'}
					<StickyGraphic />
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
