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
