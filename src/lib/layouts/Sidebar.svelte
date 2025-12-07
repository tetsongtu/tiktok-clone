<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import Search from './Search.svelte';
	import { SuggestedAccounts } from '$lib/features';
	import { userService } from '$lib/services';
	import { userStore } from '$lib/stores';
	import { SIDEBAR_MENU, PAGINATION, APP_CONFIG } from '$lib/constants';
	import type { SuggestedUser } from '$lib/types';

	let currentPage = $state(PAGINATION.INIT_PAGE);
	let suggestedUsers = $state<SuggestedUser[]>([]);
	let isLoading = $state(false);
	let hasMore = $state(true);
	let fetchedRef = false;

	const isLoggedIn = $derived(userStore.isLoggedIn());
	const currentYear = new Date().getFullYear();

	$effect(() => {
		if (fetchedRef && currentPage === PAGINATION.INIT_PAGE) return;
		fetchedRef = true;
		loadSuggestedUsers();
	});

	async function loadSuggestedUsers() {
		if (isLoading || !hasMore) return;

		isLoading = true;
		try {
			const data = await userService.getSuggested({
				page: currentPage,
				perPage: PAGINATION.PER_PAGE,
			});

			if (data.length < PAGINATION.PER_PAGE) {
				hasMore = false;
			}

			suggestedUsers = currentPage === PAGINATION.INIT_PAGE
				? data
				: [...suggestedUsers, ...data];
		} catch (error) {
			console.error('Failed to load suggested users:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleSeeAll() {
		if (!isLoading && hasMore) {
			currentPage++;
		}
	}

	const footerLinks = [
		{ label: 'Company', href: '#' },
		{ label: 'Program', href: '#' },
		{ label: 'Terms & Policies', href: '#' },
	] as const;
</script>

<aside
	id="Sidebar"
	class="fixed top-[70px] bottom-0 w-[280px] px-2.5 z-40 overflow-y-auto"
	aria-label="Sidebar navigation"
>
	<Search />

	<nav class="my-3" aria-label="Main navigation">
		{#each SIDEBAR_MENU as item (item.title)}
			<MenuItem {...item} />
		{/each}
	</nav>

	<section aria-label="Suggested accounts">
		<SuggestedAccounts
			label="Suggested accounts"
			data={suggestedUsers}
			onSeeAll={handleSeeAll}
			{isLoading}
			showSeeAll={hasMore}
		/>
	</section>

	{#if isLoggedIn}
		<section aria-label="Following accounts">
			<SuggestedAccounts label="Following" data={[]} />
		</section>
	{/if}

	<footer class="py-4 w-full text-sm">
		<hr class="border-gray-300 w-[90%] mb-4" />

		{#if !isLoggedIn}
			<div class="text-gray-600 mb-4">
				<p class="font-medium">Following accounts</p>
				<p class="text-gray-500">Accounts you follow will appear here</p>
			</div>
			<hr class="border-gray-300 w-[90%] mb-4" />
		{/if}

		<nav aria-label="Footer links">
			<ul class="text-gray-500 space-y-1">
				{#each footerLinks as link (link.label)}
					<li>
						<a href={link.href} class="hover:underline">{link.label}</a>
					</li>
				{/each}
				<li class="pt-2">© {currentYear} {APP_CONFIG.name}</li>
			</ul>
		</nav>
	</footer>
</aside>
