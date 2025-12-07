<script lang="ts">
	import { commentStore } from '~/lib/stores/commentStore';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import ActionButton from '~/lib/components/ActionButton.svelte';
	import { IconPlay, IconMute, IconVolume, IconPlus, IconHeart, IconComment, IconShare } from '~/lib/components/icons';
	import { goto } from '$app/navigation';
	import type { Video } from '~/lib/types/user';

	interface Props {
		video: Video;
	}

	let { video }: Props = $props();

	// State
	let hasClickedLike = $state(false);
	let activeVideoId = $state<number | null>(null);
	let videoState = $state({ isPlaying: true, isMuted: false });
	let videoEl = $state<HTMLVideoElement>();
	let containerEl = $state<HTMLDivElement>();

	// Derived
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

	// Sync active video
	$effect(() => {
		activeVideoId = $commentStore.activeVideoId;
	});

	// Handlers
	const handleToggleComments = () => {
		if (showComments) {
			commentStore.setActiveVideoId(null);
			goto('/');
		} else {
			commentStore.setActiveVideoId(video.id);
			goto(`/?video=${video.id}`);
		}
	};

	const togglePlayPause = () => {
		if (!videoEl) return;

		if (videoEl.paused) {
			videoEl.play();
			videoState.isPlaying = true;
		} else {
			videoEl.pause();
			videoState.isPlaying = false;
		}
	};

	const toggleMute = () => {
		if (!videoEl) return;
		const newMutedState = !videoEl.muted;
		videoEl.muted = newMutedState;
		videoState.isMuted = newMutedState;
	};

	// Video intersection observer
	$effect(() => {
		if (!video || !videoEl || !containerEl) return;

		videoEl.autoplay = true;
		videoEl.playsInline = true;

		const observer = new IntersectionObserver(
			(entries) => {
				const videoElement = videoEl;
				if (!videoElement) return;
				
				if (entries[0].isIntersecting) {
					// Tự động phát và bật âm thanh khi video hiển thị
					videoElement.muted = false;
					videoState.isMuted = false;
					videoState.isPlaying = true;
					videoElement.play().catch(() => {
						// Fallback: nếu không thể phát với âm thanh, thử muted
						videoElement.muted = true;
						videoState.isMuted = true;
						videoElement.play().catch(() => {});
					});
					
					if (activeVideoId !== null) {
						commentStore.setActiveVideoId(video.id);
						goto(`/?video=${video.id}`);
					}
				} else {
					videoElement.pause();
					videoState.isPlaying = false;
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(containerEl);

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={containerEl}
	class="h-screen w-full flex justify-center items-center snap-start {isAnyCommentOpen
		? 'pr-[150px]'
		: ''}"
>
	<div class="relative flex items-center justify-center">
		<video
			bind:this={videoEl}
			class="{aspectRatio.class} rounded-2xl object-cover {isAnyCommentOpen && aspectRatio.isWide
				? 'h-[85vh] max-w-[50vw]'
				: 'h-[95vh] max-w-[60vw]'} cursor-pointer"
			loop
			autoplay
			playsinline
			src={video?.file_url}
			onclick={togglePlayPause}
		></video>
		
		<!-- Video Controls Overlay -->
		{#if !videoState.isPlaying}
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div class="bg-black/50 rounded-full p-4">
					<IconPlay class="w-12 h-12 text-white" />
				</div>
			</div>
		{/if}

		<!-- Volume Control -->
		<button
			onclick={toggleMute}
			aria-label={videoState.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
			class="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
		>
			{#if videoState.isMuted}
				<IconMute class="w-6 h-6 text-white" />
			{:else}
				<IconVolume class="w-6 h-6 text-white" />
			{/if}
		</button>
		<div class="absolute bottom-0 left-0 right-0 pointer-events-none">
			<div
				class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-b-2xl"
			></div>

			<div class="relative p-4 text-white">
				<p class="my-1 text-base">{video?.description}</p>
				<p class="text-gray-300">#fun #cool #SuperAwesome</p>
			</div>
		</div>
		<div class="absolute -right-22 bottom-0 flex items-center flex-col gap-4">
			<div class="flex justify-center mb-4 group relative">
				<button
					type="button"
					onclick={() => {
						if (video?.user) {
							const videoData = {
								file_url: video.file_url,
							};
							goto(`/@${video.user.nickname}`, { state: { video: videoData } });
						}
					}}
					class="flex justify-center"
				>
					<UserAvatar user={video.user} size={18} />
				</button>
				<button
					aria-label="Follow"
					onclick={(e) => e.stopPropagation()}
					class="text-white flex justify-center items-center absolute size-8 rounded-full top-14 bg-[var(--primary)]"
				>
					<IconPlus class="w-3 h-3" />
				</button>
			</div>

			<div id="post-likes-{video.id}">
				<ActionButton
					count={video.likes_count}
					onclick={() => hasClickedLike = true}
					disabled={hasClickedLike}
					isActive={hasClickedLike}
					isLoading={hasClickedLike}
				>
					<IconHeart class="w-6 h-6 {hasClickedLike ? 'text-[#ff2626]' : 'text-gray-700'}" />
				</ActionButton>

				<ActionButton count={video.comments_count} onclick={handleToggleComments}>
					<IconComment class="w-6 h-6 text-gray-700" />
				</ActionButton>

				<ActionButton count={video.shares_count} onclick={() => {}}>
					<IconShare class="w-6 h-6 text-gray-700" />
				</ActionButton>
			</div>
		</div>
	</div>
</div>
