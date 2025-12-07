<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import Search from './Search.svelte';
	import { SuggestedAccounts } from '$lib/features';
	import { userService } from '$lib/services';
	import { userStore } from '$lib/stores';
	import { SIDEBAR_MENU, PAGINATION } from '$lib/constants';
	import type { SuggestedUser } from '$lib/types';

	let page = $state(1);
	let users = $state<SuggestedUser[]>([]);
	let loading = $state(false);
	let hasMore = $state(true);
	let fetched = false;

	const isLoggedIn = $derived(userStore.isLoggedIn());

	$effect(() => {
		if (fetched && page === 1) return;
		fetched = true;
		loadUsers();
	});

	async function loadUsers() {
		if (loading || !hasMore) return;
		loading = true;
		try {
			const data = await userService.getSuggested({ page, perPage: PAGINATION.PER_PAGE });
			if (data.length < PAGINATION.PER_PAGE) hasMore = false;
			users = page === 1 ? data : [...users, ...data];
		} catch (e) { console.error(e); }
		loading = false;
	}
</script>

<aside id="Sidebar" class="fixed top-[70px] bottom-0 w-[280px] px-2.5 z-40 overflow-y-auto">
	<Search />
	<nav class="my-3">
		{#each SIDEBAR_MENU as item (item.title)}
			<MenuItem {...item} />
		{/each}
	</nav>

	<SuggestedAccounts label="Suggested accounts" data={users} onSeeAll={() => !loading && hasMore && page++} isLoading={loading} showSeeAll={hasMore} />

	{#if isLoggedIn}
		<SuggestedAccounts label="Following" data={[]} />
	{/if}

	<footer class="py-4 text-sm text-gray-500">
		<hr class="border-gray-300 w-[90%] mb-4" />
		{#if !isLoggedIn}
			<p class="font-medium text-gray-600">Following accounts</p>
			<p class="mb-4">Accounts you follow will appear here</p>
			<hr class="border-gray-300 w-[90%] mb-4" />
		{/if}
		<ul class="space-y-1">
			<li><span class="cursor-pointer hover:underline">Company</span></li>
			<li><span class="cursor-pointer hover:underline">Terms & Policies</span></li>
			<li class="pt-2">© {new Date().getFullYear()} TikTok</li>
		</ul>
	</footer>
</aside>
