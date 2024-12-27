<script lang="ts">
	import TablerArrowLeft from '~icons/tabler/arrow-left';
	import TablerChevronsLeft from '~icons/tabler/chevrons-left';
	import TablerRotate from '~icons/tabler/rotate';
	import type { GameState } from './state.svelte';

	type Props = {
		game: GameState;
	};

	let { game }: Props = $props();
</script>

<div class="mb-6 flex w-full items-center justify-between">
	<a
		href="/"
		class="flex items-center justify-center rounded-sm p-2 text-slate-400 hover:text-white"
	>
		<TablerArrowLeft class="size-6" />
	</a>

	<div class="flex rounded-sm border-2 border-dashed border-slate-900">
		<button
			disabled={!game.canUndo}
			class="rounded-[6px] p-2 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white disabled:text-slate-700 disabled:hover:bg-transparent"
			onclick={() => game.undo()}
		>
			<TablerChevronsLeft class="size-6" />
		</button>

		<button
			class="rounded-[6px] p-2 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white disabled:text-slate-500"
			onclick={() => game.reset()}
		>
			<TablerRotate class="size-6" />
		</button>
	</div>
</div>
