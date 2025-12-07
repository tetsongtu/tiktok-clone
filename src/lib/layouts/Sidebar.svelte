<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import Search from './Search.svelte';
	import { SuggestedAccounts } from '$lib/features';
	import { userService } from '$lib/services';
	import { SIDEBAR_MENU, PAGINATION } from '$lib/constants';
	import type { SuggestedUser } from '$lib/types';

	let currentPage = $state(PAGINATION.INIT_PAGE);
	let suggestedUsers = $state<SuggestedUser[]>([]);
	let fetchedRef = false;

	$effect(() => {
		if (fetchedRef && currentPage === PAGINATION.INIT_PAGE) return;
		fetchedRef = true;

		userService
			.getSuggested({ page: currentPage, perPage: PAGINATION.PER_PAGE })
			.then((data) => {
				suggestedUsers = currentPage === PAGINATION.INIT_PAGE ? data : [...suggestedUsers, ...data];
			})
			.catch(console.error);
	});

	function handleSeeAll() {
		currentPage++;
	}
</script>

<aside id="Sidebar" class="fixed top-[70px] bottom-0 w-[280px] px-2.5 z-40">
	<nav>
		<Search />
		<nav class="my-[12px]">
			{#each SIDEBAR_MENU as item (item.title)}
				<MenuItem {...item} />
			{/each}
		</nav>
	</nav>

	<section>
		<SuggestedAccounts
			label="Suggested accounts"
			data={suggestedUsers}
			onSeeAll={handleSeeAll}
		/>
	</section>

	<section>
		<SuggestedAccounts label="Following" data={[]} />
	</section>

	<footer class="py-4 w-full">
		<hr class="border-gray-400 w-[90%]" />
		<section class="text-base font-normal text-gray-700 w-full">
			<p>Following accounts</p>
			<p>Accounts you follow will appear here</p>
		</section>
		<hr class="border-gray-400 w-[90%]" />

		<ul class="text-base font-normal text-gray-500 w-full space-y-1">
			<li>Company</li>
			<li>Program</li>
			<li>Terms & Policies</li>
			<li>© 2025 TikTok</li>
		</ul>
	</footer>
</aside>
