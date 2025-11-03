export interface MenuProps {
    children: React.ReactNode;
    items: MenuItemData[];
    onChange?: (item: MenuItemData) => void;
}

export interface MenuLevel {
    title?: string;
    data: MenuItemData[];
}

export interface MenuItemData {
    icon?: React.ReactNode;
    title: string;
    to?: string;
    type?: string;
    code?: string;
    separate?: boolean;
    children?: MenuLevel;
}
