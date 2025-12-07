<script lang="ts">
	import { goto } from '$app/navigation';
	import { IconChartBar } from '~/lib/components/icons';
	import type { Video } from '~/lib/types/user';

	interface Props {
		video: Video;
		nickname: string;
	}

	let { video, nickname }: Props = $props();
	let videoEl = $state<HTMLVideoElement>();

	function handleMouseEnter() {
		videoEl?.play();
	}

	function handleMouseLeave() {
		videoEl?.pause();
	}

	function handleNavigate() {
		goto(`/@${nickname}/video/${video.id}`);
	}
</script>

<div class="relative cursor-pointer">
	<div 
		role="button"
		tabindex="0"
		aria-label="View video post"
		onclick={handleNavigate}
		onkeydown={(e) => e.key === 'Enter' && handleNavigate()}
		class="aspect-[3/4] bg-gray-200 rounded-md flex items-center justify-center"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		{#if video?.file_url}
			<video
				bind:this={videoEl}
				muted
				loop
				class="w-full h-full object-cover rounded-md"
				src={video.file_url}
			></video>
		{:else}
			<span class="text-gray-400 text-sm">No video</span>
		{/if}
	</div>
	<div class="px-1 mt-2">
		<p class="text-gray-700 text-[15px] break-words line-clamp-2">
			{video?.description || ''}
		</p>
		<div class="flex items-center gap-2 text-gray-600 text-sm mt-1">
			<IconChartBar class="w-4 h-4" />
			<span>{video?.likes_count || 0}</span>
		</div>
	</div>
</div>
