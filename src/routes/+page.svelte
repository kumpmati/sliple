<script>
	import Logo from '$lib/components/graphics/Logo.svelte';
	import Button from '$lib/components/v2/Button.svelte';
	import { getSfxContext, soundsEnabled } from '$lib/stores/sound';
	import { Volume2Icon, VolumeXIcon } from 'svelte-feather-icons';
	import TablerPlay from '~icons/tabler/play';
	import TablerChartHistogram from '~icons/tabler/chart-histogram';
	import TablerDice3 from '~icons/tabler/dice-3';
	import TablerHelp from '~icons/tabler/help';
	import SolutionTile from '$lib/components/v2/SolutionTile.svelte';
	import CompleteBadge from '$lib/components/v2/CompleteBadge.svelte';
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
	class="flex h-full flex-col items-center sm:h-fit sm:rounded-xl sm:border-2 sm:border-card sm:bg-card sm:p-8"
>
	<button class="ml-auto text-subtle hover:text-white" onclick={toggleSound}>
		{#if $soundsEnabled}
			<Volume2Icon />
		{:else}
			<VolumeXIcon />
		{/if}
	</button>

	<Logo />

	<div
		class="xs:mt-16 relative mt-8 flex w-full flex-col rounded-lg bg-blue-dark p-4 pt-6 text-center"
	>
		<!-- <CompleteBadge class="shadow-badge absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
			Completed in 16 moves
		</CompleteBadge> -->

		<p class="font-medium text-subtle">Today's puzzle word is</p>

		<div class="mx-auto mt-2 w-fit">
			<SolutionTile>{data.puzzle.data.solution.toUpperCase()}</SolutionTile>
		</div>

		<p class="mt-6 font-medium text-subtle">
			<span class="text-white">{formatSeconds(secondsUntilReset)}</span> until next puzzle
		</p>

		<Button color="blue" size="lg" class="mt-7 w-full" href="/play/daily">
			Play
			<TablerPlay class="size-6" />
		</Button>

		<!-- <Button variant="flat" color="gray" class="mt-4 w-full">
			Statistics
			<TablerChartHistogram class="size-5" />
		</Button> -->
	</div>

	<Button color="orange" class="mt-6 w-full" href="/play/random">
		Random puzzle
		<TablerDice3 class="size-5" />
	</Button>

	<div class="mt-auto flex w-full gap-4 sm:mt-24">
		<Button href="/about" color="gray" class="xs:w-fit w-full">About</Button>
		<Button href="/tutorial" color="gray" class="xs:w-full">
			<span class="xs:contents hidden">How to play</span>
			<TablerHelp class="size-5" />
		</Button>
	</div>
</main>
