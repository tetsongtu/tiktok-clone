// 📸 POST TYPES (Home)
export interface Like {
    id: string;
    user_id: string;
    post_id: string;
}

export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
}

export interface PostData {
    id: string;
    user_id: string;
    file_url: string;
    description: string;

    likes_count?: Like[];
    comments_count?: Comment[];
    shares_count?: number;
}

export interface PostProps {
    post: PostData;
}

export interface PostLikeProps {
    post: PostData;
}
