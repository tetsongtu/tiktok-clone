import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import { AccountItem } from './AccountItem';

const cx = classNames.bind(styles);

interface SuggestedAccountsProps {
    label: string;
    data?: any[];
    onSeeAll?: () => void;
}

export function SuggestedAccounts({
    label,
    data = [],
    onSeeAll,
}: SuggestedAccountsProps) {
    return (
        <>
            <div className="border-t border-gray-400 w-[50px] lg:w-[90%]"></div>
            <p className={cx('label', 'text-gray-700')}>{label}</p>

            <div className="max-h-[250px] overflow-y-auto">
                {data.map((account, index) => (
                    <div
                        key={account.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <AccountItem user={account} />
                    </div>
                ))}
            </div>

            <p className={cx('more-btn')} onClick={onSeeAll}>
                See all
            </p>
        </>
    );
}
