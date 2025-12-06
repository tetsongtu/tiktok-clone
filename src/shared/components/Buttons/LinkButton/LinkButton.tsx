import classNames from 'classnames';
import React from 'react';
import { Tooltip } from '~/shared/components/Tooltip/Tooltip';
import { BaseButton } from '~/shared/components/Buttons/BaseButton';

interface LinkButtonProps {
    icon: React.ReactNode;
    tooltip: string;
    badge?: number;
    to?: string;
    onClick?: () => void;
    className?: string;
}

export function LinkButton({
    icon,
    tooltip,
    badge,
    className,
    ...props
}: LinkButtonProps) {
    return (
        <Tooltip content={tooltip}>
            <BaseButton
                {...props}
                className={classNames(
                    'relative flex p-4 text-base text-[#161823] bg-transparent',
                    className,
                )}
            >
                {icon}
                {badge !== undefined && (
                    <span className="absolute -top-4 -right-1 flex items-center justify-center h-5 px-1.5 border-2 border-white rounded-full text-base font-normal leading-4 text-center text-white bg-[var(--primary)]">
                        {badge}
                    </span>
                )}
            </BaseButton>
        </Tooltip>
    );
}
