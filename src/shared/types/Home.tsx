export interface User {
    nickname?: string;
    likes_count: number;
}
export interface PostData {
    id: string;
    user_id: string;
    file_url: string;
    description: string;

    likes_count: number;
    comments_count?: number;
    shares_count?: number;

    user?: User[];
}

export interface PostLikeProps {
    post: PostData;
}
