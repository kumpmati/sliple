<script lang="ts">
	import { browser, dev } from '$app/environment';

	if (!browser && dev) {
		throw new Error("SnowEffect component doesn't work on the server");
	}
</script>

<svelte:head>
	<script type="module" src="https://unpkg.com/@le-pepe/snow-effect"></script>
</svelte:head>

<snow-effect color="white" flakes="25" speed="1"> </snow-effect>
