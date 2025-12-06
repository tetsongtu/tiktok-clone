import classNames from 'classnames';
import { useEffect, useState, useRef } from 'preact/hooks';
import { MagnifyingGlassIcon, XIcon, SpinnerGapIcon } from '@phosphor-icons/react';

import * as searchServices from '~/core/services/searchService';
import { AccountItem } from '~/features';
import type { Account } from '~/shared/types';
import { LinkButton, BaseButton, Tooltip, PopperWrapper } from '~/shared';
import { useDebounce } from '~/shared/hooks';

const DEBOUNCE_TIME = 500;

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<Account[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIME);

    const inputRef = useRef<any>(null);

    useEffect(() => {
        const searchAccounts = async () => {
            if (!debouncedValue.trim()) {
                setSearchResult([]);
                return;
            }

            setLoading(true);
            try {
                const result = await searchServices.search(debouncedValue);
                setSearchResult(result);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResult([]);
            } finally {
                setLoading(false);
            }
        };

        searchAccounts();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current?.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e: any) => {
        const searchValue = e.target.value;

        if (searchValue.startsWith(' ')) {
            setSearchValue('');
            setSearchResult([]);
            return;
        }

        setSearchValue(searchValue);
    };

    const renderAccounts = () => {
        return (
            <PopperWrapper className="min-w-[208px]">
                <h4 className="px-3 py-1 text-base font-normal text-gray-500">
                    Accounts
                </h4>
                {searchResult.map((result: Account) => (
                    <AccountItem key={result.id} user={result} />
                ))}
            </PopperWrapper>
        );
    };

    const hasText = searchValue.trim().length > 0;
    const showClear = hasText && !loading;
    const showTooltip = showResult && searchResult.length > 0;

    return (
        <Tooltip
            visible={showTooltip}
            render={renderAccounts}
            onClickOutside={handleHideResult}
        >
            <div className="top-[16px] w-[208px] h-[40px] flex items-center justify-between gap-4 bg-gray-100 p-4 rounded-full">
                <LinkButton
                    className={classNames(
                        'h-full border-r border-r-gray-300',
                        hasText ? 'text-[rgba(22,24,35,0.75)]' : 'opacity-50',
                    )}
                    icon={<MagnifyingGlassIcon size={22} />}
                    tooltip="Search nội dung dài để test"
                />
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm..."
                    spellcheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                    className="w-full p-4 bg-transparent placeholder:text-gray-400 text-base"
                />
                {showClear && (
                    <BaseButton className="mr-2 rounded-full p-4" onClick={handleClear}>
                        <XIcon size="12" weight="light" />
                    </BaseButton>
                )}

                {loading && (
                    <BaseButton className="mr-3">
                        <SpinnerGapIcon size={12} />
                    </BaseButton>
                )}
            </div>
        </Tooltip>
    );
}

export default Search;
