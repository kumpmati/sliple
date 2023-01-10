<script lang="ts">
	import { goto } from '$app/navigation';
	import CampaignLevelPlayer from '$lib/components/campaign/CampaignLevelPlayer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const handleNextLevel = (e: CustomEvent) => {
		goto(`/campaign/${data.campaign.id}/level/${data.levelNumber + 1}`);
	};
</script>

<svelte:head>
	<title>{data.campaign.name}</title>
</svelte:head>

<CampaignLevelPlayer
	data={data.campaign}
	currentLevel={data.levelNumber - 1}
	on:next={handleNextLevel}
/>
