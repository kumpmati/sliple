<script lang="ts">
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.campaign.name}</title>
</svelte:head>

<a href="/campaign">
	<ArrowLeftIcon />
</a>
