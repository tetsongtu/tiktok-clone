import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem, { type Account } from '~/components/AccountItem';
import { Tooltip } from '~/components/Tooltip';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import images from '~/assets/images';

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

    return (
        <Tooltip
            interactive
            visible={showResult && searchResult.length > 0}
            render={() => (
                <div className={cx('search-result')}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result: Account) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search"
                    spellcheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />

                <Tooltip content="Search nội dung dài để test">
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <BiSearch color="#A1A2A7" size={24} />
                    </button>
                </Tooltip>

                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <img src={images.clear} alt="Clear" />
                    </button>
                )}

                {loading && (
                    <button className={cx('loading')}>
                        <img src={images.loading} alt="Loading" />
                    </button>
                )}
            </div>
        </Tooltip>
    );
}

export default Search;
