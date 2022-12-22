<script>
	import FeaturedPuzzle from '$lib/components/graphics/FeaturedPuzzle.svelte';
	import Logo from '$lib/components/graphics/Logo.svelte';
	import { ArchiveIcon } from 'svelte-feather-icons';
</script>

<div class="logo">
	<Logo />
</div>

<div class="links">
	<a class="link highlight" href="/puzzle/latest">
		<span class="text">
			<h2>Featured puzzle</h2>
			<p>Spell the word within the given moves</p>
		</span>

		<span class="puzzle-icon">
			<FeaturedPuzzle />
		</span>
	</a>

	<a class="link" href="/archive">
		<h2>Puzzle archive</h2>
		<ArchiveIcon size="30" strokeWidth={2} />
	</a>
</div>

<h3>Community (coming soon)</h3>
<div class="links community">
	<div class="link">
		<div />
		<div class="small" />
	</div>
	<div class="link">
		<div />
		<div class="small" />
	</div>
</div>

<style lang="scss">
	.logo {
		display: flex;
		justify-content: center;
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

	.link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 14px 18px;
		color: var(--black);
		text-decoration: none;

		background-color: var(--gray-light);
		border-radius: var(--border-radius);

		transition: transform 200ms;
		&:active {
			transform: scale(0.97);
		}

		&.highlight {
			background-color: var(--orange-light);
			border: 2px solid var(--orange);
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

		.link {
			opacity: 0.25;
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
