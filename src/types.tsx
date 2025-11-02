import type { JSX } from 'preact/jsx-runtime';

// ActionButton Props
export interface ActionButtonProps {
    icon: JSX.Element;
    count: number;
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
    isLoading?: boolean;
}

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

// 👤 USER TYPES (Sidebar Follow)
export interface UserData {
    id: string;
    nickname: string;
    first_name: string;
    last_name: string;
    avatar: string;
    followers_count: number;
    likes_count: number;
}

export interface UserProps {
    user: UserData;
}

// 🧭 MENU TYPES (Sidebar Menu)
export interface MenuItemProps {
    title: string;
    to: string;
    icon: React.ReactNode;
    actionIcon: React.ReactNode;
}
