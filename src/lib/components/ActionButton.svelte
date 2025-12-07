<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';
	import { IconSpinner } from '$lib/components/icons';

	interface Props {
		count?: number | string;
		onclick?: () => void;
		disabled?: boolean;
		isActive?: boolean;
		isLoading?: boolean;
		children: Snippet;
	}

	let {
		count = 0,
		onclick,
		disabled = false,
		isActive = false,
		isLoading = false,
		children
	}: Props = $props();
</script>

<button
	{onclick}
	{disabled}
	class={classNames(
		'flex flex-col items-center gap-4 p-4 bg-transparent',
		disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
	)}
>
	<div
		class={classNames(
			'grid place-items-center w-16 h-16 rounded-full',
			isActive ? 'bg-red-100' : 'bg-gray-200'
		)}
	>
		{#if isLoading}
			<IconSpinner class="w-5 h-5 animate-spin" />
		{:else}
			{@render children()}
		{/if}
	</div>
	<span class="text-base font-normal">{count}</span>
</button>
