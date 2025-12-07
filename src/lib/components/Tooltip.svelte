<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		content?: string;
		render?: Snippet;
		children: Snippet;
		placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end';
		delay?: number;
		offset?: [number, number];
		visible?: boolean;
		onClickOutside?: () => void;
	}

	let {
		content,
		render,
		children,
		placement = 'bottom',
		delay = 0,
		offset = [0, 6],
		visible,
		onClickOutside
	}: Props = $props();

	let showTooltip = $state(false);
	let tooltipEl = $state<HTMLDivElement>();
	let wrapperEl = $state<HTMLDivElement>();
	let hoverTimeout: ReturnType<typeof setTimeout>;

	// Cleanup timeout on unmount
	$effect(() => {
		return () => clearTimeout(hoverTimeout);
	});

	const isVisible = $derived(visible !== undefined ? visible : showTooltip);

	function handleMouseEnter() {
		if (visible === undefined) {
			clearTimeout(hoverTimeout);
			hoverTimeout = setTimeout(() => {
				showTooltip = true;
			}, delay);
		}
	}

	function handleMouseLeave() {
		if (visible === undefined) {
			clearTimeout(hoverTimeout);
			showTooltip = false;
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (onClickOutside && isVisible) {
			const target = e.target as Node;
			const isClickInside =
				tooltipEl?.contains(target) || wrapperEl?.contains(target);

			if (!isClickInside) {
				onClickOutside();
			}
		}
	}

	onMount(() => {
		if (onClickOutside) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	});

	// Calculate position
	$effect(() => {
		if (isVisible && tooltipEl && wrapperEl) {
			const rect = wrapperEl.getBoundingClientRect();
			const [crossAxis, mainAxis] = offset;
			const tooltipWidth = tooltipEl.offsetWidth;
			const tooltipHeight = tooltipEl.offsetHeight;
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			let top = 0;
			let left = 0;

			if (placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end') {
				top = rect.bottom + mainAxis;
				if (placement === 'bottom-start') {
					left = rect.left + crossAxis;
				} else if (placement === 'bottom-end') {
					left = rect.right - tooltipWidth + crossAxis;
				} else {
					left = rect.left + rect.width / 2 - tooltipWidth / 2 + crossAxis;
				}
			} else if (placement === 'top') {
				top = rect.top - tooltipHeight - mainAxis;
				left = rect.left + rect.width / 2 - tooltipWidth / 2 + crossAxis;
			} else if (placement === 'left') {
				top = rect.top + rect.height / 2 - tooltipHeight / 2 + crossAxis;
				left = rect.left - tooltipWidth - mainAxis;
			} else if (placement === 'right') {
				top = rect.top + rect.height / 2 - tooltipHeight / 2 + crossAxis;
				left = rect.right + mainAxis;
			}

			// Keep within viewport bounds
			if (left + tooltipWidth > viewportWidth) {
				left = viewportWidth - tooltipWidth - 10;
			}
			if (left < 10) {
				left = 10;
			}
			if (top + tooltipHeight > viewportHeight) {
				top = viewportHeight - tooltipHeight - 10;
			}
			if (top < 10) {
				top = 10;
			}

			tooltipEl.style.top = `${top}px`;
			tooltipEl.style.left = `${left}px`;
		}
	});
</script>

<div
	bind:this={wrapperEl}
	class="inline-flex"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="tooltip"
>
	{@render children()}
</div>

{#if isVisible}
	<div
		bind:this={tooltipEl}
		class="fixed z-[9999] {content
			? 'px-2 py-1 text-base text-white bg-black rounded font-normal select-none pointer-events-none whitespace-nowrap'
			: ''}"
		style="visibility: {isVisible ? 'visible' : 'hidden'}"
	>
		{#if content}
			{content}
		{:else if render}
			{@render render()}
		{/if}
	</div>
{/if}
