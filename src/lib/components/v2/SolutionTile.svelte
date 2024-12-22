<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		state?: 'default' | 'success';
		children: Snippet;
	};

	let { state = 'default', children }: Props = $props();
</script>

<div
	class={cn(
		'bg-tile border-tile-border flex h-10 items-center justify-center rounded-sm border-2 px-2 font-heading text-3xl font-semibold tracking-widest',
		state === 'success' && 'border-green-border bg-green-vibrant'
	)}
>
	{@render children()}
</div>
