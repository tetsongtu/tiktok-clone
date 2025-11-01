export interface RandomUsers {
    id: string;
    nickname: string;
    first_name: string;
    last_name: string;
    avatar: string;
    followers_count: number;
    likes_count: number;
}

export interface MenuItemFollowTypes {
    user: RandomUsers;
}

export interface MenuItemsTypes {
    title: string;
    to: string;
    icon: React.ReactNode;
    actionIcon: React.ReactNode;
}
