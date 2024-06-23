<script lang="ts">
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import { ChevronLeftIcon } from 'svelte-feather-icons';
</script>

<div>
	<p><i>404</i></p>
	<span class="heading">
		<UnderlinedHeading color="var(--red-light)">Page not found</UnderlinedHeading>
	</span>

	<a href="/">
		<ChevronLeftIcon size="20" />
		Home
	</a>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		top: 50vh;
		transform: translateY(-50%);
		padding: 16px;
	}

	.heading {
		display: flex;
		justify-content: center;
		margin-bottom: 60px;
	}

	p {
		color: var(--gray);
	}

	a {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--text);
		text-decoration: none;
		font-size: 16px;
		padding: 8px 16px;
		border: none;
		cursor: pointer;
		background: none;
		border-radius: var(--border-radius);
		transition: transform 150ms;

		&:active {
			transform: scale(0.95);
		}
	}
</style>
