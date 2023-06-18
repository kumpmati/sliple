<script lang="ts">
	export let href: string;
	export let title: string;
	export let description: string | null = null;
	export let badge: string | null = null;
	export let highlightColor: string | null = null;
</script>

<a
	class="link"
	class:highlight={!!highlightColor}
	style:--highlight={highlightColor}
	class:new={!!badge}
	{href}
>
	<span class="text">
		{#if badge}
			<p class="new">{badge}</p>
		{/if}

		<h2>{title}</h2>

		{#if description}
			<p>{description}</p>
		{/if}
	</span>

	{#if $$slots.icon}
		<span class="puzzle-icon">
			<slot name="icon" />
		</span>
	{/if}
</a>

<style lang="scss">
	.link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 12px 24px;
		color: var(--large-link-text);
		text-decoration: none;

		background-color: var(--large-link-bg);
		border: 2px solid var(--large-link-border);
		border-radius: var(--border-radius);

		transition: transform 200ms;

		&:hover {
			transform: scale(1.025);
		}

		&:active {
			transform: scale(0.97);
		}

		&.highlight {
			border-color: transparent;
			position: relative;
			background-color: var(--highlight);
			color: var(--large-link-text-highlight);

			&.new {
				border: 2px solid var(--red);
			}

			.new {
				border-radius: 20px;
				background-color: var(--red);
				padding: 0px 10px;
				color: var(--white);
				position: absolute;
				top: -10px;
				animation: wiggle 2s both infinite;
			}

			@keyframes wiggle {
				0% {
					transform: translateY(-2px);
				}
				50% {
					transform: translateY(0);
				}
				100% {
					transform: translateY(-2px);
				}
			}
		}

		.puzzle-icon {
			display: flex;
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
			font-size: 20px;
			font-family: var(--font-heading);
		}

		p {
			margin: 0;
			font-size: 14px;
			font-family: var(--font-body);
			opacity: 0.5;
		}
	}
</style>
