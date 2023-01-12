<script lang="ts">
	import CampaignLevelPicker from '$lib/components/campaign/CampaignLevelPicker.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.campaign.name}</title>
	<meta name="description" content="Play the official campaign - {data.campaign.name}" />
</svelte:head>

<div class="details">
	<a class="back" href="/campaign">
		<ArrowLeftIcon />
	</a>

	<UnderlinedHeading color="var(--purple-light)">
		{data.campaign.name}
	</UnderlinedHeading>

	<p>{data.campaign.description}</p>

	<div class="row">
		<p class="difficulty">Difficulty: <b>{data.campaign.difficulty}</b></p>
		<p class="levels">{data.campaign.levels.length} levels</p>
	</div>
</div>

<CampaignLevelPicker data={data.campaign} />

<style lang="scss">
	a {
		color: var(--black);
		position: absolute;
		top: 16px;
		left: 16px;
	}

	p {
		color: var(--gray);
		margin: 0;

		b {
			font-family: var(--font-heading);
			color: var(--black);
		}
	}

	.levels {
		font-family: var(--font-heading);
		color: var(--black);
		font-weight: bold;
	}

	.row {
		margin-top: 30px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.details {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;

		margin: 0;
		padding: 30px;
		padding-top: 60px;

		border: 2px solid var(--gray-light);
		border-radius: var(--border-radius);
	}
</style>
