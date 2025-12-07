<script lang="ts">
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

		const videoIds = Array.from(
			{ length: VIDEOS_PER_BATCH },
			() => Math.floor(Math.random() * MAX_VIDEO_ID) + 1
		).filter((id) => !fetchedIdsRef.has(id));

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

	// useEffect(() => {...}, [resetKey]) - Reset when resetKey changes
	$effect(() => {
		if (refreshKey > 0) {
			videos = [];
			fetchedIdsRef.clear();
			isFetchingRef = false;
			fetchVideos();
		}
	});

	// useEffect(() => {...}, []) - Run once on mount
	$effect(() => {
		fetchVideos();

		const mainEl = document.getElementById('MainContent');
		const scrollEl = (mainEl?.querySelector('.overflow-y-auto') as HTMLElement) || mainEl;

		if (!scrollEl) return;

		const handleScroll = () => {
			const isNearBottom =
				scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - SCROLL_THRESHOLD;

			if (isNearBottom) {
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
					<svg class="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
						<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
					</svg>
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
						<svg class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
							<path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
						</svg>
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
						<svg class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
							<path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
						</svg>
					</button>
				</div>
			</div>

			<!-- Actions & Input -->
			<div class="border-t p-4">
				<div class="flex items-center gap-4 mb-4">
					<button aria-label="Like video" class="hover:text-red-500">
						<svg class="w-7 h-7" viewBox="0 0 256 256" fill="currentColor">
							<path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
						</svg>
					</button>
					<button aria-label="Share video" class="hover:text-blue-500">
						<svg class="w-7 h-7" viewBox="0 0 256 256" fill="currentColor">
							<path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35Z"></path>
						</svg>
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
