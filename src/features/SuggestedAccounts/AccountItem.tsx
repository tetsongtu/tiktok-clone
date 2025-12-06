import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import { CheckCircleIcon } from '@phosphor-icons/react';

import type { AccountItemProps } from '~/shared/types';
import { PopperWrapper, Tooltip } from '~/shared';
import { AccountPreview } from './AccountPreview/AccountPreview';
import { UserAvatar } from '~/features';
import { Link } from 'wouter-preact';

const cx = classNames.bind(styles);

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
            <Link to={`/@${user.nickname}`} className={cx('account-item')}>
                <UserAvatar user={user} />
                <section className={cx('ml-3')}>
                    <p className={cx('text-base flex items-center')}>
                        <strong>{user?.nickname}</strong>
                        {user?.tick && (
                            <CheckCircleIcon
                                weight="fill"
                                className="ml-1 text-blue-500"
                            />
                        )}
                    </p>
                    <p className={cx('text-sm')}>
                        {user?.first_name + ' ' + user?.last_name}
                    </p>
                </section>
            </Link>
        </Tooltip>
    );
}
