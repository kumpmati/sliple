<script lang="ts">
	import { onMount } from 'svelte';
	import Sortable from 'sortablejs';
	import { createEventDispatcher } from 'svelte';
	import WallGraphic from '../graphics/WallGraphic.svelte';
	import LetterGraphic from '../graphics/LetterGraphic.svelte';
	import GoalGraphic from '../graphics/GoalGraphic.svelte';
	import StickyGraphic from '../graphics/StickyGraphic.svelte';
	import type { EditorStore } from '$lib/stores/editor';

	export let editor: EditorStore;

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

			onEnd: (e: any) => {
				const { layerX, layerY } = e.originalEvent;
				const { width, height } = e.originalEvent.target.getBoundingClientRect();

				// calculate x and y based on position inside the grid element
				const x = Math.floor((layerX / width) * $editor.width);
				const y = Math.floor((layerY / height) * $editor.height);
				const type = e.item.dataset?.['type'];

				if (x < 0 || x >= $editor.width || y < 0 || y >= $editor.height || !type) {
					return;
				}

				dispatch('place', { type, x, y });
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
