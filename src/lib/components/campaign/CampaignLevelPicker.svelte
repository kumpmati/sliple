<script lang="ts">
	import { userStore } from '$lib/stores/user';
	import type { Campaign } from '$lib/types/campaign';
	import LevelItem from './LevelItem.svelte';

	export let data: Campaign;
</script>

<ul>
	{#each data.levels as level, index (level.id)}
		{@const status = $userStore.puzzles[level.id]}
		<li>
			<a href="/campaign/{data.id}/level/{index + 1}">
				<LevelItem number={index + 1} rank={status?.rank} />
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
		padding: 0;
		gap: 16px;
		list-style: none;
	}

	a {
		text-decoration: none;
	}
</style>
