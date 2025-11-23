import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import type { UserProps } from '~/types';

import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tooltip from '~/components/Tooltip';
import AccountPreview from './AccountPreview';
import { CheckCircleIcon } from '@phosphor-icons/react';

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
                <Image
                    className={cx('w-13 h-13 my-auto')}
                    rounded
                    src={user?.avatar}
                    alt={user?.nickname}
                />
                <div className={cx('item-info')}>
                    <p className={cx('flex items-center text-4xl')}>
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
                </div>
            </div>
        </Tooltip>
    );
}

export default AccountItem;
