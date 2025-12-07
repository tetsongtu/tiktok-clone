import { get, ApiError } from './http';
import { API_ENDPOINTS } from '$lib/constants';
import type { User, ApiResponse } from '$lib/types';

type SearchType = 'less' | 'more';

export async function search(query: string, type: SearchType = 'less'): Promise<User[]> {
	try {
		const response = await get<ApiResponse<User[]>>(API_ENDPOINTS.USERS_SEARCH, {
			params: { q: query, type },
		});
		return response.data ?? [];
	} catch (error) {
		if (error instanceof ApiError) {
			console.error('Search failed:', error.message);
		}
		return [];
	}
}

export async function findByNickname(nickname: string): Promise<User | null> {
	const results = await search(nickname, 'less');
	return results.find((u) => u.nickname === nickname) ?? null;
}
