<script lang="ts">
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	type Props = {
		tileId: string;
		x: number;
		y: number;
		children?: Snippet;
	};

	let { tileId, x, y, children }: Props = $props();

	const tweened = new Tween({ x, y }, { duration: 150, easing: expoOut });

	$effect(() => {
		tweened.set({ x, y });
	});
</script>

<g data-tile-id={tileId} transform="translate({tweened.current.x},{tweened.current.y})">
	{@render children?.()}
</g>
