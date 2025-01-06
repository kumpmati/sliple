<script lang="ts">
	import '../app.css';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { onMount } from 'svelte';
	import { setSfxContext, type SfxContext } from '$lib/stores/sound';
	import { navigating } from '$app/state';
	import PwaMeta from '$lib/v2/PwaMeta.svelte';
	import { initLocalDbContext } from '$lib/v2/persisted/context';

	let { children } = $props();

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

	initLocalDbContext();

	onMount(() => {
		// Howler is only supported on client side
		import('$lib/services/sound').then(({ GameAudio }) => {
			sfx.current = new GameAudio();
		});
	});
</script>

<PwaMeta />

<div class="mx-auto h-full w-full max-w-lg p-4 sm:mt-8 sm:h-fit">
	{@render children()}
</div>
