// BaseButton.tsx
import { Link } from 'wouter-preact';

interface BaseButtonProps {
    to?: string;
    href?: string;
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
}

export function BaseButton({
    to,
    href,
    children,
    className,
    ...passProps
}: BaseButtonProps) {
    let Comp: React.ElementType = 'button';
    const props: any = { ...passProps, className };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return <Comp {...props}>{children}</Comp>;
}

export default BaseButton;
