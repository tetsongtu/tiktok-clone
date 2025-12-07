<script lang="ts">
	import { commentStore } from '~/lib/stores/commentStore';
	import { goto, replaceState } from '$app/navigation';
	import type { Video } from '~/lib/types/user';
	import VideoPlayer from './post/VideoPlayer.svelte';
	import VideoInfo from './post/VideoInfo.svelte';
	import VideoActions from './post/VideoActions.svelte';
	import VideoUserProfile from './post/VideoUserProfile.svelte';
	import { useVideoObserver } from './post/useVideoObserver.svelte';

	interface Props {
		video: Video;
	}

	let { video }: Props = $props();

	let hasClickedLike = $state(false);
	let activeVideoId = $state<number | null>(null);
	let videoEl = $state<HTMLVideoElement>();
	let containerEl = $state<HTMLDivElement>();

	const showComments = $derived(activeVideoId === video.id);
	const isAnyCommentOpen = $derived(activeVideoId !== null);
	const aspectRatio = $derived.by(() => {
		const width = video?.meta?.video?.resolution_x;
		const height = video?.meta?.video?.resolution_y;
		if (!width || !height) return { class: 'aspect-[9/16]', isWide: false };
		const ratio = width / height;
		if (Math.abs(ratio - 1) < 0.15) return { class: 'aspect-square', isWide: true };
		if (ratio > 1.3) return { class: 'aspect-video', isWide: true };
		return { class: 'aspect-[9/16]', isWide: false };
	});

	$effect(() => {
		activeVideoId = $commentStore.activeVideoId;
	});

	const handleToggleComments = () => {
		const username = video?.user?.nickname;
		if (showComments) {
			commentStore.setActiveVideoId(null);
		} else {
			commentStore.setActiveVideoId(video.id);
		}
		replaceState(showComments ? '/' : `/@${username}/video/${video.id}`, {});
	};

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
				videoId={video.id}
				likesCount={video.likes_count}
				commentsCount={video.comments_count}
				sharesCount={video.shares_count}
				{hasClickedLike}
				onLike={() => hasClickedLike = true}
				onComment={handleToggleComments}
				onShare={() => {}}
			/>
		</div>
	</div>
</div>
