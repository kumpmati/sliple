<script lang="ts">
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		variant?: 'raised' | 'flat';
		edgeGlow?: boolean;
		size?: 'lg' | 'default' | 'icon';
		color: 'blue' | 'orange' | 'gray' | 'lightgray';
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes;

	let {
		variant = 'raised',
		size = 'default',
		href,
		edgeGlow,
		color,
		children,
		class: className,
		...rest
	}: Props = $props();

	let containerClasses = $derived(
		cn(
			variant,
			'flex items-center justify-center gap-2 rounded-md font-heading text-lg font-medium leading-none',
			size === 'lg' && 'text-2xl',
			color === 'blue' && 'bg-blue-400',
			color === 'orange' && 'bg-orange-400',
			color === 'gray' && 'bg-slate-800',
			color === 'lightgray' && 'bg-lightgray-shadow',
			className
		)
	);

	let innerClasses = $derived(
		cn(
			'flex h-full w-full items-center justify-center gap-2 rounded-md px-8 py-3 border-2 border-transparent',
			size === 'icon' && 'px-3',
			color === 'blue' && 'text-blue-900 bg-blue-300',
			edgeGlow && color === 'blue' && 'border-blue-200',
			color === 'orange' && 'text-orange-900 bg-orange-300',
			edgeGlow && color === 'orange' && 'border-orange-200',
			color === 'gray' && 'text-slate-300 bg-slate-700',
			edgeGlow && color === 'gray' && 'border-slate-600',
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
