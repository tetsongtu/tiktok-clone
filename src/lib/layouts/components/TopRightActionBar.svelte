<script lang="ts">
	import { userStore } from '~/lib/stores/userStore';
	import Button from '~/lib/components/Button.svelte';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import Menu from '~/lib/components/Menu.svelte';
	import AuthModal from '~/lib/features/AuthModal.svelte';
	import Tooltip from '~/lib/components/Tooltip.svelte';

	let showAuthModal = $state(false);
	const user = $derived($userStore);
	const isLoggedIn = $derived(user !== null);

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
		userStore.set(null);
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
			<a href="/upload" class="p-2 hover:bg-gray-100 rounded-full">
				<svg class="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66-5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,113.37V24a8,8,0,0,0-16,0v89.37L93.66,87a8,8,0,0,0-11.32,11.32Z"
					></path>
				</svg>
			</a>
		</Tooltip>
		<Tooltip content="Messages">
			<button class="p-2 hover:bg-gray-100 rounded-full">
				<svg class="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Z"
					></path>
				</svg>
			</button>
		</Tooltip>
		<Tooltip content="Inbox">
			<button class="p-2 hover:bg-gray-100 rounded-full relative">
				<svg class="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"
					></path>
				</svg>
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
				<svg class="w-5 h-5 mr-2" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
					></path>
				</svg>
				Upload
			{/snippet}
		</Button>
		<Button variant="primary" onclick={openAuthModal}>
			{#snippet children()}
				Log in
			{/snippet}
		</Button>
	{/if}

	<Menu items={userMenu}>
		<div class="ml-2">
			{#if isLoggedIn}
				<UserAvatar size={10} {user} />
			{:else}
				<div class="p-2 hover:bg-gray-100 rounded-full">
					<svg class="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
						<path
							d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"
						></path>
					</svg>
				</div>
			{/if}
		</div>
	</Menu>
</nav>

<AuthModal isOpen={showAuthModal} onClose={() => (showAuthModal = false)} />
