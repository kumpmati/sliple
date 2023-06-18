<script lang="ts">
	import NProgress from 'nprogress';
	import { navigating, updated } from '$app/stores';
	import 'nprogress/nprogress.css';
	import { onMount } from 'svelte';
	import '../app.css';
	import { authUser } from '$lib/stores/auth';

	export let data;

	NProgress.configure({ minimum: 0.16, showSpinner: false });

	$: {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}

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

	$: $authUser = data.user;
</script>

<svelte:head>
	<script defer data-domain="sliple.app" src="https://plausible.io/js/script.js"></script>
</svelte:head>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		position: relative;
		margin: 0 auto;
		max-width: 35rem;
		padding: 16px;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
</style>
