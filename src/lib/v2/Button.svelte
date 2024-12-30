<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = VariantProps<typeof button> & HTMLButtonAttributes & HTMLAnchorAttributes;

	let {
		raised,
		size,
		href,
		edgeGlow,
		color,
		children,
		class: className,
		...rest
	}: Props = $props();

	const button = tv({
		slots: {
			base: 'flex items-center justify-center gap-2 rounded-md font-heading text-lg font-medium leading-none',
			foreground:
				'flex h-full w-full items-center justify-center gap-2 rounded-md px-6 py-3 border-2 border-transparent',
			edge: ''
		},
		variants: {
			raised: {
				true: {
					base: '[&>span]:hover:translate-y-[-7px] [&>span]:active:translate-y-[-3px]',
					foreground: 'translate-y-[-6px] transition-transform'
				},
				false: {
					base: 'transition-[filter] hover:brightness-105 active:brightness-95',
					foreground: ''
				}
			},

			size: {
				default: {},
				lg: {
					base: 'text-2xl'
				},
				icon: {
					foreground: 'px-3'
				}
			},

			edgeGlow: {
				false: {
					edge: 'border-0'
				}
			},

			color: {
				blue: {
					base: 'bg-blue-400',
					foreground: 'text-blue-900 bg-blue-300',
					edge: 'border-blue-200'
				},
				orange: {
					base: 'bg-orange-400',
					foreground: 'text-orange-900 bg-orange-300',
					edge: 'border-orange-200'
				},
				gray: {
					base: 'bg-slate-800',
					foreground: 'text-slate-300 bg-slate-700',
					edge: 'border-slate-600'
				},
				lightgray: {
					base: 'bg-slate-700',
					foreground: 'text-slate-300 bg-slate-600',
					edge: 'border-slate-500'
				},
				darkgray: {
					base: 'bg-slate-900',
					foreground: 'text-slate-400 bg-slate-800',
					edge: 'border-slate-700'
				},
				white: {
					base: 'bg-lightgray-shadow',
					foreground: 'text-lightgray-content bg-lightgray'
				}
			}
		},
		defaultVariants: {
			raised: true,
			edgeGlow: false,
			size: 'default',
			color: 'blue'
		}
	});

	let classes = button({ size, raised, edgeGlow, color });
</script>

{#if href}
	<a {href} {...rest} class={cn(classes.base(), className)}>
		<span class={cn(classes.foreground(), classes.edge())}>
			{@render children?.()}
		</span>
	</a>
{:else}
	<button {...rest} class={cn(classes.base(), className)}>
		<span class={cn(classes.foreground(), classes.edge())}>
			{@render children?.()}
		</span>
	</button>
{/if}
