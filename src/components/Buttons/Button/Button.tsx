import classNames from 'classnames/bind';

import BaseButton from '~/components/Buttons/BaseButton';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    children?: React.ReactNode;
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: () => void;
    [key: string]: any;
}

function Button({
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
    ...props
}: ButtonProps) {
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
        <BaseButton className={classes} disabled={disabled} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </BaseButton>
    );
}

export default Button;
