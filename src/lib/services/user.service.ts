import { get, ApiError } from './http';
import type { SuggestedUser, ApiResponse, PaginationParams } from '$lib/types';

export async function getSuggested(params: PaginationParams): Promise<SuggestedUser[]> {
	try {
		const response = await get<ApiResponse<SuggestedUser[]>>('users/suggested', {
			params: {
				page: params.page,
				per_page: params.perPage,
			},
		});
		return response.data ?? [];
	} catch (error) {
		if (error instanceof ApiError) {
			console.error('Failed to fetch suggested users:', error.message);
		}
		return [];
	}
}
