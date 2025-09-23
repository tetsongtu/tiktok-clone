import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tooltip from '~/components/Tooltip';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const searchBtnRef = useRef<HTMLButtonElement>(null);
    const [searchResult, setSearchResult] = useState([]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <PopperWrapper>
                    <div className={cx('search-result')}>Ket qua</div>
                </PopperWrapper>
                <div className={cx('search')}>
                    <Tooltip content="Ket qua">
                        <input type="text" placeholder="Search" spellcheck={false} />
                    </Tooltip>

                    <Tooltip content="My tooltip with more content">
                        <button ref={searchBtnRef} className={cx('search-btn')}>
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
                <div className={cx('actions')}></div>
            </div>
        </header>
    );
}

export default Header;
