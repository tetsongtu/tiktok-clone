<script lang="ts">
	import { onMount } from 'svelte';
	import PostMain from '~/lib/components/PostMain.svelte';
	import CommentDrawer from '~/lib/features/CommentDrawer.svelte';
	import * as videoService from '~/core/services/videoService';
	import { commentStore } from '~/lib/stores/commentStore';
	import { goto } from '$app/navigation';

	const VIDEOS_PER_BATCH = 5;
	const MAX_VIDEO_ID = 109;
	const SCROLL_THRESHOLD = 800;

	let videos = $state<any[]>([]);
	let refreshKey = $state(0);
	let isFetchingRef = false;
	let fetchedIdsRef = new Set<number>();
	let initialFetchDone = false;

	// Auto-fetch on mount (like Sidebar's $effect)
	$effect(() => {
		if (initialFetchDone && refreshKey === 0) return;
		
		if (refreshKey > 0) {
			videos = [];
			fetchedIdsRef.clear();
			isFetchingRef = false;
		}
		
		initialFetchDone = true;
		fetchVideos();
	});

	async function fetchVideos() {
		console.log('🎬 fetchVideos START, isFetching:', isFetchingRef);
		if (isFetchingRef) return;
		isFetchingRef = true;

		const videoIds = Array.from(
			{ length: VIDEOS_PER_BATCH },
			() => Math.floor(Math.random() * MAX_VIDEO_ID) + 1
		).filter((id) => !fetchedIdsRef.has(id));

		console.log('🎬 Video IDs to fetch:', videoIds);

		const results = await Promise.allSettled(videoIds.map((id) => videoService.getVideo(id)));

		console.log('🎬 Raw results:', results);

		const newVideos = results
			.map((result, index) => {
				if (result.status === 'fulfilled' && result.value) {
					console.log('🎬 Video data structure:', result.value);
					fetchedIdsRef.add(videoIds[index]);
					// Check if we need to unwrap .data
					const videoData = result.value.data || result.value;
					console.log('🎬 Using video data:', videoData);
					return videoData;
				}
				return null;
			})
			.filter((video): video is any => video !== null);

		console.log('🎬 New videos to add:', newVideos);
		console.log('🎬 Videos before:', videos.length);
		videos = [...videos, ...newVideos];
		console.log('🎬 Videos after:', videos.length, videos);
		isFetchingRef = false;
	}

	onMount(() => {
		console.log('🎬 onMount called!');
		console.log('🎬 Calling fetchVideos from onMount...');
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
			scrollEl.removeEventListener('scroll', handleScroll);
			delete (window as any).refreshVideoFeed;
			delete (window as any).closeCommentDrawer;
		};
	});

	const activeVideoId = $derived($commentStore.activeVideoId);
	const activePost = $derived(videos.find((v) => v.id === activeVideoId));
</script>

<div>
	<!-- Debug button -->
	<div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
		<button
			onclick={() => {
				console.log('🔄 Manual reload clicked');
				location.reload();
			}}
			class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
		>
			🔄 Reload Page
		</button>
		<button
			onclick={() => {
				console.log('🎬 Manual fetch clicked');
				fetchVideos();
			}}
			class="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
		>
			📥 Fetch Videos
		</button>
		<div class="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg">
			Videos: {videos.length}
		</div>
	</div>

	<div class="text-white text-2xl p-4">Total videos: {videos.length}</div>
	
	{#each videos as video, index (`${video.id}-${index}`)}
		<div class="text-white text-xl p-4 bg-red-500 m-4">
			Video {index + 1}: ID={video.id}, URL={video.file_url?.substring(0, 50)}...
		</div>
		<PostMain post={video} />
	{/each}

	<CommentDrawer
		post={activePost || videos[0] || null}
		isOpen={activeVideoId !== null && videos.length > 0}
		onClose={() => {
			commentStore.setActiveVideoId(null);
			goto('/');
		}}
	/>
</div>
