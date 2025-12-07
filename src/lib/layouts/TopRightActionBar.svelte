<script lang="ts">
	import { userStore } from '$lib/stores';
	import { Button, UserAvatar, Menu, Tooltip } from '$lib/components';
	import { AuthModal } from '$lib/features';
	import { IconUpload, IconMessage, IconInbox, IconPlus, IconDots } from '$lib/components/icons';

	let showAuthModal = $state(false);
	const user = $derived(userStore.current);
	const isLoggedIn = $derived(userStore.isLoggedIn());

	const MENU_ITEMS = [
		{
			icon: '🌐',
			title: 'English',
			children: {
				title: 'Language',
				data: [
					{ icon: '🇺🇸', title: 'English' },
					{ icon: '🇻🇳', title: 'Tiếng Việt' }
				]
			}
		},
		{ icon: '💬', title: 'Feedback and help', to: '/feedback' },
		{ icon: '⌨️', title: 'Keyboard shortcuts' }
	];

	function handleLogout() {
		userStore.logout();
	}

	function openAuthModal() {
		showAuthModal = true;
	}

	const userMenu = $derived(
		isLoggedIn
			? [
					{
						icon: '👤',
						title: 'View profile',
						to: `/@${user?.nickname || 'test'}`
					},
					{ icon: '💰', title: 'Get coins', to: '/coin' },
					{ icon: '⚙️', title: 'Settings', to: '/settings' },
					...MENU_ITEMS,
					{
						icon: '🚪',
						title: 'Log out',
						separate: true,
						onClick: handleLogout
					}
				]
			: MENU_ITEMS
	);
</script>

<nav class="flex items-center gap-2">
	{#if isLoggedIn}
		<Tooltip content="Upload video">
			<a href="/upload" aria-label="Upload video" class="p-2 hover:bg-gray-100 rounded-full">
				<IconUpload class="w-6 h-6" />
			</a>
		</Tooltip>
		<Tooltip content="Messages">
			<button aria-label="Messages" class="p-2 hover:bg-gray-100 rounded-full">
				<IconMessage class="w-6 h-6" />
			</button>
		</Tooltip>
		<Tooltip content="Inbox">
			<button aria-label="Inbox" class="p-2 hover:bg-gray-100 rounded-full relative">
				<IconInbox class="w-6 h-6" />
				<span
					class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
				>
					12
				</span>
			</button>
		</Tooltip>
	{:else}
		<Button variant="outline" onclick={openAuthModal}>
			{#snippet children()}
				<IconPlus class="w-5 h-5 mr-2" />
				Upload
			{/snippet}
		</Button>
		<Button variant="primary" onclick={openAuthModal}>
			{#snippet children()}
				Log in
			{/snippet}
		</Button>
	{/if}

	<Menu items={userMenu} hover={true}>
		<div class="ml-2">
			{#if isLoggedIn}
				<UserAvatar size={10} user={user ?? undefined} />
			{:else}
				<div class="p-2 hover:bg-gray-100 rounded-full">
					<IconDots class="w-6 h-6" />
				</div>
			{/if}
		</div>
	</Menu>
</nav>

<AuthModal isOpen={showAuthModal} onClose={() => (showAuthModal = false)} />
