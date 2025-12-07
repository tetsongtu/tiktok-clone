// API Endpoints
export const API_ENDPOINTS = {
	// Users
	USERS_SUGGESTED: 'users/suggested',
	USERS_SEARCH: 'users/search',

	// Videos
	VIDEOS: 'videos',
	VIDEO_BY_ID: (id: number) => `videos/${id}`,
} as const;
