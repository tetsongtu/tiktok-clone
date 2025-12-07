import { page } from '$app/state';
import { getCachedVideo, setCachedVideo } from '~/lib/utils/profileCache';
import type { User, SuggestedUser, Video } from '~/lib/types/user';

export function useProfileVideos(profileData: SuggestedUser | User | null, nickname: string) {
	let userVideos = $state<Video[]>([]);

	$effect(() => {
		if (!profileData) {
			userVideos = [];
			return;
		}

		// Priority 1: Check if video passed via navigation state
		const stateVideo = (page.state as any)?.video as Video | undefined;
		if (stateVideo) {
			userVideos = [stateVideo];
			setCachedVideo(nickname, stateVideo);
			return;
		}

		// Priority 2: Check localStorage cache
		const cachedVideo = getCachedVideo(nickname);
		if (cachedVideo) {
			userVideos = [cachedVideo];
			return;
		}

		// Priority 3: Check if profileData has popular_video (from SuggestedUser)
		if ('popular_video' in profileData && profileData.popular_video) {
			userVideos = [profileData.popular_video];
			setCachedVideo(nickname, profileData.popular_video);
		} else {
			userVideos = [];
		}
	});

	return {
		get userVideos() { return userVideos; }
	};
}
