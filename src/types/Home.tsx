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
    video_url: string;
    text: string;
    create_at: string;
    profile: {
        user_id: string;
        name: string;
        img: string;
    };
}

export interface PostProps {
    post: PostData;
}

export interface PostLikeProps {
    post: PostData;
}
