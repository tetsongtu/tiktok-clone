import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import { CheckCircleIcon } from '@phosphor-icons/react';

import type { UserProps } from '~/shared/types';
import { PopperWrapper, Tooltip } from '~/shared';
import AccountPreview from './AccountPreview/AccountPreview';
import { UserAvatar } from '~/features';

// item-info avatar nickname name

const cx = classNames.bind(styles);

function AccountItem({ user }: UserProps) {
    const renderReview = () => {
        return (
            <PopperWrapper className="min-w-[308px]">
                <AccountPreview user={user} />
            </PopperWrapper>
        );
    };

    return (
        <Tooltip offset={[-20, -20]} delay={500} placement="bottom" render={renderReview}>
            <div className={cx('account-item')}>
                <UserAvatar user={user} />
                <section className={cx('ml-5 hidden lg:block')}>
                    <p className={cx('text-4xl flex items-center')}>
                        <strong>{user?.nickname}</strong>
                        {user?.tick && (
                            <CheckCircleIcon
                                weight="fill"
                                className="ml-1 text-green-500"
                            />
                        )}
                    </p>
                    <p className={cx('text-2xl')}>
                        {user?.first_name + ' ' + user?.last_name}
                    </p>
                </section>
            </div>
        </Tooltip>
    );
}

export default AccountItem;
