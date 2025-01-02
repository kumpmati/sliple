<script lang="ts">
	import '../app.css';
	import NProgress from 'nprogress';
	import { updated } from '$app/stores';
	import 'nprogress/nprogress.css';
	import { onMount } from 'svelte';
	import { setSfxContext, type SfxContext } from '$lib/stores/sound';
	import { initLocalStatsContext } from '$lib/v2/stats/local.svelte';
	import { navigating } from '$app/state';
	import { pwaInfo } from 'virtual:pwa-info';
	import Pwa from '$lib/v2/Pwa.svelte';

	let { children, data } = $props();

	console.log(data.dates);

	NProgress.configure({ minimum: 0.16, showSpinner: false });

	$effect(() => {
		if (navigating.to) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	});

	let sfx = $state<SfxContext>({ current: null });
	setSfxContext(sfx);

	initLocalStatsContext();

	onMount(() => {
		// import GameAudio inside onMount because Howler is not supported on server side
		import('$lib/services/sound').then((module) => {
			sfx.current = new module.GameAudio();
		});
	});

	onMount(() => {
		updated.subscribe((u) => {
			if (u) {
				postMessage('CLEAR_CACHE');
				window.location.reload();
			}
		});

		// check update status when first started
		updated.check();
	});
</script>

<Pwa />

<div class="mx-auto h-full w-full max-w-lg p-4 sm:mt-8 sm:h-fit">
	{@render children()}
</div>
