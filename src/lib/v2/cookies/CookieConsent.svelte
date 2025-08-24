<script lang="ts">
	import { fly } from 'svelte/transition';
	import { clearAllCookies, getConsentCookie, setConsentCookie } from './cookie';
	import { invalidateAll } from '$app/navigation';
	import TablerWorld from '~icons/tabler/world';
	import { page } from '$app/state';

	type Props = {
		show?: boolean;
	};

	let { show = $bindable() }: Props = $props();

	let consent = $state<boolean | null>(null);

	$effect(() => {
		consent = getConsentCookie();
	});

	const denyCookies = () => {
		clearAllCookies(); // clear before setting consent cookie
		setConsentCookie(false);
		consent = getConsentCookie();

		invalidateAll(); // reload layout so cookies get updated
		show = false;
	};

	const acceptCookies = () => {
		setConsentCookie(true);
		consent = getConsentCookie();

		invalidateAll(); // reload layout so cookies get updated
		show = false;
	};
</script>

{#if show || consent === null}
	<div
		in:fly={{ y: 15, duration: 150 }}
		class="fixed bottom-2 left-1/2 flex w-[calc(100%-1rem)] max-w-md -translate-x-1/2 flex-col items-center justify-between gap-2 rounded-sm bg-slate-800 px-4 py-2 text-center shadow-sharp-sm xs:flex-row xs:text-left"
	>
		<div class="flex flex-col items-center xs:items-start">
			<p class="flex items-center gap-1 font-heading font-bold">
				<TablerWorld class="hidden size-5 shrink-0 xs:flex" />
				Accept cookies?
			</p>
			<small class="text-slate-400">
				Completely anonymous, promise! <a
					href="/privacy?back={page.url.pathname}"
					class="underline hover:text-white"
				>
					More info
				</a>
			</small>
		</div>

		<div class="flex gap-2">
			<button onclick={denyCookies} class="p-1 text-slate-400 hover:text-white">Deny</button>
			<button onclick={acceptCookies} class="p-1 text-white">Accept</button>
		</div>
	</div>
{/if}
