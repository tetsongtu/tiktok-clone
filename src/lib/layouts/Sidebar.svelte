<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import Search from './Search.svelte';
	import SuggestedAccounts from '~/lib/features/SuggestedAccounts.svelte';
	import * as userServices from '~/lib/services/userService';

	const INIT_PAGE = 1;
	const PER_PAGE = 5;

	let currentPage = $state(INIT_PAGE);
	let suggestedUsers = $state<any[]>([]);
	let fetchedRef = false;

	const SIDEBAR_MENU = [
		{
			title: 'For You',
			to: '/',
			icon: 'house',
			iconFill: 'house-fill',
		},
		{
			title: 'Following',
			to: '/following',
			icon: 'users',
			iconFill: 'users-fill',
		},
		{
			title: 'LIVE',
			to: '/live',
			icon: 'video',
			iconFill: 'video-fill',
		},
	];

	// Load when page changes (like useEffect with [page])
	$effect(() => {
		if (fetchedRef && currentPage === INIT_PAGE) return;
		fetchedRef = true;

		userServices
			.getSuggested({ page: currentPage, perPage: PER_PAGE })
			.then((data) => {
				suggestedUsers = currentPage === INIT_PAGE ? data : [...suggestedUsers, ...data];
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
