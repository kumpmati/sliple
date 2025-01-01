<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { onMount, type Snippet } from 'svelte';
	import TablerX from '~icons/tabler/x';

	type Props = {
		urlStateHash?: string;
		open: boolean;
		children: Snippet;
		class?: string;
		onClose?: () => void;
	};

	let { urlStateHash, open = $bindable(), children, class: className, onClose }: Props = $props();

	let ref: HTMLDialogElement;

	$effect(() => {
		if (open) ref?.showModal();
		else ref?.close();
	});

	$effect(() => {
		if (urlStateHash && page.url.hash === `#${urlStateHash}`) {
			open = true;
		}
	});

	onMount(() => {
		const handleClose = () => {
			open = false;
			onClose?.();
		};

		ref.addEventListener('close', handleClose);
		return () => ref.removeEventListener('close', handleClose);
	});
</script>

<dialog
	bind:this={ref}
	class={cn(
		'bottom-0 left-0 right-[unset] top-[unset] z-10 mx-0 max-h-full w-full max-w-full rounded-md rounded-b-none bg-slate-800 p-6 text-slate-300 backdrop:bg-black/75 backdrop:transition-all',
		className
	)}
>
	<div class="mx-auto flex max-w-96 flex-col">
		<form method="dialog" class="contents">
			<button
				class="ml-auto flex w-fit rounded-sm p-2 text-slate-400 outline-white transition-colors hover:bg-slate-700 hover:text-white focus-visible:outline active:bg-slate-900"
			>
				<TablerX />
			</button>
		</form>
		{@render children()}
	</div>
</dialog>

<style lang="scss">
	@keyframes swipe-bottom {
		from {
			opacity: 0;
			transform: translateY(100%);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
			backdrop-filter: blur(0px);
		}
	}

	dialog {
		--duration: 300ms;

		transition:
			translate var(--duration),
			opacity var(--duration),
			display var(--duration) allow-discrete;
		transition-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1); // expo-out;

		&[open] {
			/* Post-Entry (Normal) State */
			translate: 0 0;
			opacity: 1;

			/* Pre-Entry State */
			@starting-style {
				translate: 0 100%;
				opacity: 0;
			}
		}

		/* Exiting State */
		&:not([open]) {
			translate: 0 100%;
			opacity: 0;
			transition-timing-function: cubic-bezier(0.55, 0.06, 0.68, 0.19); // cubic-in
		}
	}

	dialog::backdrop {
		animation: fade 500ms;
		animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1); // expo-out
	}
</style>
