<script>
	import Logo from '$lib/components/graphics/Logo.svelte';
	import Button from '$lib/components/v2/Button.svelte';
	import { getSfxContext, soundsEnabled } from '$lib/stores/sound';
	import { Volume2Icon, VolumeXIcon } from 'svelte-feather-icons';
	import TablerPlay from '~icons/tabler/play';
	import TablerChartHistogram from '~icons/tabler/chart-histogram';
	import TablerDice3 from '~icons/tabler/dice-3';
	import TablerCheck from '~icons/tabler/check';
	import SolutionTile from '$lib/components/v2/SolutionTile.svelte';
	import Badge from '$lib/components/v2/Badge.svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { formatSeconds } from '$lib/utils/time';

	let { data } = $props();

	const sfx = getSfxContext();

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
	<meta name="description" content="Slippery, free puzzle game" />
</svelte:head>

<main
	class="mx-auto flex h-full w-full max-w-md flex-col items-center sm:h-fit sm:rounded-xl sm:border-2 sm:border-slate-900 sm:bg-slate-950 sm:p-8"
>
	<button class="ml-auto text-subtle hover:text-white" onclick={toggleSound}>
		{#if $soundsEnabled}
			<Volume2Icon />
		{:else}
			<VolumeXIcon />
		{/if}
	</button>

	<Logo />

	<div class="relative mt-16 flex w-full flex-col rounded-lg bg-slate-900 p-4 pt-6 text-center">
		<!-- <Badge class="shadow-sharp-sm absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
			<TablerCheck class="size-5" />
			16 moves
		</Badge> -->

		<p class="font-medium text-slate-400">Today's puzzle word is</p>

		<div class="mx-auto mt-2 w-fit">
			<SolutionTile>{data.puzzle.data.solution.toLowerCase()}</SolutionTile>
		</div>

		<p class="mt-6 font-medium text-slate-400">
			<span class="text-white">{formatSeconds(secondsUntilReset)}</span> until next puzzle
		</p>

		<Button edgeGlow color="blue" size="lg" class="mt-7 w-full" href="/play/daily">
			Play
			<TablerPlay class="size-6" />
		</Button>

		<!-- <Button color="gray" variant="flat" class="mt-4 w-full">
			Statistics
			<TablerChartHistogram class="size-5" />
		</Button> -->
	</div>

	<Button color="orange" class="mt-6 w-[calc(100%-2rem)]" href="/play/random">
		Random puzzle
		<TablerDice3 class="size-4" />
	</Button>

	<div class="mt-auto grid w-full grid-cols-2 gap-4 sm:mt-24">
		<Button href="/about" color="gray">About</Button>
		<Button href="/tutorial" color="lightgray">Tutorial</Button>
	</div>
</main>
