<script lang="ts">
	import type { AuthUser } from '$lib/services/auth';

	export let user: AuthUser | null;
</script>

{#if user}
	<img class="user" src={user?.image} alt={user?.name} />
{:else}
	<div class="user" />
{/if}

<style lang="scss">
	.user {
		width: 32px;
		height: 32px;
		border-radius: 99px;
		background-color: var(--gray-light);
	}
</style>
