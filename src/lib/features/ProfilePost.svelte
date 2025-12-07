<script lang="ts">
	import { goto } from '$app/navigation';
	import { IconChartBar, IconPlay } from '$lib/components/icons';
	import { formatCount } from '$lib/utils';
	import type { Video } from '$lib/types';

	interface Props {
		video: Video;
		nickname: string;
	}

	let { video, nickname }: Props = $props();
	let videoEl = $state<HTMLVideoElement>();
	let isHovering = $state(false);

	const formattedLikes = $derived(formatCount(video?.likes_count || 0));

	function handleMouseEnter() {
		isHovering = true;
		videoEl?.play();
	}

	function handleMouseLeave() {
		isHovering = false;
		videoEl?.pause();
	}

	function handleNavigate() {
		goto(`/@${nickname}/video/${video.id}`);
	}
</script>

<article class="group cursor-pointer">
	<div
		role="button"
		tabindex="0"
		aria-label="View video post"
		onclick={handleNavigate}
		onkeydown={(e) => e.key === 'Enter' && handleNavigate()}
		class="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		{#if video?.file_url}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				bind:this={videoEl}
				muted
				loop
				playsinline
				class="w-full h-full object-cover"
				src={video.file_url}
			></video>

			<!-- Play icon overlay -->
			{#if !isHovering}
				<div class="absolute inset-0 flex items-center justify-center bg-black/10">
					<IconPlay class="w-12 h-12 text-white/80" />
				</div>
			{/if}
		{:else}
			<div class="w-full h-full flex items-center justify-center">
				<span class="text-gray-400 text-sm">No video</span>
			</div>
		{/if}

		<!-- Hover overlay -->
		<div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
	</div>

	<div class="px-1 mt-2">
		<p class="text-gray-700 text-sm break-words line-clamp-2">
			{video?.description || ''}
		</p>
		<div class="flex items-center gap-1.5 text-gray-600 text-sm mt-1">
			<IconChartBar class="w-4 h-4" />
			<span>{formattedLikes}</span>
		</div>
	</div>
</article>
