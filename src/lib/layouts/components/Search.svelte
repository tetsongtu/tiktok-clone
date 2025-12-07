<script lang="ts">
	import { onMount } from 'svelte';
	import classNames from 'classnames';
	import * as searchServices from '~/core/services/searchService';
	import Tooltip from '~/lib/components/Tooltip.svelte';

	let searchValue = $state('');
	let searchResult = $state<any[]>([]);
	let showResult = $state(false);
	let loading = $state(false);
	let inputRef: HTMLInputElement;
	let debounceTimer: ReturnType<typeof setTimeout>;

	async function searchAccounts(query: string) {
		if (!query.trim()) {
			searchResult = [];
			return;
		}

		loading = true;
		try {
			const result = await searchServices.search(query);
			searchResult = result;
		} catch (error) {
			console.error('Search error:', error);
			searchResult = [];
		} finally {
			loading = false;
		}
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		if (value.startsWith(' ')) {
			searchValue = '';
			searchResult = [];
			return;
		}

		searchValue = value;

		// Debounce
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			searchAccounts(searchValue);
		}, 500);
	}

	function handleClear() {
		searchValue = '';
		searchResult = [];
		inputRef?.focus();
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.search-container')) {
			showResult = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
			clearTimeout(debounceTimer);
		};
	});

	const hasText = $derived(searchValue.trim().length > 0);
	const showClear = $derived(hasText && !loading);
	const showTooltip = $derived(showResult && searchResult.length > 0);
</script>

<div class="relative search-container">
	<div
		class="top-[16px] w-[208px] h-[40px] flex items-center justify-between gap-4 bg-gray-100 p-4 rounded-full"
	>
		<Tooltip content="Search">
			<button
				aria-label="Search"
				class={classNames(
					'h-full border-r border-r-gray-300 pr-2',
					hasText ? 'text-[rgba(22,24,35,0.75)]' : 'opacity-50'
				)}
			>
				<svg class="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					></path>
				</svg>
			</button>
		</Tooltip>
		<input
			bind:this={inputRef}
			bind:value={searchValue}
			oninput={handleInput}
			onfocus={() => (showResult = true)}
			placeholder="Tìm kiếm..."
			spellcheck="false"
			class="w-full p-4 bg-transparent placeholder:text-gray-400 text-base outline-none"
		/>
		{#if showClear}
			<button aria-label="Clear search" class="mr-2 rounded-full p-1 hover:bg-gray-200" onclick={handleClear}>
				<svg class="w-3 h-3" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
					></path>
				</svg>
			</button>
		{/if}

		{#if loading}
			<div class="mr-3">
				<svg class="w-3 h-3 animate-spin" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
					></path>
				</svg>
			</div>
		{/if}
	</div>

	{#if showTooltip}
		<div
			class="absolute top-full mt-2 left-0 min-w-[208px] bg-white rounded-lg shadow-xl border border-gray-200 z-50"
		>
			<h4 class="px-3 py-1 text-base font-normal text-gray-500">Accounts</h4>
			{#each searchResult as result (result.id)}
				<a
					href="/@{result.nickname}"
					class="flex items-center px-2 py-1 rounded hover:bg-gray-50"
					onclick={() => (showResult = false)}
				>
					<img
						src={result.avatar}
						alt={result.nickname}
						class="w-10 h-10 rounded-full object-cover"
					/>
					<div class="ml-3">
						<p class="text-base flex items-center">
							<strong>{result.nickname}</strong>
							{#if result.tick}
								<svg
									class="w-4 h-4 ml-1 text-blue-500"
									viewBox="0 0 256 256"
									fill="currentColor"
								>
									<path
										d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
									></path>
								</svg>
							{/if}
						</p>
						<p class="text-base text-gray-600">{result.first_name} {result.last_name}</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
