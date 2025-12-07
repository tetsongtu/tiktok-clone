<script lang="ts">
	import { IconSpinner } from '~/lib/components/icons';
	import ProfilePost from './ProfilePost.svelte';
	import type { Video } from '~/lib/types/user';

	interface Props {
		activeTab: 'videos' | 'liked';
		userVideos: Video[];
		isOwnProfile: boolean;
	}

	let { activeTab, userVideos, isOwnProfile }: Props = $props();
</script>

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
