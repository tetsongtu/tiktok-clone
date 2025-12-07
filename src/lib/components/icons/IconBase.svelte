<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		size?: number | string;
		children: Snippet;
	}

	let { class: className = '', size = 24, children }: Props = $props();

	const sizeValue = $derived(typeof size === 'number' ? `${size}px` : size);
</script>

<svg
	class={className}
	style="width: {sizeValue}; height: {sizeValue}"
	viewBox="0 0 256 256"
	fill="currentColor"
	aria-hidden="true"
>
	{@render children()}
</svg>
