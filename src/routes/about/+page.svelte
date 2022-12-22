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
	<UnderlinedHeading color="var(--purple-light)">About</UnderlinedHeading>
</span>

<div class="section">
	<p>
		Sliple is a <b>free</b> web game where you try to spell words by sliding letter tiles on a grid.
		That's pretty much it.
	</p>
</div>

<div class="section">
	<h3>Contact</h3>
	<p>
		If you have feedback, you can sent it here: <a
			href="https://forms.gle/Ba5yhAYF2uQm3w31A"
			target="_blank"
			rel="noreferrer"
		>
			Feedback Form
		</a>
	</p>

	<p>
		You can also contact me using this email:
		<a href="mailto:contact@sliple.app">contact@sliple.app</a>
	</p>
</div>

<div class="section">
	<h3>Support</h3>

	<p>
		I like Sliple and I don't like ads, so I'll try to keep the game ad-free for as long as I can
		afford it. You can help cover the costs by donating if you want, but no pressure.
	</p>
	<a href="https://buymeacoffee.com/kumpmati" target="_blank" rel="noreferrer">
		<img width="150px" src="bmc.svg" alt="Buy me a coffee" />
	</a>
</div>

<div class="section">
	<p>
		v0.1 - made with <span title="bugs">🐛</span> by
		<a href="https://github.com/kumpmati" target="_blank" rel="noreferrer">@kumpmati</a>
	</p>
</div>

<style lang="scss">
	.heading {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	.section {
		display: flex;
		flex-direction: column;
		margin: 16px 0;
	}

	* {
		user-select: text;
	}

	a {
		color: var(--black);
		width: fit-content;
	}

	h3 {
		margin: 0;
	}

	p {
		margin: 4px 0;
	}
</style>
