<script>
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/v2/Button.svelte';
	import { getSfxContext, soundsEnabled } from '$lib/stores/sound';
	import TablerVolume from '~icons/tabler/volume';
	import TablerVolumeOff from '~icons/tabler/volume-off';
	import TablerPlay from '~icons/tabler/play';
	import TablerCheck from '~icons/tabler/check';
	import TablerDice3 from '~icons/tabler/dice-3';
	import TablerChartBar from '~icons/tabler/chart-bar';
	import TablerRotate from '~icons/tabler/rotate';
	import SolutionTile from '$lib/v2/SolutionTile.svelte';
	import TablerHelp from '~icons/tabler/help';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { formatSeconds } from '$lib/utils/time';
	import Badge from '$lib/v2/Badge.svelte';
	import { getLocalDbContext } from '$lib/v2/persisted/context';
	import { PuzzleStats } from '$lib/v2/persisted/reactive.svelte';
	import TablerHistory from '~icons/tabler/history';
	import { getSeason, Season } from '$lib/season.svelte';

	let { data } = $props();

	const season = getSeason();
	const db = getLocalDbContext();
	const sfx = getSfxContext();

	const stats = new PuzzleStats(db, data.puzzle.id);

	const toggleSound = () => {
		$soundsEnabled = !$soundsEnabled;
		sfx.current?.play('click');
	};

	const RESET_TIME = dayjs().add(1, 'day').startOf('day');

	let secondsUntilReset = $state(dayjs(RESET_TIME).diff(new Date(), 'second'));

	onMount(() => {
		const id = setInterval(() => {
			secondsUntilReset = dayjs(RESET_TIME).diff(new Date(), 'second');

			if (secondsUntilReset < 0) {
				window.location.reload(); // do full refresh
			}
		}, 1000);

		return () => clearInterval(id);
	});
</script>

<svelte:head>
	<title>Sliple</title>
	<meta name="description" content="A slippery puzzle game" />

	<meta property="og:url" content="https://sliple.app/" />
	<meta property="og:image" content="https://sliple.app/og/default.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="900" />
	<meta property="og:image:height" content="473" />

	<meta property="og:image" content="https://sliple.app/og/default_narrow.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="473" />
	<meta property="og:image:height" content="473" />
</svelte:head>

<main
	class="mx-auto flex h-full w-full max-w-md flex-col items-center sm:h-fit sm:rounded-xl sm:border-2 sm:border-slate-900 sm:bg-slate-950 sm:p-8"
>
	<div class="flex w-full items-center justify-between">
		<a href="/about" class="p-1 text-slate-400 hover:text-white" aria-label="About">
			<TablerHelp class="size-6" />
		</a>

		<button
			class="p-1 text-slate-400 hover:text-white"
			onclick={toggleSound}
			aria-label="Toggle game sounds"
		>
			{#if $soundsEnabled}
				<TablerVolume class="size-6" />
			{:else}
				<TablerVolumeOff class="size-6" />
			{/if}
		</button>
	</div>

	<Logo />

	<div class="relative mt-16 w-full">
		{#if season === Season.CHRISTMAS}
			<img
				src="/graphics/christmas-menu/snow.svg"
				alt=""
				class="absolute left-1 top-0 z-20 w-full translate-y-[-48%] scale-y-[60%]"
			/>

			<img
				src="/graphics/christmas-menu/icicles.svg"
				alt=""
				class="absolute bottom-0 left-2 z-0 w-3/4 translate-y-[60%] scale-y-[40%]"
			/>
		{/if}

		{#if stats.current?.best}
			<Badge class="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 shadow-sharp-sm">
				<TablerCheck class="size-5" />
				{stats.current.best.moves} moves
			</Badge>
		{/if}

		<div class="relative z-10 flex w-full flex-col rounded-lg bg-slate-900 p-4 pt-6 text-center">
			<p class="font-medium text-slate-400">Today's puzzle word is</p>

			<div class="mx-auto mt-2 w-fit">
				<SolutionTile>{data.puzzle.data.solution.toLowerCase()}</SolutionTile>
			</div>

			<p class="mt-6 font-medium text-slate-400">
				<span class="text-white">{formatSeconds(secondsUntilReset)}</span> until next puzzle
			</p>

			{#if !stats.current?.best}
				<Button edgeGlow color="blue" size="lg" class="mt-7 w-full" href="/play/daily">
					Play
					<TablerPlay class="size-6" />
				</Button>
			{:else}
				<div class="mt-6 flex items-end gap-4">
					<Button edgeGlow color="blue" size="icon" href="/play/daily">
						<TablerRotate class="size-5" />
					</Button>

					<Button color="gray" class="w-full" href="/play/daily#stats">
						Statistics
						<TablerChartBar class="size-5" />
					</Button>
				</div>
			{/if}
		</div>
	</div>

	<Button color="orange" class="relative mt-6 w-[calc(100%-2rem)]" href="/play/random">
		Random puzzle
		<TablerDice3 class="size-4" />

		{#if season === Season.CHRISTMAS}
			<img
				src="/graphics/christmas-menu/snow-2.svg"
				alt=""
				class="absolute right-0 top-0 w-3/5 translate-x-[-4%] translate-y-[-70%] scale-y-50"
			/>
		{/if}
	</Button>

	<div class="mt-auto flex gap-2 sm:mt-16">
		<a
			href="/history"
			class="flex items-center gap-1 p-1 text-slate-400 hover:text-white"
			aria-label="history"
			title="My history"
		>
			<TablerHistory class="size-6" />

			History
		</a>
	</div>
</main>
