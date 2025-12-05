<script lang="ts">
	import { browser } from '$app/environment';
</script>

<svelte:head>
	{#if browser}
		<script type="module" src="https://unpkg.com/@le-pepe/snow-effect"></script>
	{/if}
</svelte:head>

{#if browser}
	<snow-effect color="white" flakes="40" speed="1"> </snow-effect>
{/if}
