<script lang="ts">
	import { goto } from '$app/navigation';
	import { commentStore, userStore } from '$lib/stores';
	import { getAspectRatio } from '$lib/utils';
	import { VideoPlayer, VideoInfo, VideoActions, VideoUserProfile } from './post';
	import { useVideoObserver } from './post/useVideoObserver.svelte';
	import type { Video } from '$lib/types';

	interface Props {
		video: Video;
	}

	let { video }: Props = $props();

	let hasClickedLike = $state(false);
	let videoEl = $state<HTMLVideoElement>();
	let containerEl = $state<HTMLElement>();

	const activeVideoId = $derived(commentStore.activeVideoId);
	const isAnyCommentOpen = $derived(activeVideoId !== null);
	const aspectRatio = $derived(getAspectRatio(video));
	const isLoggedIn = $derived(userStore.isLoggedIn());

	function handleUserClick() {
		if (!video?.user) return;
		goto(`/@${video.user.nickname}`, {
			state: { video: { file_url: video.file_url, id: video.id } },
		});
	}

	function handleLike() {
		if (!isLoggedIn || hasClickedLike) return;
		hasClickedLike = true;
		// TODO: Call API to like video
	}

	async function handleShare() {
		const shareData = {
			title: video?.description || 'TikTok Video',
			text: `Check out this video by @${video?.user?.nickname}`,
			url: window.location.href,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.url);
				// TODO: Show toast notification "Link copied!"
			}
		} catch {
			// User cancelled share or error occurred
		}
	}

	$effect(() => {
		return useVideoObserver(video, videoEl, containerEl, activeVideoId);
	});
</script>

<article
	bind:this={containerEl}
	class="h-screen w-full flex justify-center items-center snap-start transition-all duration-300 {isAnyCommentOpen
		? 'pr-[150px]'
		: ''}"
	aria-label="Video post by {video?.user?.nickname || 'unknown'}"
>
	<div class="relative flex items-center justify-center">
		<VideoPlayer
			src={video?.file_url}
			{aspectRatio}
			{isAnyCommentOpen}
			onVideoMount={(el) => (videoEl = el)}
		/>

		<VideoInfo description={video?.description} />

		<aside class="absolute -right-22 bottom-0 flex items-center flex-col gap-4">
			<VideoUserProfile
				user={video.user}
				onUserClick={handleUserClick}
				onFollowClick={(e) => e.stopPropagation()}
			/>

			<VideoActions {video} {hasClickedLike} onLike={handleLike} onShare={handleShare} />
		</aside>
	</div>
</article>
