export interface Account {
    id?: number;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    nickname?: string;
    avatar?: string;
    bio?: string;
    tick?: boolean;
    followers_count?: number;
    likes_count?: number;
}

export interface AccountItemProps {
    user: Account;
}
