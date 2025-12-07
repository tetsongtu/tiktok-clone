<script lang="ts">
	import { IconUpload, IconHeart } from '$lib/components/icons';
	import ProfilePost from './ProfilePost.svelte';
	import type { Video } from '$lib/types';

	interface Props {
		activeTab: 'videos' | 'liked';
		userVideos: Video[];
		isOwnProfile: boolean;
		nickname: string;
		isLoading?: boolean;
	}

	let { activeTab, userVideos, isOwnProfile, nickname, isLoading = false }: Props = $props();

	const emptyStateConfig = $derived({
		videos: {
			icon: IconUpload,
			title: 'Chưa có video nào',
			description: isOwnProfile
				? 'Hãy tải lên video đầu tiên của bạn!'
				: 'Người dùng này chưa đăng video nào',
		},
		liked: {
			icon: IconHeart,
			title: 'Chưa có video được thích',
			description: isOwnProfile
				? 'Các video bạn thích sẽ xuất hiện ở đây'
				: 'Video được thích của người dùng này là riêng tư',
		},
	});

	const currentEmptyState = $derived(emptyStateConfig[activeTab]);
</script>

<div
	id="tabpanel-{activeTab}"
	role="tabpanel"
	aria-labelledby="tab-{activeTab}"
	class="mt-6"
>
	{#if isLoading}
		<div class="grid grid-cols-6 gap-4">
			{#each Array(6) as _, i (i)}
				<div class="aspect-[9/16] bg-gray-200 rounded-lg animate-pulse"></div>
			{/each}
		</div>
	{:else if activeTab === 'videos' && userVideos.length > 0}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
			{#each userVideos as video (video.id)}
				<ProfilePost {video} {nickname} />
			{/each}
		</div>
	{:else}
		<div class="text-center py-16 text-gray-500">
			{#if activeTab === 'videos'}
				<IconUpload class="w-16 h-16 text-gray-300 mx-auto mb-4" />
			{:else}
				<IconHeart class="w-16 h-16 text-gray-300 mx-auto mb-4" />
			{/if}
			<p class="text-lg font-medium">{currentEmptyState.title}</p>
			<p class="text-sm mt-2 text-gray-400">{currentEmptyState.description}</p>
		</div>
	{/if}
</div>
