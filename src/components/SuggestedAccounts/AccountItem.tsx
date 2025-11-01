import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import type { MenuItemFollowTypes } from '~/types';

import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Tooltip } from '~/components/Tooltip';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ user }: MenuItemFollowTypes) {
    const renderReview = () => {
        return (
            <PopperWrapper>
                <div className={cx('preview')}>
                    <AccountPreview user={user} />
                </div>
            </PopperWrapper>
        );
    };

    return (
        <Tooltip
            interactive
            offset={[-20, -20]}
            delay={[800, 0]}
            placement="bottom"
            render={renderReview}
        >
            <div className={cx('account-item')}>
                <Image className={cx('avatar')} src={user?.avatar} alt={user?.nickname} />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{user?.nickname}</strong>
                    </p>
                    <p className={cx('name')}>
                        {user?.first_name + ' ' + user?.last_name}
                    </p>
                </div>
            </div>
        </Tooltip>
    );
}

export default AccountItem;
