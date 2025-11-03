// LinkButton.tsx
import classNames from 'classnames/bind';
import React from 'react';

import { Tooltip } from '~/components/Tooltip';
import BaseButton from '~/components/Buttons/BaseButton';
import styles from './LinkButton.module.scss';

const cx = classNames.bind(styles);

interface LinkButtonProps {
    icon: React.ReactNode;
    tooltip: string;
    badge?: number;
    to?: string;
    onClick?: () => void;
}

function LinkButton({ icon, tooltip, badge, ...props }: LinkButtonProps) {
    return (
        <Tooltip content={tooltip}>
            <BaseButton {...props} className={cx('action-btn')}>
                {icon}
                {badge !== undefined && <span className={cx('badge')}>{badge}</span>}
            </BaseButton>
        </Tooltip>
    );
}

export default LinkButton;
