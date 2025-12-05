<script lang="ts">
	import type { WallTileProps } from '..';

	let props: WallTileProps = $props();
</script>

<svg
	width="64"
	height="64"
	viewBox="0 0 64 64"
	fill="none"
	class="overflow-visible"
	xmlns="http://www.w3.org/2000/svg"
	{...props}
>
	<image href="/graphics/wall-default.svg" width="64" height="70" transform="translate(0, -6)" />
</svg>
