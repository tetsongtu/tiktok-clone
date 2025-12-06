<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import classNames from 'classnames';

	interface MenuItem {
		icon?: string;
		title: string;
		to?: string;
		separate?: boolean;
		onClick?: () => void;
		children?: {
			title: string;
			data: MenuItem[];
		};
	}

	interface Props {
		items: MenuItem[];
		onChange?: (item: MenuItem) => void;
		children: any;
	}

	let { items = [], onChange = () => {}, children }: Props = $props();

	let isOpen = $state(false);
	let history = $state<{ title?: string; data: MenuItem[] }[]>([]);
	let menuRef: HTMLDivElement;

	const currentMenu = $derived(history[history.length - 1] || { data: items });

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (menuRef && !menuRef.contains(target)) {
			isOpen = false;
			history = [];
		}
	}

	function handleBack() {
		history = history.slice(0, -1);
	}

	function handleMenuItemClick(item: MenuItem) {
		if (item.children) {
			history = [...history, item.children];
		} else {
			history = [];
			isOpen = false;
			onChange(item);
			if (item.onClick) {
				item.onClick();
			}
			// Navigate if has 'to' property
			if (item.to) {
				goto(item.to);
			}
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	$effect(() => {
		// Reset history when items change
		if (items.length > 0) {
			history = [];
		}
	});
</script>

<div class="relative" bind:this={menuRef}>
	<button onclick={() => (isOpen = !isOpen)} class="cursor-pointer">
		{@render children()}
	</button>

	{#if isOpen}
		<div
			class="absolute top-full right-0 mt-2 min-w-[224px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2"
		>
			{#if currentMenu.title}
				<header class="flex items-center px-4 py-2 border-b border-gray-200">
					<button onclick={handleBack} class="text-lg font-bold mr-2">&lt;</button>
					<h4 class="text-base font-semibold">{currentMenu.title}</h4>
				</header>
			{/if}

			<div class="py-1">
				{#each currentMenu.data as item, index (index)}
					{#if item.separate}
						<div class="border-t border-gray-200 my-1"></div>
					{/if}
					<button
						onclick={() => handleMenuItemClick(item)}
						class={classNames(
							'w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-base',
							item.separate && 'border-t border-gray-200'
						)}
					>
						{#if item.icon}
							<span class="text-lg">{item.icon}</span>
						{/if}
						<span class="flex-1">{item.title}</span>
						{#if item.children}
							<svg class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
								<path
									d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
								></path>
							</svg>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
