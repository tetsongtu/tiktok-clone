<script lang="ts">
	import { commentStore } from '~/lib/stores/commentStore';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import ActionButton from '~/lib/components/ActionButton.svelte';
	import { IconPlay, IconMute, IconVolume, IconPlus, IconHeart, IconComment, IconShare } from '~/lib/components/icons';
	import { goto } from '$app/navigation';

	interface Props {
		post: any;
	}

	let { post }: Props = $props();

	let hasClickedLike = $state(false);
	let activeVideoId = $state<string | null>(null);
	let isPlaying = $state(true);
	let isMuted = $state(true);

	$effect(() => {
		activeVideoId = $commentStore.activeVideoId;
	});

	const showComments = $derived(activeVideoId === post.id);
	const isAnyCommentOpen = $derived(activeVideoId !== null);

	function handleToggleComments() {
		if (showComments) {
			commentStore.setActiveVideoId(null);
			goto('/');
		} else {
			commentStore.setActiveVideoId(post.id);
			goto(`/?video=${post.id}`);
		}
	}

	function handleLike() {
		hasClickedLike = true;
	}

	function handleShare() {
		// TODO: Implement share
	}

	function togglePlayPause() {
		const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
		if (!video) return;

		if (video.paused) {
			video.play();
			isPlaying = true;
		} else {
			video.pause();
			isPlaying = false;
		}
	}

	function toggleMute() {
		const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
		if (!video) return;

		video.muted = !video.muted;
		isMuted = video.muted;
	}

	function getAspectRatio() {
		const width = post?.meta?.video?.resolution_x;
		const height = post?.meta?.video?.resolution_y;

		if (!width || !height) return { class: 'aspect-[9/16]', isWide: false };

		const ratio = width / height;

		if (Math.abs(ratio - 1) < 0.15) {
			return { class: 'aspect-square', isWide: true };
		} else if (ratio > 1.3) {
			return { class: 'aspect-video', isWide: true };
		} else {
			return { class: 'aspect-[9/16]', isWide: false };
		}
	}

	const { class: aspectRatio, isWide } = getAspectRatio();

	$effect(() => {
		if (!post) return;

		const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
		const postMainElement = document.getElementById(`post-main-${post?.id}`);

		if (!postMainElement || !video) return;

		video.muted = true;
		video.autoplay = true;
		video.playsInline = true;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					video.play().catch(() => {});
					
					if (activeVideoId !== null) {
						commentStore.setActiveVideoId(post.id);
						goto(`/?video=${post.id}`);
					}
				} else {
					video.pause();
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(postMainElement);

		return () => observer.disconnect();
	});
</script>

<div
	class="h-screen w-full flex justify-center items-center snap-start {isAnyCommentOpen
		? 'pr-[150px]'
		: ''}"
	id="post-main-{post?.id}"
>
	<div class="relative flex items-center justify-center">
		<video
			class="{aspectRatio} rounded-2xl object-cover {isAnyCommentOpen && isWide
				? 'h-[85vh] max-w-[50vw]'
				: 'h-[95vh] max-w-[60vw]'} cursor-pointer"
			id="video-{post?.id}"
			loop
			muted
			autoplay
			playsinline
			src={post?.file_url}
			onclick={togglePlayPause}
		></video>
		
		<!-- Video Controls Overlay -->
		<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
			{#if !isPlaying}
				<div class="bg-black/50 rounded-full p-4">
					<IconPlay class="w-12 h-12 text-white" />
				</div>
			{/if}
		</div>

		<!-- Volume Control -->
		<button
			onclick={toggleMute}
			aria-label={isMuted ? 'Unmute' : 'Mute'}
			class="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 pointer-events-auto"
		>
			{#if isMuted}
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
				<p class="my-1 text-base">{post?.description}</p>
				<p class="text-gray-300">#fun #cool #SuperAwesome</p>
			</div>
		</div>
		<div class="absolute -right-22 bottom-0 flex items-center flex-col gap-4">
			<a class="flex justify-center mb-4 group" href="/@{post?.user?.nickname}">
				<div class="flex justify-center">
					<UserAvatar user={post.user} size={18} />
					<button
						aria-label="Follow"
						class="text-white flex justify-center items-center absolute size-8 rounded-full top-14 bg-[var(--primary)]"
					>
						<IconPlus class="w-3 h-3" />
					</button>
				</div>
			</a>

			<div id="post-likes-{post.id}">
				<!-- Like Button -->
				<ActionButton
					count={post.likes_count}
					onclick={handleLike}
					disabled={hasClickedLike}
					isActive={hasClickedLike}
					isLoading={hasClickedLike}
				>
					<IconHeart class="w-6 h-6 {hasClickedLike ? 'text-[#ff2626]' : 'text-gray-700'}" />
				</ActionButton>

				<!-- Comment Button -->
				<ActionButton count={post.comments_count} onclick={handleToggleComments}>
					<IconComment class="w-6 h-6 text-gray-700" />
				</ActionButton>

				<!-- Share Button -->
				<ActionButton count={post.shares_count} onclick={handleShare}>
					<IconShare class="w-6 h-6 text-gray-700" />
				</ActionButton>
			</div>
		</div>
	</div>
</div>
