<script lang="ts">
	import type { PageData } from './$types';
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Sliple - {data.puzzle.publishedAt.toLocaleDateString()}</title>
</svelte:head>

<LevelPlayer puzzle={data.puzzle} preview={false} />
