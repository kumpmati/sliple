<svelte:head>
	<title>Sliple</title>
</svelte:head>

<slot />

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&family=Nunito:wght@500;800&display=swap');

	:global(:root) {
		--font-heading: 'Nunito', sans-serif;
		--font-body: 'Atkinson Hyperlegible', sans-serif;
	}

	:global(body) {
		font-family: var(--font-body);
	}
</style>
