<script lang="ts">
	import type { PuzzleStats } from '$lib/schemas/puzzle';
	import type { Puzzle } from '$lib/types/puzzle';
	import TabView from '../TabView.svelte';
	import Leaderboards from './Leaderboards.svelte';
	import MoveDistribution from './MoveDistribution.svelte';
	import WinPercentage from './WinPercentage.svelte';

	export let puzzle: Puzzle;
	export let data: Promise<PuzzleStats | null>;
	export let leaderboards: any;
</script>

<div>
	{#await Promise.all([data, leaderboards])}
		<p>Loading...</p>
	{:then [_data, _leaderboards]}
		<TabView
			items={[
				{ label: 'Move distribution', component: MoveDistribution },
				{ label: 'Leaderboards', component: Leaderboards },
				{ label: 'Win percentage', component: WinPercentage }
			]}
			tabProps={{ puzzle, data: _data, leaderboards: _leaderboards }}
		/>
	{/await}
</div>

<style lang="scss">
	div {
		// border: 1px solid var(--large-link-border);
		// border-radius: var(--border-radius);
		// padding: 1rem;
		width: 100%;
	}
</style>
