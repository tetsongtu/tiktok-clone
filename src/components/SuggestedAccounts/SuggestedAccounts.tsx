import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({
    label,
    data = [],
    onSeeAll,
}: {
    label: string;
    data?: Array<any>;
    onSeeAll?: () => void;
}) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.id} user={account} />
            ))}
            <p className={cx('more-btn')} onClick={onSeeAll}>
                See all
            </p>
        </div>
    );
}

export default SuggestedAccounts;
