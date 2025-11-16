import { SpinnerGapIcon } from '@phosphor-icons/react';
import type { ActionButtonProps } from '~/types';
import BaseButton from '~/components/Buttons/BaseButton';
import classNames from 'classnames';

export function ActionButton({
    icon,
    count,
    onClick,
    disabled = false,
    isActive = false,
    isLoading = false,
}: ActionButtonProps) {
    return (
        <BaseButton
            onClick={onClick}
            disabled={disabled}
            className={classNames(
                'flex flex-col items-center gap-1 p-2 bg-transparent',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            )}
        >
            <div
                className={classNames(
                    'grid place-items-center w-12 h-12 rounded-full',
                    isActive ? 'bg-red-100' : 'bg-gray-200',
                )}
            >
                {isLoading ? <SpinnerGapIcon size={20} className="animate-spin" /> : icon}
            </div>
            <span className="text-sm font-medium">{count}</span>
        </BaseButton>
    );
}

export default ActionButton;
