<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
	type ButtonSize = 'small' | 'medium' | 'large';

	interface Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		rounded?: boolean;
		disabled?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'large',
		rounded = false,
		disabled = false,
		loading = false,
		fullWidth = false,
		type = 'button',
		class: className = '',
		onclick,
		children,
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);

	const classes = $derived(
		classNames(
			'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
			{
				// Variants
				'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary':
					variant === 'primary' && !isDisabled,
				'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400':
					variant === 'outline' && !isDisabled,
				'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400':
					variant === 'ghost' && !isDisabled,
				'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500':
					variant === 'danger' && !isDisabled,
				// Sizes
				'px-3 py-1.5 text-sm': size === 'small',
				'px-4 py-2 text-sm': size === 'medium',
				'px-6 py-3 text-base': size === 'large',
				// Shape
				'rounded-full': rounded,
				'rounded-lg': !rounded,
				// States
				'opacity-50 cursor-not-allowed': isDisabled,
				'w-full': fullWidth,
			},
			className
		)
	);
</script>

<button {type} disabled={isDisabled} {onclick} class={classes} aria-busy={loading}>
	{#if loading}
		<svg
			class="animate-spin -ml-1 mr-2 h-4 w-4"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
			></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	{/if}
	{@render children?.()}
</button>
