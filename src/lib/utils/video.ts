import type { Video, AspectRatio } from '$lib/types';

export function getAspectRatio(video: Video | null | undefined): AspectRatio {
	const width = video?.meta?.video?.resolution_x;
	const height = video?.meta?.video?.resolution_y;

	if (!width || !height) {
		return { class: 'aspect-[9/16]', isWide: false };
	}

	const ratio = width / height;
	const isSquare = Math.abs(ratio - 1) < 0.15;
	const isWide = isSquare || ratio > 1.3;

	let aspectClass = 'aspect-[9/16]';
	if (isSquare) aspectClass = 'aspect-square';
	else if (ratio > 1.3) aspectClass = 'aspect-video';

	return { class: aspectClass, isWide };
}
