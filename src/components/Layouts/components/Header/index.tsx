import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import styles from './Header.module.scss';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState<any>([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 3000);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>

                <Tooltip
                    render={() => (
                        <div className={cx('search-result')}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input type="text" placeholder="Search" spellcheck={false} />

                        <Tooltip content="Search">
                            <button className={cx('search-btn')}>
                                <img src={images.search} alt="Search" />
                            </button>
                        </Tooltip>

                        <button className={cx('clear')}>
                            <img src={images.clear} alt="Clear" />
                        </button>
                        <button className={cx('loading')}>
                            <img src={images.loading} alt="Loading" />
                        </button>
                    </div>
                </Tooltip>
            </div>
            <div className={cx('actions')}>
                <Button outline>Upload</Button>
                <Button primary>Load in</Button>
                <Tooltip
                    visible
                    render={() => (
                        <div className={cx('menu-items')}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <button className={cx('more-btn')}>⋮</button>
                </Tooltip>
            </div>
        </header>
    );
}

export default Header;
