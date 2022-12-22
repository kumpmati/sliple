<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>Sliple</title>
</svelte:head>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		position: relative;
		margin: 0 auto;
		max-width: 35rem;
		padding: 16px;
		display: flex;
		flex-direction: column;
	}
</style>
