import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { type Account } from '~/types';
import { Tooltip } from '~/components/Tooltip';
import { useDebounce } from '~/hooks';
import styles from './Search.module.css';
import images from '~/assets/images';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

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

    const hasText = searchValue.trim().length > 0;

    return (
        <Tooltip
            visible={showResult && searchResult.length > 0}
            render={() => (
                <div className={cx('search-result')}>
                    <PopperWrapper>
                        {searchResult.map((result: Account) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <div className="flex flex-row-reverse items-center justify-between gap-6 hidden md:flex bg-[#F1F1F2] p-1 rounded-full max-w-[208px] w-full h-full">
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search"
                        spellcheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        className="w-full p-1 bg-transparent placeholder:text-[#838383] text-[1.4rem] focus:outline-none focus:caret-[var(--primary)]"
                    />
                    <Tooltip content="Search">
                        <button
                            className={cx(
                                'px-3 py-2 border-r border-r-gray-300 h-[30px]',
                                hasText ? 'text-[rgba(22,24,35,0.75)]' : 'opacity-50',
                            )}
                        >
                            <BiSearch size={22} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </Tooltip>

        // <Tooltip
        //     interactive
        //     visible={showResult && searchResult.length > 0}
        //     render={() => (
        //         <div className={cx('search-result')}>
        //             <PopperWrapper>
        //                 <h4 className={cx('search-title')}>Accounts</h4>
        //                 {searchResult.map((result: Account) => (
        //                     <AccountItem key={result.id} data={result} />
        //                 ))}
        //             </PopperWrapper>
        //         </div>
        //     )}
        //     onClickOutside={handleHideResult}
        // >
        //     <div className={cx('search')}>
        //         <input
        //             ref={inputRef}
        //             value={searchValue}
        //             placeholder="Search"
        //             spellcheck={false}
        //             onChange={handleChange}
        //             onFocus={() => setShowResult(true)}
        //         />

        //         <Tooltip content="Search nội dung dài để test">
        //             <button
        //                 className={cx('search-btn')}
        //                 onMouseDown={(e) => e.preventDefault()}
        //             >
        //                 <BiSearch className="relative left-2" color="#A1A2A7" size={24} />
        //             </button>
        //         </Tooltip>

        //         {!!searchValue && !loading && (
        //             <button className={cx('clear')} onClick={handleClear}>
        //                 <img src={images.clear} alt="Clear" />
        //             </button>
        //         )}

        //         {loading && (
        //             <button className={cx('loading')}>
        //                 <img src={images.loading} alt="Loading" />
        //             </button>
        //         )}
        //     </div>
        // </Tooltip>
    );
}

export default Search;
