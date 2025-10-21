import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { Tooltip } from '~/components/Tooltip';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<any>([]);
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef<any>(null);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    }, []);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <Tooltip
            interactive
            visible={showResult && searchResult.length > 0}
            render={() => (
                <div className={cx('search-result')}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        <AccountItem />
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
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <img src={images.clear} alt="Clear" />
                    </button>
                )}

                <Tooltip content="Search">
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </Tooltip>

                {/* <button className={cx('loading')}>
                    <img src={images.loading} alt="Loading" />
                </button> */}
            </div>
        </Tooltip>
    );
}

export default Search;
