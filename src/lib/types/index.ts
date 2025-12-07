// ============================================
// User Types
// ============================================

export interface User {
	id: number;
	nickname: string;
	avatar: string;
	tick: boolean;
	first_name: string;
	last_name: string;
	bio?: string;
	followings_count?: number;
	followers_count?: number;
	likes_count?: number;
}

export interface SuggestedUser extends User {
	is_followed: boolean;
	popular_video?: Video;
}

export interface GuestUser extends User {
	videos: Video[];
}

// ============================================
// Video Types
// ============================================

export interface VideoMeta {
	video?: {
		resolution_x?: number;
		resolution_y?: number;
	};
}

export interface Video {
	id: number;
	description: string;
	file_url: string;
	likes_count: number;
	comments_count: number;
	shares_count: number;
	user?: User;
	meta?: VideoMeta;
}

export interface VideoState {
	isPlaying: boolean;
	isMuted: boolean;
}

// ============================================
// Comment Types
// ============================================

export interface Comment {
	id: number;
	user: string;
	text: string;
	likes: number;
	createdAt?: Date | string;
	replies?: Comment[];
}

// ============================================
// API Types
// ============================================

export interface ApiResponse<T> {
	data: T;
	message?: string;
}

export interface PaginationParams {
	page: number;
	perPage: number;
}

// ============================================
// Component Props Types
// ============================================

export interface AspectRatio {
	class: string;
	isWide: boolean;
}

// ============================================
// Store Types
// ============================================

export interface CommentStoreState {
	activeVideoId: number | null;
}

export type ProfileStatus = 'idle' | 'loading' | 'success' | 'error' | 'not_found';
