import type { GuestUser } from '$lib/types';

// Re-export API endpoints
export * from './api';

// ============================================
// App Config
// ============================================

export const APP_CONFIG = {
	name: 'TikTok',
	version: '0.0.1',
} as const;

// ============================================
// Video Feed Config
// ============================================

export const VIDEO_FEED = {
	VIDEOS_PER_BATCH: 5,
	MAX_VIDEO_ID: 109,
	SCROLL_THRESHOLD: 800,
} as const;

// ============================================
// Pagination Config
// ============================================

export const PAGINATION = {
	INIT_PAGE: 1,
	PER_PAGE: 5,
} as const;

// ============================================
// UI Config
// ============================================

export const UI = {
	TOOLTIP_DELAY: 500,
	TOOLTIP_OFFSET: [-20, -20] as [number, number],
	DEBOUNCE_DELAY: 300,
	LOADING_DELAY: 300,
} as const;

// ============================================
// Sidebar Menu
// ============================================

export const SIDEBAR_MENU = [
	{
		title: 'For You',
		to: '/',
		icon: 'house',
		iconFill: 'house-fill',
	},
	{
		title: 'Following',
		to: '/following',
		icon: 'users',
		iconFill: 'users-fill',
	},
	{
		title: 'LIVE',
		to: '/live',
		icon: 'video',
		iconFill: 'video-fill',
	},
] as const;

// ============================================
// Guest User
// ============================================

export const GUEST_USER: GuestUser = {
	id: 1,
	nickname: 'test',
	first_name: 'Guest',
	last_name: 'User',
	avatar: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/486f3c515c065ccaa844faf058940fe1~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=3172adc4&x-expires=1764342000&x-signature=dpyyN9ZWvISrGqAwnsrc4oL8TP0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my3',
	tick: false,
	bio: 'This is a guest user account',
	followers_count: 0,
	followings_count: 0,
	likes_count: 0,
	videos: [],
};

// ============================================
// Validation
// ============================================

export const VALIDATION = {
	NICKNAME_PATTERN: /^[a-zA-Z0-9_]+$/,
	NICKNAME_MAX_LENGTH: 30,
	EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	PASSWORD_MIN_LENGTH: 6,
	PASSWORD_MAX_LENGTH: 50,
	BIO_MAX_LENGTH: 80,
} as const;
