import classNames from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { type Account } from '~/types';
import Tooltip from '~/components/Tooltip';
import { useDebounce } from '~/hooks';
import images from '~/assets/images';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<Account[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);

            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
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
                {searchResult.map((result: Account) => (
                    <AccountItem key={result.id} data={result} />
                ))}
            </PopperWrapper>
        );
    };

    const hasText = searchValue.trim().length > 0;

    return (
        <Tooltip
            visible={showResult && searchResult.length > 0}
            render={renderAccounts}
            onClickOutside={handleHideResult}
        >
            <div className="relative top-[16px] w-[208px] h-[40px] flex items-center justify-between gap-2 hidden md:flex bg-[#F1F1F2] p-1 rounded-full">
                <Tooltip content="Search nội dung dài để test">
                    <button
                        className={classNames(
                            'px-3 py-2 border-r border-r-gray-300 h-[30px]',
                            hasText ? 'text-[rgba(22,24,35,0.75)]' : 'opacity-50',
                        )}
                    >
                        <BiSearch size={22} />
                    </button>
                </Tooltip>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search"
                    spellcheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                    className="absolute left-18 w-[63%] p-1 bg-transparent placeholder:text-[#838383] text-[1.4rem] focus:outline-none focus:caret-[var(--primary)]"
                />
                {!!searchValue && !loading && (
                    <button className="px-3" onClick={handleClear}>
                        <img src={images.clear} alt="Clear" className="h-8" />
                    </button>
                )}

                {loading && (
                    <button className="px-3 animate-spin">
                        <img src={images.loading} alt="Loading" className="h-8" />
                    </button>
                )}
            </div>
        </Tooltip>
    );
}

export default Search;
