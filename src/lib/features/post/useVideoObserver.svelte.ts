import { replaceState } from '$app/navigation';
import { commentStore } from '$lib/stores';
import type { Video } from '$lib/types';

export function useVideoObserver(
	video: Video,
	videoEl: HTMLVideoElement | undefined,
	containerEl: HTMLElement | undefined,
	activeVideoId: number | null
) {
	if (!video || !videoEl || !containerEl) return;

	videoEl.autoplay = true;
	videoEl.playsInline = true;
	videoEl.muted = true;

	const observer = new IntersectionObserver(
		(entries) => {
			if (!videoEl) return;
			
			if (entries[0].isIntersecting) {
				videoEl.play().catch(() => {
					videoEl.play().catch(() => {});
				});
				
				if (activeVideoId !== null) {
					const username = video?.user?.nickname;
					commentStore.setActiveVideoId(video.id);
					replaceState(`/@${username}/video/${video.id}`, {});
				}
			} else {
				videoEl.pause();
			}
		},
		{ threshold: 0.5 }
	);

	observer.observe(containerEl);
	return () => observer.disconnect();
}
