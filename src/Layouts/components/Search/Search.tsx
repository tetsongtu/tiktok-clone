import classNames from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import type { UserData } from '~/types/SiderbarMenu';
import Tooltip from '~/components/Tooltip';
import { useDebounce } from '~/hooks';
import images from '~/assets/images';
import LinkButton from '~/components/Buttons/LinkButton';
import BaseButton from '~/components/Buttons';

const DEBOUNCE_TIME = 500;

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<UserData[]>([]);
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
                <h4 className="px-3 py-[5px] text-[1.4rem] font-semibold text-[rgba(22,24,35,0.5)]">
                    Accounts
                </h4>
                {searchResult.map((result: UserData) => (
                    <AccountItem key={result.id} data={result} />
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
            <div className="top-[16px] w-[208px] h-[40px] flex items-center justify-between gap-2 hidden md:flex bg-[#F1F1F2] p-1 rounded-full">
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
                    placeholder="Search"
                    spellcheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                    className="w-full p-1 bg-transparent placeholder:text-[#838383] text-[1.4rem] focus:outline-none focus:caret-[var(--primary)]"
                />
                {showClear && (
                    <BaseButton className="mr-3" onClick={handleClear}>
                        <img src={images.clear} alt="Clear" className="h-8" />
                    </BaseButton>
                )}

                {loading && (
                    <BaseButton className="mr-3 animate-spin">
                        <img src={images.loading} alt="Loading" className="h-8" />
                    </BaseButton>
                )}
            </div>
        </Tooltip>
    );
}

export default Search;
