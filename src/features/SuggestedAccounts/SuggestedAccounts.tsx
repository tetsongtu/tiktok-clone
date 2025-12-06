import { AccountItem } from './AccountItem';

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
            <div className="border-t border-gray-400 w-[90%]"></div>
            <p className="block px-2 pt-2 text-base font-normal text-gray-700">{label}</p>

            <div className="max-h-[250px] overflow-y-auto">
                {data.map((account) => (
                    <div key={account.id}>
                        <AccountItem user={account} />
                    </div>
                ))}
            </div>

            <p
                className="block px-2 pb-2 text-base font-normal text-[#fe2c55] cursor-pointer"
                onClick={onSeeAll}
            >
                See all
            </p>
        </>
    );
}
