<script lang="ts">
	import type { WallTile } from '$lib/types/grid';
	import TileWrapper from './TileWrapper.svelte';

	export let tile: WallTile;
</script>

<TileWrapper {tile}>
	<g transform="translate(2,2)">
		<rect
			x="2.5"
			y="2.5"
			width="59"
			height="59"
			rx="4.5"
			fill="#B5B5B5"
			stroke="#808080"
			stroke-width="2"
		/>
		<mask
			id="mask0_4_23"
			style="mask-type:alpha"
			maskUnits="userSpaceOnUse"
			x="0"
			y="0"
			width="62"
			height="62"
		>
			<rect
				x="2.5"
				y="2.5"
				width="59"
				height="59"
				rx="4.5"
				fill="#B5B5B5"
				stroke="#808080"
				stroke-width="2"
			/>
		</mask>
		<g mask="url(#mask0_4_23)">
			<path
				transform="translate(1,1.5)"
				d="M-1.90881 -1H42.386V-22M-1.90881 41H42.386V20M-46.9544 41H-2.65957V20M-46.9544 -1H-2.65957V-22M-46.9544 83H-2.65957V62M-1.90881 83H42.386V62M-24.4316 20H19.8632V-1M-24.4316 62H19.8632V41M-24.4316 104H19.8632V83M20.614 20H64.9088V-1M20.614 62H64.9088V41M20.614 104H64.9088V83M43.1368 -1H87.4316V-22M43.1368 41H87.4316V20M88.1824 41H132.477V20M88.1824 -1H132.477V-22M88.1824 83H132.477V62M43.1368 83H87.4316V62M65.6596 20H109.954V-1M110.705 20H155V-1M110.705 62H155V41M110.705 104H155V83M-69.4772 104H-25.1824V83M-69.4772 62H-25.1824V41M-92 83H-47.7052V62M-92 41H-47.7052V20M-92 -1H-47.7052V-22M-69.4772 20H-25.1824V-1M65.6596 62H109.954V41M65.6596 104H109.954V83"
				stroke="#aaa"
				stroke-width="2"
			/>
		</g>
	</g>
</TileWrapper>
