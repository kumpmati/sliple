<script lang="ts">
	import CampaignLevelPicker from '$lib/components/campaign/CampaignLevelPicker.svelte';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a href="../">
	<ArrowLeftIcon />
</a>

<CampaignLevelPicker data={data.campaign} />
