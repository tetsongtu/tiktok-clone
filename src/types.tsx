// 📸 POST TYPES (Home)
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
