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

	const empty = $derived({
		videos: { title: 'Chưa có video nào', desc: isOwnProfile ? 'Hãy tải lên video đầu tiên!' : 'Người dùng này chưa đăng video' },
		liked: { title: 'Chưa có video được thích', desc: isOwnProfile ? 'Các video bạn thích sẽ xuất hiện ở đây' : 'Video được thích là riêng tư' },
	}[activeTab]);
</script>

<div class="mt-6">
	{#if isLoading}
		<div class="grid grid-cols-6 gap-4">
			{#each Array(6) as _, i (i)}<div class="aspect-[9/16] bg-gray-200 rounded-lg animate-pulse"></div>{/each}
		</div>
	{:else if activeTab === 'videos' && userVideos.length}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
			{#each userVideos as video (video.id)}<ProfilePost {video} {nickname} />{/each}
		</div>
	{:else}
		<div class="text-center py-16 text-gray-500">
			{#if activeTab === 'videos'}<IconUpload class="w-16 h-16 text-gray-300 mx-auto mb-4" />{:else}<IconHeart class="w-16 h-16 text-gray-300 mx-auto mb-4" />{/if}
			<p class="text-lg font-medium">{empty.title}</p>
			<p class="text-sm mt-2 text-gray-400">{empty.desc}</p>
		</div>
	{/if}
</div>
