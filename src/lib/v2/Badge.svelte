<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, class: className }: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p
	class={cn(
		'flex w-max items-center gap-2 rounded-lg bg-green-700 px-4 py-[6px] leading-tight text-white',
		className
	)}
>
	{@render children?.()}
</p>
