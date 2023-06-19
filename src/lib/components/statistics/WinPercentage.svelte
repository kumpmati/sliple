<script lang="ts">
	import type { PuzzleStats } from '$lib/schemas/puzzle';

	export let data: PuzzleStats | null;

	$: numWins = data ? data.completions.filter((c) => c.result === 'w').length : 0;
</script>

{#if data}
	<p>{Math.round((numWins / data.completions.length) * 100)}% completion rate</p>
{:else}
	<p>No data</p>
{/if}
