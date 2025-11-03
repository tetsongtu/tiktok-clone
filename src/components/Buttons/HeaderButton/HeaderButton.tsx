import React from 'react';
import { Tooltip } from '~/components/Tooltip';
import classNames from 'classnames/bind';
import styles from './HeaderButton.module.scss';

const cx = classNames.bind(styles);

interface HeaderButtonProps {
    icon: React.ReactNode;
    tooltip: string;
    badge?: number;
}

function HeaderButton({ icon, tooltip, badge }: HeaderButtonProps) {
    return (
        <Tooltip content={tooltip}>
            <button className={cx('action-btn')}>
                {icon}
                {badge !== undefined && <span className={cx('badge')}>{badge}</span>}
            </button>
        </Tooltip>
    );
}

export default HeaderButton;
