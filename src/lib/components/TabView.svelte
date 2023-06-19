<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let items: { label: string; component: ComponentType }[];
	export let tabProps: any;

	let activeTab = 0;
</script>

<ul>
	{#each items as tab, index (tab.label)}
		<li>
			<button class:active={activeTab === index} on:click={() => (activeTab = index)}>
				{tab.label}
			</button>
		</li>
	{/each}
</ul>

{#each items as tab, index (tab.label)}
	{#if index === activeTab}
		<div class="content">
			<svelte:component this={tab.component} {...tabProps} />
		</div>
	{/if}
{/each}

<style lang="scss">
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		padding: 0;
		margin: 0;
		list-style: none;
		width: 100%;
		margin-bottom: 0.5rem;

		button {
			background-color: transparent;
			border: none;
			color: var(--text-subtle);
			cursor: pointer;
			font-family: var(--font-body);
			padding: 8px 16px;
			font-size: 16px;
			border-radius: var(--border-radius-small);

			&.active {
				background-color: var(--tab-bg);
				color: var(--text);
			}
		}
	}

	.content {
		background-color: var(--tab-bg);
		padding: 1rem;
		border-radius: var(--border-radius);
	}
</style>
