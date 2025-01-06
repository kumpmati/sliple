<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');

			registerSW({
				immediate: true,
				onRegistered(r) {
					if (!r) return;

					setInterval(
						() => {
							console.log('Checking for sw update');
							r.update();
						},
						1000 * 60 * 60 /* 1 hour */
					);

					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});
</script>

<svelte:head>
	{@html pwaInfo?.webManifest.linkTag ?? ''}

	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
</svelte:head>
