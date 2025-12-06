<script lang="ts">
	import classNames from 'classnames';

	interface Props {
		count?: number;
		onclick?: () => void;
		disabled?: boolean;
		isActive?: boolean;
		isLoading?: boolean;
		children: any;
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
			<svg class="w-5 h-5 animate-spin" viewBox="0 0 256 256" fill="currentColor">
				<path
					d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
				/>
			</svg>
		{:else}
			{@render children()}
		{/if}
	</div>
	<span class="text-base font-normal">{count}</span>
</button>
