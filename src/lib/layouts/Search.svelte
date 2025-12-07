<script lang="ts">
	import { IconSearch, IconClose, IconCheckCircle, IconSpinner } from '~/lib/components/icons';
	import { onMount } from 'svelte';
	import classNames from 'classnames';
	import * as searchServices from '~/lib/services/searchService';
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
				<IconSearch class="w-5 h-5" />
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
				<IconClose class="w-3 h-3" />
			</button>
		{/if}

		{#if loading}
			<div class="mr-3">
				<IconSpinner class="w-3 h-3 animate-spin" />
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
								<IconCheckCircle class="w-4 h-4 ml-1 text-blue-500" />
							{/if}
						</p>
						<p class="text-base text-gray-600">{result.first_name} {result.last_name}</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
