<script lang="ts">
	import { commentStore } from '~/lib/stores/commentStore';
	import { goto } from '$app/navigation';
	import type { Video } from '~/lib/types/user';
	import VideoPlayer from './post/VideoPlayer.svelte';
	import VideoInfo from './post/VideoInfo.svelte';
	import VideoActions from './post/VideoActions.svelte';
	import VideoUserProfile from './post/VideoUserProfile.svelte';
	import { useVideoObserver } from './post/useVideoObserver.svelte';
	import { useAspectRatio } from './post/useAspectRatio.svelte';

	interface Props {
		video: Video;
	}

	let { video }: Props = $props();

	let hasClickedLike = $state(false);
	let activeVideoId = $state<number | null>(null);
	let videoEl = $state<HTMLVideoElement>();
	let containerEl = $state<HTMLDivElement>();

	const isAnyCommentOpen = $derived(activeVideoId !== null);
	const aspectRatio = $derived(useAspectRatio(video));

	$effect(() => {
		activeVideoId = $commentStore.activeVideoId;
	});

	const handleUserClick = () => {
		if (video?.user) {
			goto(`/@${video.user.nickname}`, { state: { video: { file_url: video.file_url } } });
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
