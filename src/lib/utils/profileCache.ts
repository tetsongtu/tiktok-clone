import type { Video } from '~/lib/types/user';

export function getCachedVideo(nickname: string): Video | null {
	try {
		const cached = localStorage.getItem(`video_${nickname}`);
		return cached ? JSON.parse(cached) : null;
	} catch {
		return null;
	}
}

export function setCachedVideo(nickname: string, video: Video) {
	try {
		localStorage.setItem(`video_${nickname}`, JSON.stringify(video));
	} catch {
		// Ignore localStorage errors
	}
}
