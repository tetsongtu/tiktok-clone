import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
    to?: string;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    children?: React.ReactNode;
    className?: string;
    leftIcon?: string;
    rightIcon?: string;
    onClick?: () => void;
    [key: string]: any;
}

function Button({
    to,
    href,
    primary,
    outline,
    text,
    rounded,
    disabled,
    small,
    large,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}: ButtonProps) {
    let Comp: React.ElementType = 'button';
    const props: any = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', className, {
        primary,
        outline,
        text,
        disabled,
        small,
        large,
        rounded,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <img src={leftIcon} className={cx('icon')} />}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <img src={rightIcon} className={cx('icon')} />}
        </Comp>
    );
}

export default Button;
