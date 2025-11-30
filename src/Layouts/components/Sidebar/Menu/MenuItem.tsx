import classNames from 'classnames/bind';
import { Link, useRoute } from 'wouter-preact';
import styles from './Menu.module.scss';
import type { MenuItemProps } from '~/types';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, actionIcon }: MenuItemProps) {
    const [isActive] = useRoute(to);

    return (
        <Link href={to} className={cx('menu-item', { active: isActive })}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('action-icon')}>{actionIcon}</span>
            <span className={cx('title', 'hidden lg:flex')}>{title}</span>
        </Link>
    );
}

export default MenuItem;
