import { get, ApiError } from './http';
import { API_ENDPOINTS } from '$lib/constants';
import type { SuggestedUser, ApiResponse, PaginationParams } from '$lib/types';

export async function getSuggested(params: PaginationParams): Promise<SuggestedUser[]> {
	try {
		const response = await get<ApiResponse<SuggestedUser[]>>(API_ENDPOINTS.USERS_SUGGESTED, {
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
