<script lang="ts">
	import type { AuthUser } from '$lib/services/auth';

	export let user: AuthUser | null;
	export let size: 'default' | 'small' = 'default';
</script>

{#if user}
	<img class="user" class:small={size === 'small'} src={user?.image} alt={user?.name} />
{:else}
	<div class="user" class:small={size === 'small'} />
{/if}

<style lang="scss">
	.user {
		width: 32px;
		height: 32px;
		border-radius: 99px;
		background-color: var(--gray-light);

		&.small {
			width: 16px;
			height: 16px;
		}
	}
</style>
