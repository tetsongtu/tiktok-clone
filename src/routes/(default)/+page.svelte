<script lang="ts">
	import { IconClose, IconHeart, IconShare } from '~/lib/components/icons';
	import PostMain from '~/lib/features/PostMain.svelte';
	import * as videoService from '~/lib/services/videoService';
	import { commentStore } from '~/lib/stores/commentStore';
	import { goto } from '$app/navigation';

	const VIDEOS_PER_BATCH = 5;
	const MAX_VIDEO_ID = 109;
	const SCROLL_THRESHOLD = 800;

	let videos = $state<any[]>([]);
	let refreshKey = $state(0);
	let isFetchingRef = false;
	let fetchedIdsRef = new Set<number>();

	async function fetchVideos() {
		if (isFetchingRef) return;
		isFetchingRef = true;

		const attempts = VIDEOS_PER_BATCH * 3;
		const videoIds: number[] = [];
		
		for (let i = 0; i < attempts && videoIds.length < VIDEOS_PER_BATCH; i++) {
			const id = Math.floor(Math.random() * MAX_VIDEO_ID) + 1;
			if (!fetchedIdsRef.has(id)) {
				videoIds.push(id);
			}
		}

		const results = await Promise.allSettled(videoIds.map((id) => videoService.getVideo(id)));

		const newVideos = results
			.map((result, index) => {
				if (result.status === 'fulfilled' && result.value) {
					fetchedIdsRef.add(videoIds[index]);
					const videoData = result.value.data || result.value;
					return videoData;
				}
				return null;
			})
			.filter((video): video is any => video !== null);

		videos = [...videos, ...newVideos];
		isFetchingRef = false;
	}

	$effect(() => {
		if (refreshKey > 0) {
			videos = [];
			fetchedIdsRef.clear();
			isFetchingRef = false;
		}
	});

	$effect(() => {
		if (videos.length === 0 && !isFetchingRef) {
			fetchVideos();
		}

		const mainEl = document.getElementById('MainContent');
		const scrollEl = (mainEl?.querySelector('.overflow-y-auto') as HTMLElement) || mainEl;

		if (!scrollEl) return;

		const handleScroll = () => {
			const isNearBottom =
				scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - SCROLL_THRESHOLD;

			if (isNearBottom && !isFetchingRef) {
				fetchVideos();
			}
		};

		scrollEl.addEventListener('scroll', handleScroll);

		(window as any).refreshVideoFeed = () => {
			commentStore.setActiveVideoId(null);
			refreshKey++;
		};

		(window as any).closeCommentDrawer = () => {
			commentStore.setActiveVideoId(null);
		};

		return () => {
			scrollEl?.removeEventListener('scroll', handleScroll);
			delete (window as any).refreshVideoFeed;
			delete (window as any).closeCommentDrawer;
		};
	});

	const activeVideoId = $derived($commentStore.activeVideoId);
	const activePost = $derived(videos.find((v) => v.id === activeVideoId));
	const isDrawerOpen = $derived(activeVideoId !== null && videos.length > 0);
</script>

<div>
	{#each videos as video, index (`${video.id}-${index}`)}
		<PostMain post={video} />
	{/each}

	<!-- Comment Drawer -->
	{#if activePost}
		<div 
			class="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col"
			style="transform: translateX({isDrawerOpen ? '0' : '100%'})"
		>
			<!-- Header -->
			<div class="p-4 border-b flex justify-between items-center">
				<h2 class="text-lg font-semibold">{activePost.comments_count || 0} bình luận</h2>
				<button 
					aria-label="Close comments"
					onclick={() => {
						commentStore.setActiveVideoId(null);
						goto('/');
					}} 
					class="text-gray-500 hover:text-gray-700"
				>
					<IconClose class="w-6 h-6" />
				</button>
			</div>

			<!-- Post Info -->
			<div class="p-4 border-b flex items-start gap-4">
				<img src={activePost.user?.avatar || '/default-avatar.png'} alt={activePost.user?.nickname} class="w-10 h-10 rounded-full" />
				<div class="flex-1">
					<a href="/@{activePost.user?.nickname}" class="font-semibold hover:underline">
						{activePost.user?.nickname}
					</a>
					<p class="text-gray-600 text-sm mt-1">{activePost.description}</p>
				</div>
			</div>

			<!-- Comments List -->
			<div class="flex-1 overflow-y-auto p-4 space-y-4">
				<div class="flex items-start gap-4">
					<img src="/default-avatar.png" alt="user1" class="w-8 h-8 rounded-full" />
					<div class="flex-1">
						<p class="font-semibold text-sm">user1</p>
						<p class="text-gray-700 text-sm mt-1">Great video!</p>
						<div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
							<button class="hover:text-gray-700">Trả lời</button>
							<span>10 lượt thích</span>
						</div>
					</div>
					<button aria-label="Like comment" class="text-gray-400 hover:text-red-500">
						<IconHeart class="w-4 h-4" />
					</button>
				</div>

				<div class="flex items-start gap-4">
					<img src="/default-avatar.png" alt="user2" class="w-8 h-8 rounded-full" />
					<div class="flex-1">
						<p class="font-semibold text-sm">user2</p>
						<p class="text-gray-700 text-sm mt-1">Amazing content 🔥</p>
						<div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
							<button class="hover:text-gray-700">Trả lời</button>
							<span>5 lượt thích</span>
						</div>
					</div>
					<button aria-label="Like comment" class="text-gray-400 hover:text-red-500">
						<IconHeart class="w-4 h-4" />
					</button>
				</div>
			</div>

			<!-- Actions & Input -->
			<div class="border-t p-4">
				<div class="flex items-center gap-4 mb-4">
					<button aria-label="Like video" class="hover:text-red-500">
						<IconHeart class="w-7 h-7" />
					</button>
					<button aria-label="Share video" class="hover:text-blue-500">
						<IconShare class="w-7 h-7" />
					</button>
				</div>
				<p class="font-semibold text-sm mb-4">
					{activePost.likes_count?.toLocaleString() || 0} lượt thích
				</p>

				<form class="flex gap-2 items-center">
					<input 
						type="text" 
						placeholder="Thêm bình luận..." 
						class="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500"
					/>
					<button 
						type="submit" 
						class="text-blue-500 font-semibold text-sm px-4 hover:text-blue-600"
					>
						Đăng
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>
