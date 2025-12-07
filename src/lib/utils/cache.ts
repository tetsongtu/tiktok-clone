import { browser } from '$app/environment';
import type { Video } from '$lib/types';

const VIDEO_CACHE_PREFIX = 'video_';

export function getCachedVideo(nickname: string): Video | null {
	if (!browser) return null;
	try {
		const cached = localStorage.getItem(`${VIDEO_CACHE_PREFIX}${nickname}`);
		return cached ? JSON.parse(cached) : null;
	} catch {
		return null;
	}
}

export function setCachedVideo(nickname: string, video: Video): void {
	if (!browser) return;
	try {
		localStorage.setItem(`${VIDEO_CACHE_PREFIX}${nickname}`, JSON.stringify(video));
	} catch {
		// Ignore localStorage errors (quota exceeded, etc.)
	}
}

export function clearVideoCache(nickname?: string): void {
	if (!browser) return;
	try {
		if (nickname) {
			localStorage.removeItem(`${VIDEO_CACHE_PREFIX}${nickname}`);
		} else {
			// Clear all video cache
			Object.keys(localStorage)
				.filter((key) => key.startsWith(VIDEO_CACHE_PREFIX))
				.forEach((key) => localStorage.removeItem(key));
		}
	} catch {
		// Ignore errors
	}
}
