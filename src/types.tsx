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
