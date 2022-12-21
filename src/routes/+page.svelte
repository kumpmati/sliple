<script>
	import FeaturedPuzzle from '$lib/components/graphics/FeaturedPuzzle.svelte';
	import Logo from '$lib/components/graphics/Logo.svelte';
	import { ArchiveIcon } from 'svelte-feather-icons';
</script>

<main>
	<div class="logo">
		<Logo />
	</div>

	<div class="links">
		<a class="highlight" href="/puzzle/featured">
			<span class="text">
				<h2>Featured puzzle</h2>
				<p>Spell the word within the given moves</p>
			</span>

			<span class="puzzle-icon">
				<FeaturedPuzzle />
			</span>
		</a>

		<a href="/archive">
			<h2>Puzzle archive</h2>
			<ArchiveIcon size="30" strokeWidth={3} />
		</a>
	</div>

	<h3>Community (coming soon)</h3>
	<div class="links community">
		<a>
			<div />
			<div class="small" />
		</a>
		<a>
			<div />
			<div class="small" />
		</a>
	</div>
</main>

<style lang="scss">
	main {
		margin: 0 auto;
		max-width: 35rem;
		padding: 16px;
		display: flex;
		align-items: center;
		flex-direction: column;
		border: 1px solid red;
	}

	.logo {
		margin-top: 32px;
		margin-bottom: 50px;
	}

	h3 {
		font-size: 14px;
		color: rgba(0, 0, 0, 0.5);
	}

	.links {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 50px;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 14px 18px;
		color: var(--black);
		text-decoration: none;

		background-color: var(--gray-light);
		border-radius: var(--border-radius);

		&.highlight {
			background-color: var(--orange-light);
			border: 3px solid var(--orange);
		}

		.text {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 5px;
			margin-right: 30px;
		}

		h2 {
			margin: 0;
			font-size: 24px;
			font-family: var(--font-heading);
		}

		p {
			margin: 0;
			font-size: 16px;
			font-family: var(--font-body);
			color: rgba(0, 0, 0, 0.5);
		}
	}

	.community {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;

		a {
			opacity: 0.5;
			cursor: default;

			div {
				background-color: var(--gray);
				display: block;
				height: 20px;
				width: 100%;
				border-radius: var(--border-radius);
				max-width: 70%;

				&.small {
					width: 20px;
				}
			}
		}
	}
</style>
