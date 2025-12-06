<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { userStore } from '~/lib/stores/userStore';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import ProfilePost from '~/lib/components/ProfilePost.svelte';
	import EditProfileModal from '~/lib/features/EditProfileModal.svelte';
	import * as searchService from '~/core/services/searchService';

	type Status = 'idle' | 'loading' | 'success' | 'error' | 'not_found';

	const rawNickname = $derived($page.params.nickname || '');
	const nickname = $derived(rawNickname.replace('@', '').trim());
	const user = $derived($userStore);
	const isOwnProfile = $derived(user?.nickname === nickname);

	let profileData = $state<any>(null);
	let status = $state<Status>('idle');
	let error = $state<string>('');
	let showEditProfile = $state(false);
	let activeTab = $state<'videos' | 'liked'>('videos');

	async function loadProfile() {
		// Only load if nickname starts with @ or is a valid username
		if (!rawNickname.startsWith('@') && rawNickname !== nickname) {
			// This is not a profile route (e.g., /following, /explore)
			return;
		}

		if (!nickname || !/^[a-zA-Z0-9_]+$/.test(nickname) || nickname.length > 30) {
			status = 'error';
			error = 'Invalid username';
			return;
		}

		if (user?.nickname === nickname) {
			profileData = user;
			status = 'success';
			return;
		}

		status = 'loading';
		try {
			const results = await searchService.search(nickname, 'less');
			const foundUser = results?.find((u: any) => u.nickname === nickname);
			
			if (foundUser) {
				profileData = foundUser;
				status = 'success';
			} else {
				status = 'not_found';
				error = 'User not found';
			}
		} catch (err) {
			status = 'error';
			error = 'Failed to load profile';
		}
	}

	onMount(() => {
		loadProfile();
	});

	$effect(() => {
		// Reload when nickname or user changes
		nickname;
		user;
		loadProfile();
	});
</script>

{#if status !== 'success' || !profileData}
	<div class="px-10 min-h-screen flex items-center justify-center">
		<div class="text-center">
			{#if status === 'loading'}
				<div class="flex flex-col items-center gap-4">
					<svg class="w-12 h-12 text-[#F02C56] animate-spin" viewBox="0 0 256 256" fill="currentColor">
						<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
					</svg>
					<p class="text-gray-600 text-base">Đang tải hồ sơ...</p>
				</div>
			{:else}
				<div class="flex flex-col items-center gap-4">
					<svg class="w-16 h-16 text-gray-400" viewBox="0 0 256 256" fill="currentColor">
						<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a56,56,0,0,0-56,56,8,8,0,0,1-16,0,72,72,0,1,1,72,72,8,8,0,0,1,0-16A56,56,0,0,0,128,72Z" />
					</svg>
					<p class="text-red-500 text-base font-normal">{error}</p>
					<p class="text-gray-500">Không tìm thấy người dùng @{nickname}</p>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="pt-[90px] px-10">
		<div class="flex flex-row gap-4">
			<div class="flex justify-start">
				<UserAvatar size={30} class="ring-4 ring-purple-200 shadow-lg" user={profileData} />
			</div>

			<div class="flex-1 text-left">
				<div class="mb-4">
					<h1 class="text-base font-normal truncate text-gray-900">
						{profileData.nickname}
					</h1>
					<p class="text-base text-gray-600 truncate mt-4">
						{profileData.first_name} {profileData.last_name}
					</p>
				</div>

				{#if isOwnProfile}
					<button
						onclick={() => (showEditProfile = true)}
						class="inline-flex items-center justify-center rounded-lg py-2.5 px-4 font-normal border-2 border-gray-300"
					>
						<svg class="w-4 h-4 mr-2" viewBox="0 0 256 256" fill="currentColor">
							<path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63Z" />
						</svg>
						<span>Edit profile</span>
					</button>
				{:else}
					<button
						class="inline-flex items-center justify-center rounded-lg py-2.5 px-6 text-base text-white font-normal bg-[#F02C56] shadow-md"
					>
						Theo dõi
					</button>
				{/if}
			</div>
		</div>

		<div class="flex items-center justify-start gap-4 pt-6">
			<div class="text-left">
				<span class="text-base font-normal text-gray-900 block">
					{profileData?.followings_count || 0}
				</span>
				<span class="text-gray-500 font-normal text-base">Đang theo dõi</span>
			</div>

			<div class="w-px h-8 bg-gray-300" />
			<div class="text-left">
				<span class="text-base font-normal text-gray-900 block">
					{profileData?.likes_count || 0}
				</span>
				<span class="text-gray-500 font-normal text-base">Thích</span>
			</div>
		</div>

		{#if profileData?.bio}
			<p class="pt-6 text-gray-700 text-base max-w-[600px] leading-relaxed text-left">
				{profileData.bio}
			</p>
		{/if}

		<ul class="w-full flex items-center pt-8 border-b-2 border-gray-200 relative">
			<li
				onclick={() => (activeTab = 'videos')}
				class="w-60 text-center py-3 text-base font-normal cursor-pointer {activeTab === 'videos'
					? 'text-black'
					: 'text-gray-500'}"
			>
				Video
			</li>
			<li
				onclick={() => (activeTab = 'liked')}
				class="w-60 text-center py-3 text-base font-normal cursor-pointer {activeTab === 'liked'
					? 'text-black'
					: 'text-gray-500'}"
			>
				Đã thích
			</li>
			<div
				class="absolute bottom-0 left-0 h-[3px] bg-black transition-transform duration-300"
				style="width: 240px; transform: translateX({activeTab === 'videos' ? '0%' : '100%'})"
			/>
		</ul>

		<div class="mt-6">
			{#if activeTab === 'videos'}
				{#if profileData?.videos?.length > 0}
					<div class="grid grid-cols-6 gap-4">
						{#each profileData.videos as video (video.id)}
							<ProfilePost post={video} />
						{/each}
					</div>
				{:else}
					<div class="text-center py-16 text-gray-500">
						<svg class="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 256 256" fill="currentColor">
							<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
						</svg>
						<p class="text-base font-normal">Chưa có video nào</p>
						<p class="text-base mt-4">
							{isOwnProfile
								? 'Hãy tải lên video đầu tiên của bạn!'
								: 'Người dùng này chưa đăng video nào'}
						</p>
					</div>
				{/if}
			{:else if profileData?.liked_videos?.length > 0}
				<div class="grid grid-cols-6 gap-4">
					{#each profileData.liked_videos as video (video.id)}
						<ProfilePost post={video} />
					{/each}
				</div>
			{:else}
				<div class="text-center py-16 text-gray-500">
					<svg class="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 256 256" fill="currentColor">
						<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
					</svg>
					<p class="text-base font-normal">Chưa có video được thích</p>
					<p class="text-base mt-4">
						{isOwnProfile
							? 'Các video bạn thích sẽ xuất hiện ở đây'
							: 'Video được thích của người dùng này là riêng tư'}
					</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if showEditProfile}
	<EditProfileModal onClose={() => (showEditProfile = false)} />
{/if}
