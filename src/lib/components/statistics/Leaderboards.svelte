<script lang="ts">
	import type { PuzzleCompletion } from '$lib/schemas/puzzle';
	import type { AuthUser } from '$lib/services/auth';
	import { authUser } from '$lib/stores/auth';
	import UserAvatar from '../UserAvatar.svelte';

	export let leaderboards: (PuzzleCompletion & { user: AuthUser | null })[];
</script>

<div class="heading">
	<p>Rank</p>
	<p>Name</p>
	<p>Moves</p>
</div>

<ul>
	{#each leaderboards as item, index (item?.userId)}
		<li>
			<span class="rank">#{index + 1}</span>

			<span class="name">
				<UserAvatar size="small" user={item.user} />
				{item.user?.name}
			</span>

			<span class="moves">{item.moves}</span>
		</li>
	{/each}

	{#if leaderboards.length < 5}
		{#each Array(5 - leaderboards.length) as _, index}
			<li>
				<span class="rank">#{index + 1 + leaderboards.length}</span>

				<span class="name"> - </span>
				<span class="moves"> - </span>
			</li>
		{/each}
	{/if}

	{#if !$authUser}
		<p class="signin">
			<a href="/auth/signin">Sign In</a> to get on the leaderboards
		</p>
	{/if}
</ul>

<style lang="scss">
	.heading {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1ch;

		p {
			margin-top: 0;
			font-size: 12px;
			color: var(--text-subtle);
		}
	}

	.signin {
		font-size: 14px;
		color: var(--text-subtle);
		text-align: center;

		a {
			color: var(--text);
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 8px;
		list-style: none;
		margin: 0;
		padding: 0;

		li {
			display: grid;
			grid-template-columns: auto 1fr auto;
			gap: 1ch;
			align-items: center;

			.name {
				display: flex;
				align-items: center;
				gap: 4px;
			}

			.rank {
				color: var(--text-subtle);
				width: 2ch;
			}

			.moves {
				font-size: 16px;
				font-weight: bold;
				font-family: var(--font-heading);
			}
		}
	}
</style>
