export interface PostAuthor {
    id?: number;
    nickname?: string;
    avatar?: string;
    tick?: boolean;
    first_name?: string;
    last_name?: string;
}

export interface Post {
    id: string;
    user_id: string;
    file_url: string;
    description: string;
    likes_count: number;
    comments_count?: number;
    shares_count?: number;
    user?: PostAuthor;
    meta: {
        video: {
            resolution_x: number;
            resolution_y: number;
        };
    };
}

export interface PostMainProps {
    post: Post;
}
