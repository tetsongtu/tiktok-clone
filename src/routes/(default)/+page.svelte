<script lang="ts">
	import PostMain from '~/lib/features/PostMain.svelte';
	import CommentDrawer from '~/lib/features/CommentDrawer.svelte';
	import * as videoService from '~/lib/services/videoService';
	import { commentStore } from '~/lib/stores/commentStore';
	import type { Video } from '~/lib/types/user';

	interface Props {
		initialVideoId?: number;
	}

	let { initialVideoId }: Props = $props();

	const VIDEOS_PER_BATCH = 5;
	const MAX_VIDEO_ID = 109;
	const SCROLL_THRESHOLD = 800;

	let videos = $state<Video[]>([]);
	let refreshKey = $state(0);
	let isFetchingRef = false;
	let fetchedIdsRef = new Set<number>();

	async function fetchVideos() {
		if (isFetchingRef) return;
		isFetchingRef = true;

		const videoIds: number[] = [];
		for (let i = 0; i < VIDEOS_PER_BATCH * 3 && videoIds.length < VIDEOS_PER_BATCH; i++) {
			const id = Math.floor(Math.random() * MAX_VIDEO_ID) + 1;
			if (!fetchedIdsRef.has(id)) videoIds.push(id);
		}

		const results = await Promise.allSettled(videoIds.map((id) => videoService.getVideo(id)));
		const newVideos = results
			.map((result, index) => {
				if (result.status === 'fulfilled' && result.value) {
					fetchedIdsRef.add(videoIds[index]);
					return result.value.data || result.value;
				}
				return null;
			})
			.filter((video): video is Video => video !== null);

		videos = [...videos, ...newVideos];
		isFetchingRef = false;
	}

	// Load initial video
	$effect(() => {
		if (!initialVideoId || videos.find(v => v.id === initialVideoId)) return;

		(async () => {
			try {
				const result = await videoService.getVideo(initialVideoId);
				if (result) {
					const video = result.data || result;
					videos = [video];
					fetchedIdsRef.add(initialVideoId);
					commentStore.setActiveVideoId(initialVideoId);
					await fetchVideos();
				}
			} catch (error) {
				console.error('Failed to load initial video:', error);
			}
		})();
	});

	// Refresh handler
	$effect(() => {
		if (refreshKey > 0) {
			videos = [];
			fetchedIdsRef.clear();
			isFetchingRef = false;
		}
	});

	// Scroll & window handlers
	$effect(() => {
		if (videos.length === 0 && !isFetchingRef) fetchVideos();

		const mainEl = document.getElementById('MainContent');
		const scrollEl = (mainEl?.querySelector('.overflow-y-auto') as HTMLElement) || mainEl;
		if (!scrollEl) return;

		const handleScroll = () => {
			const isNearBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - SCROLL_THRESHOLD;
			if (isNearBottom && !isFetchingRef) fetchVideos();
		};

		scrollEl.addEventListener('scroll', handleScroll);

		(window as any).refreshVideoFeed = () => {
			commentStore.setActiveVideoId(null);
			refreshKey++;
		};
		(window as any).closeCommentDrawer = () => commentStore.setActiveVideoId(null);

		return () => {
			scrollEl?.removeEventListener('scroll', handleScroll);
			delete (window as any).refreshVideoFeed;
			delete (window as any).closeCommentDrawer;
		};
	});

	const activeVideoId = $derived($commentStore.activeVideoId);
	const activePost = $derived(videos.find((v) => v.id === activeVideoId) || null);
	const isDrawerOpen = $derived(activeVideoId !== null && videos.length > 0);
</script>

<div>
	{#each videos as video, index (`${video.id}-${index}`)}
		<PostMain {video} />
	{/each}

	<CommentDrawer post={activePost} isOpen={isDrawerOpen} />
</div>
