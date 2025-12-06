<script lang="ts">
	interface Props {
		content?: string;
		children: any;
		placement?: 'top' | 'bottom' | 'left' | 'right';
	}

	let { content, children, placement = 'bottom' }: Props = $props();

	let showTooltip = $state(false);
</script>

{#if content}
	<div
		class="relative inline-block"
		onmouseenter={() => (showTooltip = true)}
		onmouseleave={() => (showTooltip = false)}
		role="tooltip"
	>
		{@render children?.()}

		{#if showTooltip}
			<div
				class="absolute z-[9999] px-2 py-1 text-base text-white bg-black rounded font-normal select-none pointer-events-none whitespace-nowrap {placement ===
				'top'
					? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
					: placement === 'left'
						? 'right-full top-1/2 -translate-y-1/2 mr-2'
						: placement === 'right'
							? 'left-full top-1/2 -translate-y-1/2 ml-2'
							: 'top-full left-1/2 -translate-x-1/2 mt-2'}"
			>
				{content}
			</div>
		{/if}
	</div>
{:else}
	{@render children?.()}
{/if}
