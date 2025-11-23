export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
}

export interface PostUserProps {
    post: Post;
}
