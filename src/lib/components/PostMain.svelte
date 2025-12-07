<script lang="ts">
	import { commentStore } from '~/lib/stores/commentStore';
	import UserAvatar from './UserAvatar.svelte';
	import ActionButton from './ActionButton.svelte';
	import { goto } from '$app/navigation';

	interface Props {
		post: any;
	}

	let { post }: Props = $props();

	let hasClickedLike = $state(false);
	let activeVideoId = $state<string | null>(null);

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
				: 'h-[95vh] max-w-[60vw]'}"
			id="video-{post?.id}"
			loop
			muted
			autoplay
			playsinline
			src={post?.file_url}
		></video>
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
						<svg class="w-3 h-3" viewBox="0 0 256 256" fill="currentColor">
							<path
								d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
							></path>
						</svg>
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
					<svg
						class="w-6 h-6"
						viewBox="0 0 256 256"
						fill={hasClickedLike ? '#ff2626' : '#374151'}
					>
						<path
							d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"
						></path>
					</svg>
				</ActionButton>

				<!-- Comment Button -->
				<ActionButton count={post.comments_count} onclick={handleToggleComments}>
					<svg class="w-6 h-6" viewBox="0 0 256 256" fill="#374151">
						<path
							d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Z"
						></path>
					</svg>
				</ActionButton>

				<!-- Share Button -->
				<ActionButton count={post.shares_count} onclick={handleShare}>
					<svg class="w-6 h-6" viewBox="0 0 256 256" fill="#374151">
						<path
							d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35Z"
						></path>
					</svg>
				</ActionButton>
			</div>
		</div>
	</div>
</div>
