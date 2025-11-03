export type Account = {
    id: number;
    nickname: string;
    avatar: string;
    full_name: string;
    tick?: boolean;
};

export type AccountItemProps = {
    data: Account;
};
