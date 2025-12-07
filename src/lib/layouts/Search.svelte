<script lang="ts">
	import { onMount } from 'svelte';
	import { IconSearch, IconClose, IconCheckCircle, IconSpinner } from '$lib/components/icons';
	import { searchService } from '$lib/services';
	import { UI } from '$lib/constants';
	import type { User } from '$lib/types';

	let value = $state('');
	let results = $state<User[]>([]);
	let show = $state(false);
	let loading = $state(false);
	let selected = $state(-1);
	let inputRef = $state<HTMLInputElement>();
	let timer: ReturnType<typeof setTimeout>;

	const hasText = $derived(value.trim().length > 0);
	const showDropdown = $derived(show && (results.length > 0 || loading));

	async function search(q: string) {
		if (!q.trim()) { results = []; return; }
		loading = true;
		try { results = await searchService.search(q); selected = -1; }
		catch { results = []; }
		loading = false;
	}

	function onInput(e: Event) {
		const v = (e.target as HTMLInputElement).value;
		if (v.startsWith(' ')) { value = ''; results = []; return; }
		value = v;
		clearTimeout(timer);
		timer = setTimeout(() => search(value), UI.DEBOUNCE_DELAY + 200);
	}

	function onKey(e: KeyboardEvent) {
		if (!showDropdown || !results.length) return;
		if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, results.length - 1); }
		else if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, -1); }
		else if (e.key === 'Enter' && selected >= 0) { e.preventDefault(); location.href = `/@${results[selected].nickname}`; }
		else if (e.key === 'Escape') { show = false; selected = -1; }
	}

	function clear() { value = ''; results = []; selected = -1; inputRef?.focus(); }

	onMount(() => {
		const handler = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('.search-box')) show = false; };
		document.addEventListener('click', handler);
		return () => { document.removeEventListener('click', handler); clearTimeout(timer); };
	});
</script>

<div class="relative search-box">
	<div class="w-[208px] h-[40px] flex items-center gap-2 bg-gray-100 px-3 rounded-full">
		<IconSearch class="w-5 h-5 {hasText ? 'text-gray-700' : 'text-gray-400'}" />
		<input bind:this={inputRef} bind:value oninput={onInput} onkeydown={onKey} onfocus={() => show = true}
			placeholder="Tìm kiếm..." spellcheck="false" autocomplete="off" class="flex-1 bg-transparent text-base outline-none" />
		{#if hasText && !loading}<button onclick={clear} class="p-1 hover:bg-gray-200 rounded-full"><IconClose class="w-3 h-3" /></button>{/if}
		{#if loading}<IconSpinner class="w-4 h-4 animate-spin text-gray-500" />{/if}
	</div>

	{#if showDropdown}
		<div class="absolute top-full mt-2 left-0 w-full min-w-[280px] bg-white rounded-lg shadow-xl border z-50">
			{#if loading}
				<div class="flex justify-center py-4"><IconSpinner class="w-5 h-5 animate-spin text-primary" /></div>
			{:else if results.length}
				<h4 class="px-3 py-2 text-sm font-medium text-gray-500 border-b">Accounts</h4>
				{#each results as r, i (r.id)}
					<a href="/@{r.nickname}" onclick={() => show = false}
						class="flex items-center px-3 py-2 hover:bg-gray-50 {selected === i ? 'bg-gray-100' : ''}">
						<img src={r.avatar} alt="" class="w-10 h-10 rounded-full object-cover" />
						<div class="ml-3 min-w-0">
							<p class="text-sm font-medium flex items-center gap-1">
								<span class="truncate">{r.nickname}</span>
								{#if r.tick}<IconCheckCircle class="w-4 h-4 text-blue-500" />{/if}
							</p>
							<p class="text-sm text-gray-500 truncate">{r.first_name} {r.last_name}</p>
						</div>
					</a>
				{/each}
			{:else if hasText}
				<p class="px-3 py-4 text-sm text-gray-500 text-center">No results found</p>
			{/if}
		</div>
	{/if}
</div>
