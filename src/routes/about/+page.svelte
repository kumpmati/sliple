<script>
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
</script>

<svelte:head>
	<title>About Sliple</title>
</svelte:head>

<a href="/">
	<ArrowLeftIcon />
</a>

<span class="heading">
	<UnderlinedHeading color="var(--green-light)">About</UnderlinedHeading>
</span>

<p>Sliple is a free web game where you try to spell words by sliding letter tiles on a grid.</p>

<h3>Contact info</h3>
<p>Matias Kumpulainen</p>
<a href="mailto:contact@sliple.app">contact@sliple.app</a>

<style lang="scss">
	.heading {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	* {
		user-select: all;
	}

	a {
		color: var(--black);
		width: fit-content;
	}

	h3 {
		margin: 0;
	}
</style>
