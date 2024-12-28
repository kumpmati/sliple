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
		'flex h-10 items-center justify-center rounded-sm border-2  border-slate-800 bg-slate-950 px-4 font-heading text-2xl font-semibold tracking-wide',
		state === 'success' && 'border-green-border bg-green-vibrant'
	)}
>
	{@render children()}
</div>
