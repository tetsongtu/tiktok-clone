import { videoService } from '$lib/services';
import { commentStore } from '$lib/stores';
import { VIDEO_FEED } from '$lib/constants';
import type { Video } from '$lib/types';

export function useVideoFeed() {
	let videos = $state<Video[]>([]);
	let isFetching = $state(false);
	let fetchedIds = new Set<number>();

	async function fetchVideos() {
		if (isFetching) return;
		isFetching = true;

		try {
			const videoIds: number[] = [];
			for (
				let i = 0;
				i < VIDEO_FEED.VIDEOS_PER_BATCH * 3 && videoIds.length < VIDEO_FEED.VIDEOS_PER_BATCH;
				i++
			) {
				const id = Math.floor(Math.random() * VIDEO_FEED.MAX_VIDEO_ID) + 1;
				if (!fetchedIds.has(id)) videoIds.push(id);
			}

			const newVideos = await videoService.getVideos(videoIds);
			newVideos.forEach((v: { id: number }) => fetchedIds.add(v.id));
			videos = [...videos, ...newVideos];
		} finally {
			isFetching = false;
		}
	}

	async function loadInitialVideo(videoId: number) {
		if (videos.find((v) => v.id === videoId)) return;

		const video = await videoService.getVideo(videoId);
		if (video) {
			videos = [video];
			fetchedIds.add(videoId);
			commentStore.setActiveVideoId(videoId);
			await fetchVideos();
		}
	}

	function reset() {
		videos = [];
		fetchedIds.clear();
		isFetching = false;
		commentStore.close();
	}

	function setupScrollHandler(scrollEl: HTMLElement | null) {
		if (!scrollEl) return;

		const handleScroll = () => {
			const isNearBottom =
				scrollEl.scrollTop + scrollEl.clientHeight >=
				scrollEl.scrollHeight - VIDEO_FEED.SCROLL_THRESHOLD;
			if (isNearBottom && !isFetching) fetchVideos();
		};

		scrollEl.addEventListener('scroll', handleScroll);
		return () => scrollEl.removeEventListener('scroll', handleScroll);
	}

	return {
		get videos() {
			return videos;
		},
		get isFetching() {
			return isFetching;
		},
		fetchVideos,
		loadInitialVideo,
		reset,
		setupScrollHandler,
	};
}
