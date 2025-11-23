// 👤 USER TYPES (Sidebar Follow)
export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    nickname: string;
    avatar: string;
    bio: string;
    tick: boolean;
    followings_count: number;
    followers_count: number;
    likes_count: number;
    website_url: string;
    facebook_url: string;
    youtube_url: string;
    twitter_url: string;
    instagram_url: string;
    created_at: string;
    updated_at: string;
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
