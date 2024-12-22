<script lang="ts">
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		variant?: 'raised' | 'flat';
		size?: 'lg' | 'md';
		color: 'blue' | 'orange' | 'gray' | 'lightgray';
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes;

	let {
		variant = 'raised',
		size = 'md',
		href,
		color,
		children,
		class: className,
		...rest
	}: Props = $props();

	let containerClasses = $derived(
		cn(
			variant,
			'flex items-center justify-center gap-2 rounded-md font-heading text-xl font-semibold',
			size === 'lg' && 'text-2xl',
			color === 'blue' && 'bg-blue-shadow',
			color === 'orange' && 'bg-orange-shadow',
			color === 'gray' && 'bg-gray-shadow',
			color === 'lightgray' && 'bg-lightgray-shadow',
			className
		)
	);

	let innerClasses = $derived(
		cn(
			'flex h-full w-full items-center justify-center gap-2 rounded-md px-8 py-3',
			color === 'blue' && 'text-blue-content bg-blue',
			color === 'orange' && 'text-orange-content bg-orange',
			color === 'gray' && 'text-gray-content bg-gray',
			color === 'lightgray' && 'text-lightgray-content bg-lightgray'
		)
	);
</script>

{#if href}
	<a {href} {...rest} class={containerClasses}>
		<span class={innerClasses}>
			{@render children?.()}
		</span>
	</a>
{:else}
	<button {...rest} class={containerClasses}>
		<span class={innerClasses}>
			{@render children?.()}
		</span>
	</button>
{/if}

<style lang="scss">
	a,
	button {
		&.flat {
			transition: filter 100ms;

			&:hover {
				filter: brightness(1.05);
			}

			&:active {
				filter: brightness(0.95);
			}
		}

		&.raised {
			span {
				transition: transform 100ms;
				transform: translateY(-6px);
			}

			&:hover span {
				transform: translateY(-7px);
			}

			&:active span {
				transform: translateY(-3px);
			}
		}
	}
</style>
