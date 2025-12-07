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

export interface Video {
	id: number;
	description: string;
	file_url: string;
	likes_count: number;
	comments_count: number;
	shares_count: number;
	user?: User;
	meta?: {
		video?: {
			resolution_x?: number;
			resolution_y?: number;
		};
	};
}


