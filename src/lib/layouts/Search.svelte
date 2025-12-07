<script lang="ts">
	import { onMount } from 'svelte';
	import { IconSearch, IconClose, IconCheckCircle, IconSpinner } from '$lib/components/icons';
	import { searchService } from '$lib/services';
	import { UI } from '$lib/constants';
	import type { User } from '$lib/types';

	let searchValue = $state('');
	let searchResult = $state<User[]>([]);
	let showResult = $state(false);
	let loading = $state(false);
	let selectedIndex = $state(-1);
	let inputRef = $state<HTMLInputElement>();
	let debounceTimer: ReturnType<typeof setTimeout>;

	const hasText = $derived(searchValue.trim().length > 0);
	const showClear = $derived(hasText && !loading);
	const showDropdown = $derived(showResult && (searchResult.length > 0 || loading));

	async function searchAccounts(query: string) {
		if (!query.trim()) {
			searchResult = [];
			return;
		}

		loading = true;
		try {
			searchResult = await searchService.search(query);
			selectedIndex = -1;
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

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			searchAccounts(searchValue);
		}, UI.DEBOUNCE_DELAY + 200);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!showDropdown || searchResult.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, searchResult.length - 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, -1);
				break;
			case 'Enter':
				e.preventDefault();
				if (selectedIndex >= 0 && searchResult[selectedIndex]) {
					window.location.href = `/@${searchResult[selectedIndex].nickname}`;
				}
				break;
			case 'Escape':
				showResult = false;
				selectedIndex = -1;
				break;
		}
	}

	function handleClear() {
		searchValue = '';
		searchResult = [];
		selectedIndex = -1;
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
</script>

<search class="relative search-container" role="search">
	<div
		class="w-[208px] h-[40px] flex items-center gap-2 bg-gray-100 px-3 rounded-full focus-within:ring-2 focus-within:ring-primary/50 transition-shadow"
	>
		<IconSearch class="w-5 h-5 flex-shrink-0 {hasText ? 'text-gray-700' : 'text-gray-400'}" />

		<input
			bind:this={inputRef}
			bind:value={searchValue}
			oninput={handleInput}
			onkeydown={handleKeyDown}
			onfocus={() => (showResult = true)}
			placeholder="Tìm kiếm..."
			spellcheck="false"
			autocomplete="off"
			role="combobox"
			aria-expanded={showDropdown}
			aria-controls="search-results"
			aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
			class="flex-1 bg-transparent placeholder:text-gray-400 text-base outline-none"
		/>

		{#if showClear}
			<button
				type="button"
				aria-label="Clear search"
				class="rounded-full p-1 hover:bg-gray-200 transition-colors"
				onclick={handleClear}
			>
				<IconClose class="w-3 h-3" />
			</button>
		{/if}

		{#if loading}
			<IconSpinner class="w-4 h-4 animate-spin text-gray-500" />
		{/if}
	</div>

	{#if showDropdown}
		<div
			id="search-results"
			role="listbox"
			class="absolute top-full mt-2 left-0 w-full min-w-[280px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
		>
			{#if loading}
				<div class="flex items-center justify-center py-4">
					<IconSpinner class="w-5 h-5 animate-spin text-primary" />
				</div>
			{:else if searchResult.length > 0}
				<h4 class="px-3 py-2 text-sm font-medium text-gray-500 border-b">Accounts</h4>
				<ul>
					{#each searchResult as result, index (result.id)}
						<li>
							<a
								id="search-result-{index}"
								href="/@{result.nickname}"
								role="option"
								aria-selected={selectedIndex === index}
								class="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors {selectedIndex === index
									? 'bg-gray-100'
									: ''}"
								onclick={() => (showResult = false)}
							>
								<img
									src={result.avatar}
									alt=""
									class="w-10 h-10 rounded-full object-cover flex-shrink-0"
								/>
								<div class="ml-3 min-w-0">
									<p class="text-sm font-medium flex items-center gap-1">
										<span class="truncate">{result.nickname}</span>
										{#if result.tick}
											<IconCheckCircle class="w-4 h-4 text-blue-500 flex-shrink-0" />
										{/if}
									</p>
									<p class="text-sm text-gray-500 truncate">
										{result.first_name} {result.last_name}
									</p>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			{:else if hasText}
				<p class="px-3 py-4 text-sm text-gray-500 text-center">No results found</p>
			{/if}
		</div>
	{/if}
</search>
