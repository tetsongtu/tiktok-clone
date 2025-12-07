import type { Video } from '~/lib/types/user';

export function useAspectRatio(video: Video) {
	return {
		class: (() => {
			const width = video?.meta?.video?.resolution_x;
			const height = video?.meta?.video?.resolution_y;
			if (!width || !height) return 'aspect-[9/16]';

			const ratio = width / height;
			if (Math.abs(ratio - 1) < 0.15) return 'aspect-square';
			if (ratio > 1.3) return 'aspect-video';
			return 'aspect-[9/16]';
		})(),
		isWide: (() => {
			const width = video?.meta?.video?.resolution_x;
			const height = video?.meta?.video?.resolution_y;
			if (!width || !height) return false;

			const ratio = width / height;
			return Math.abs(ratio - 1) < 0.15 || ratio > 1.3;
		})()
	};
}
