<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import CampaignListItem from '$lib/components/campaign/CampaignListItem.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { showTutorial } from '$lib/stores/tutorial';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import type { PageData } from './$types';

	export let data: PageData;

	$: if (browser && $showTutorial) {
		const yes = confirm('Do you want to do a tutorial first?');
		if (yes) goto('/tutorial');

		$showTutorial = false;
	}
</script>

<svelte:head>
	<title>Campaigns</title>
	<meta name="description" content="Browse all the official campaigns" />
</svelte:head>

<nav>
	<a href="/">
		<ArrowLeftIcon />
	</a>
</nav>

<div class="content">
	<UnderlinedHeading color="var(--purple-light)">Campaigns</UnderlinedHeading>

	<ul class="list">
		{#each data.campaigns as campaign (campaign.id)}
			<li>
				<CampaignListItem item={campaign} />
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	a {
		color: var(--text);
	}

	.content {
		margin-block: 40px;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.list {
		margin-block: 40px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		padding: 0;
		list-style: none;
	}
</style>
