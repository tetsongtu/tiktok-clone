import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Tooltip } from '~/components/Tooltip';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }: { data: Record<string, any> }) {
    const renderReview = () => {
        return (
            <PopperWrapper>
                <div className={cx('preview')}>
                    <AccountPreview data={data} />
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
                <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                    </p>
                    <p className={cx('name')}>{data.first_name + ' ' + data.last_name}</p>
                </div>
            </div>
        </Tooltip>
    );
}

export default AccountItem;
