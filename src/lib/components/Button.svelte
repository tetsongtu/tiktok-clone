<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'outline';
		size?: 'small' | 'large';
		rounded?: boolean;
		disabled?: boolean;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'large',
		rounded = false,
		disabled = false,
		class: className = '',
		onclick,
		children,
	}: Props = $props();

	const classes = $derived(
		classNames(
			'inline-flex items-center justify-center font-semibold transition-colors rounded-lg',
			{
				'bg-primary text-white hover:bg-primary-hover': variant === 'primary' && !disabled,
				'border-2 border-gray-300 text-gray-700 hover:bg-gray-50': variant === 'outline' && !disabled,
				'px-3 py-1.5 text-sm': size === 'small',
				'px-6 py-3 text-base': size === 'large',
				'rounded-full': rounded,
				'opacity-50 cursor-not-allowed': disabled,
			},
			className
		)
	);
</script>

<button type="button" {disabled} {onclick} class={classes}>
	{@render children?.()}
</button>
