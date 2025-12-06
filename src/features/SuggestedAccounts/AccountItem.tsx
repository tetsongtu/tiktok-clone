import { CheckCircleIcon } from '@phosphor-icons/react';
import type { AccountItemProps } from '~/shared/types';
import { PopperWrapper, Tooltip } from '~/shared';
import { AccountPreview } from './AccountPreview/AccountPreview';
import { UserAvatar } from '~/features';
import { Link } from 'wouter-preact';

export function AccountItem({ user }: AccountItemProps) {
    const renderReview = () => {
        return (
            <PopperWrapper className="min-w-[308px]">
                <AccountPreview user={user} />
            </PopperWrapper>
        );
    };

    return (
        <Tooltip
            className="w-full"
            offset={[-20, -20]}
            delay={500}
            placement="bottom"
            render={renderReview}
        >
            <Link
                to={`/@${user.nickname}`}
                className="flex items-center px-2 py-1 rounded"
            >
                <UserAvatar user={user} />
                <section className="ml-3">
                    <p className="text-base flex items-center">
                        <strong>{user?.nickname}</strong>
                        {user?.tick && (
                            <CheckCircleIcon
                                weight="fill"
                                className="ml-1 text-blue-500"
                            />
                        )}
                    </p>
                    <p className="text-base">
                        {user?.first_name + ' ' + user?.last_name}
                    </p>
                </section>
            </Link>
        </Tooltip>
    );
}
