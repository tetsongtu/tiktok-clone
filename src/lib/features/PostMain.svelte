<script lang="ts">
	import { goto } from '$app/navigation';
	import { commentStore } from '$lib/stores';
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
	let containerEl = $state<HTMLDivElement>();

	const activeVideoId = $derived(commentStore.activeVideoId);
	const isAnyCommentOpen = $derived(activeVideoId !== null);
	const aspectRatio = $derived(getAspectRatio(video));

	const handleUserClick = () => {
		if (video?.user) {
			goto(`/@${video.user.nickname}`, { state: { video: { file_url: video.file_url, id: video.id } } });
		}
	};

	$effect(() => {
		return useVideoObserver(video, videoEl, containerEl, activeVideoId);
	});
</script>

<div
	bind:this={containerEl}
	class="h-screen w-full flex justify-center items-center snap-start {isAnyCommentOpen ? 'pr-[150px]' : ''}"
>
	<div class="relative flex items-center justify-center">
		<VideoPlayer
			src={video?.file_url}
			{aspectRatio}
			{isAnyCommentOpen}
			onVideoMount={(el) => videoEl = el}
		/>

		<VideoInfo description={video?.description} />

		<div class="absolute -right-22 bottom-0 flex items-center flex-col gap-4">
			<VideoUserProfile
				user={video.user}
				onUserClick={handleUserClick}
				onFollowClick={(e) => e.stopPropagation()}
			/>

			<VideoActions
				{video}
				{hasClickedLike}
				onLike={() => hasClickedLike = true}
				onShare={() => {}}
			/>
		</div>
	</div>
</div>
