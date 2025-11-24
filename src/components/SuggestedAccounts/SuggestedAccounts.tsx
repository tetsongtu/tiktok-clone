import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

interface SuggestedAccountsProps {
    label: string;
    data?: any[];
    onSeeAll?: () => void;
}

function SuggestedAccounts({ label, data = [], onSeeAll }: SuggestedAccountsProps) {
    return (
        <>
            <div className="border-t border-[#ccc] w-[50px] lg:w-[85%]"></div>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.id} user={account} />
            ))}
            <p className={cx('more-btn')} onClick={onSeeAll}>
                See all
            </p>
        </>
    );
}

export default SuggestedAccounts;
