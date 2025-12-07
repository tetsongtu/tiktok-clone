<script lang="ts">
	import { IconSpinner, IconPencil, IconUserCircle } from '~/lib/components/icons';
	import { page } from '$app/state';
	import { userStore } from '~/lib/stores/userStore';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import ProfilePost from '~/lib/features/ProfilePost.svelte';
	import EditProfileModal from '~/lib/features/EditProfileModal.svelte';
	import * as searchService from '~/lib/services/searchService';
	import * as videoService from '~/lib/services/videoService';
	import type { User, SuggestedUser, Video } from '~/lib/types/user';

	type Status = 'idle' | 'loading' | 'success' | 'error' | 'not_found';

	const rawNickname = $derived(page.params.nickname || '');
	const nickname = $derived(rawNickname.replace('@', '').trim());
	const user = $derived($userStore);
	const isOwnProfile = $derived(user?.nickname === nickname);

	let profileData = $state<SuggestedUser | User | null>(null);
	let status = $state<Status>('idle');
	let error = $state<string>('');
	let showEditProfile = $state(false);
	let activeTab = $state<'videos' | 'liked'>('videos');
	let userVideos = $state<Video[]>([]);
	let lastLoadedNickname = $state<string>('');
	
	// Cache profiles to avoid re-fetching
	const profileCache = new Map<string, SuggestedUser | User>();

	$effect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;
		
		async function loadProfile() {
			// Reset when nickname changes
			if (lastLoadedNickname !== nickname) {
				profileData = null;
				status = 'idle';
				userVideos = [];
			}

			if (!rawNickname.startsWith('@') && rawNickname !== nickname) {
				return;
			}

			if (!nickname || !/^[a-zA-Z0-9_]+$/.test(nickname) || nickname.length > 30) {
				status = 'error';
				error = 'Invalid username';
				lastLoadedNickname = nickname;
				return;
			}



			// If logged in and viewing own profile
			if (user?.nickname === nickname) {
				profileData = user;
				status = 'success';
				lastLoadedNickname = nickname;
				return;
			}

			// Check cache
			if (profileCache.has(nickname)) {
				profileData = profileCache.get(nickname) || null;
				status = 'success';
				lastLoadedNickname = nickname;
				return;
			}

			// Debounce API calls
			clearTimeout(timeoutId);
			status = 'loading';
			lastLoadedNickname = nickname;
			
			timeoutId = setTimeout(async () => {
				try {
					const results = await searchService.search(nickname, 'less');
					const foundUser = results?.find((u) => u.nickname === nickname) || null;
					
					if (foundUser) {
						profileData = foundUser;
						profileCache.set(nickname, foundUser);
						status = 'success';
					} else {
						status = 'not_found';
						error = 'User not found';
					}
				} catch (err) {
					status = 'error';
					error = 'Failed to load profile';
				}
			}, 300);
		}

		loadProfile();
		
		return () => clearTimeout(timeoutId);
	});

	$effect(() => {
		if (!profileData) {
			userVideos = [];
			return;
		}

		// Check if video passed via navigation state
		const stateVideo = (page.state as any)?.video as Video | undefined;
		if (stateVideo) {
			userVideos = [stateVideo];
			return;
		}

		// Check if profileData has popular_video (from SuggestedUser)
		if ('popular_video' in profileData && profileData.popular_video) {
			userVideos = [profileData.popular_video];
		} else {
			// TODO: Fetch user's videos from API when available
			userVideos = [];
		}
	});
</script>

{#if status !== 'success' || !profileData}
	<div class="px-10 min-h-screen flex items-center justify-center">
		<div class="text-center">
			{#if status === 'loading'}
				<div class="flex flex-col items-center gap-4">
					<IconSpinner class="w-12 h-12 text-[#F02C56] animate-spin" />
					<p class="text-gray-600 text-base">Đang tải hồ sơ...</p>
				</div>
			{:else}
				<div class="flex flex-col items-center gap-4">
					<IconUserCircle class="w-16 h-16 text-gray-400" />
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
						<IconPencil class="w-4 h-4 mr-2" />
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

			<div class="w-px h-8 bg-gray-300"></div>
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

		{#if userVideos.length > 0 && userVideos[0].description}
			<p class="pt-4 text-gray-600 text-base max-w-[600px] leading-relaxed text-left italic">
				"{userVideos[0].description}"
			</p>
		{/if}

		<div class="w-full flex items-center pt-8 border-b-2 border-gray-200 relative">
			<button
				onclick={() => (activeTab = 'videos')}
				class="w-60 text-center py-3 text-base font-normal cursor-pointer {activeTab === 'videos'
					? 'text-black'
					: 'text-gray-500'}"
			>
				Video
			</button>
			<button
				onclick={() => (activeTab = 'liked')}
				class="w-60 text-center py-3 text-base font-normal cursor-pointer {activeTab === 'liked'
					? 'text-black'
					: 'text-gray-500'}"
			>
				Đã thích
			</button>
			<div
				class="absolute bottom-0 left-0 h-[3px] bg-black transition-transform duration-300"
				style="width: 240px; transform: translateX({activeTab === 'videos' ? '0%' : '100%'})"
			></div>
		</div>

		<div class="mt-6">
			{#if activeTab === 'videos'}
				{#if userVideos.length > 0}
					<div class="grid grid-cols-6 gap-4">
						{#each userVideos as video (video.id)}
							<ProfilePost {video} />
						{/each}
					</div>
				{:else}
					<div class="text-center py-16 text-gray-500">
						<IconSpinner class="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<p class="text-base font-normal">Chưa có video nào</p>
						<p class="text-base mt-4">
							{isOwnProfile
								? 'Hãy tải lên video đầu tiên của bạn!'
								: 'Người dùng này chưa đăng video nào'}
						</p>
					</div>
				{/if}
			{:else}
				<div class="text-center py-16 text-gray-500">
					<IconSpinner class="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
