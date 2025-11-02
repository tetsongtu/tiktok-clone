import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import type { MenuItemProps } from '~/types';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, actionIcon }: MenuItemProps) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('action-icon')}>{actionIcon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
