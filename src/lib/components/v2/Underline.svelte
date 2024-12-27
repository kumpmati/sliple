<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		class?: string;
	};
	let { class: className }: Props = $props();
</script>

<span
	class={cn('absolute -left-2 bottom-0.5 z-[-1] h-2 w-[calc(100%+1rem)] rounded-3xl', className)}
></span>
