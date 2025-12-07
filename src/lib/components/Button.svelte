<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type ButtonVariant = 'primary' | 'outline';
	type ButtonSize = 'small' | 'large';

	interface Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		rounded?: boolean;
		disabled?: boolean;
		class?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'large',
		rounded = false,
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const classes = $derived(
		classNames(
			'inline-flex items-center justify-center font-semibold transition-colors',
			{
				'bg-primary text-white hover:bg-primary-hover': variant === 'primary' && !disabled,
				'border-2 border-gray-300 text-gray-700 hover:bg-gray-50':
					variant === 'outline' && !disabled,
				'px-4 py-2 text-sm': size === 'small',
				'px-6 py-3 text-base': size === 'large',
				'rounded-full': rounded,
				'rounded-md': !rounded,
				'opacity-50 cursor-not-allowed': disabled
			},
			className
		)
	);
</script>

<button {disabled} {onclick} class={classes}>
	{@render children?.()}
</button>
