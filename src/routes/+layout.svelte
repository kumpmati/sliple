<script lang="ts">
	import '../app.css';
	import NProgress from 'nprogress';
	import { navigating, updated } from '$app/stores';
	import 'nprogress/nprogress.css';
	import { onMount } from 'svelte';
	import { setSfxContext, type SfxContext } from '$lib/stores/sound';

	let { children } = $props();

	NProgress.configure({ minimum: 0.16, showSpinner: false });

	$effect(() => {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	});

	let sfx = $state<SfxContext>({ current: null });

	setSfxContext(sfx);

	onMount(async () => {
		// import GameAudio inside onMount because Howler is not supported on server side
		const { GameAudio } = await import('$lib/services/sound');
		sfx.current = new GameAudio();
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

<div class="mx-auto h-full w-full max-w-lg p-4 sm:mt-8 sm:h-fit">
	{@render children()}
</div>
