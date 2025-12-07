import { get, ApiError } from './http';
import { API_ENDPOINTS } from '$lib/constants';
import type { Video, ApiResponse } from '$lib/types';

export async function getVideo(id: number): Promise<Video | null> {
	try {
		const response = await get<ApiResponse<Video>>(API_ENDPOINTS.VIDEO_BY_ID(id));
		return response.data ?? null;
	} catch (error) {
		if (error instanceof ApiError) {
			console.error(`Failed to fetch video ${id}:`, error.message);
		}
		return null;
	}
}

export async function getVideos(ids: number[]): Promise<Video[]> {
	const results = await Promise.allSettled(ids.map((id) => getVideo(id)));
	return results
		.filter((r): r is PromiseFulfilledResult<Video | null> => r.status === 'fulfilled')
		.map((r) => r.value)
		.filter((v): v is Video => v !== null);
}
