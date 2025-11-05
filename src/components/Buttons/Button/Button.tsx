import classNames from 'classnames/bind';
import BaseButton from '~/components/Buttons/BaseButton';
import styles from './Button.module.css';

const cx = classNames.bind(styles);

interface ButtonProps {
    variant?: 'primary' | 'outline';
    size?: 'small' | 'large';
    rounded?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: () => void;
    [key: string]: any;
}

function Button({
    variant,
    size,
    rounded,
    disabled,
    children,
    className,
    leftIcon,
    rightIcon,
    ...props
}: ButtonProps) {
    const classes = cx(
        'btn',
        `btn--${variant}`,
        size && `btn--${size}`,
        {
            'btn--rounded': rounded,
            'btn--disabled': disabled,
        },
        className,
    );

    return (
        <BaseButton className={classes} disabled={disabled} {...props}>
            {leftIcon && <span className={cx('btn__icon')}>{leftIcon}</span>}
            <span className={cx('btn__title')}>{children}</span>
            {rightIcon && <span className={cx('btn__icon')}>{rightIcon}</span>}
        </BaseButton>
    );
}

export default Button;
