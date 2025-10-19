import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import styles from './Header.module.scss';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: '',
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: '',
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: '',
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState<any>([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 3000);
    }, []);

    const handleMenuChange = (menuItem: any) => {
        switch (menuItem.type) {
            case 'language':
                break;
            default:
                break;
        }
    };

    const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>

                <Tooltip
                    interactive
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
                {currentUser ? (
                    <>
                        <Tooltip content="Upload video">
                            <Button className={cx('action-btn')}>Upload</Button>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Button outline>Upload</Button>
                        <Button primary>Load in</Button>
                    </>
                )}
                <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <img
                            src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3df143b41360fcf147aca1bb5ff62475~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=2988bc40&x-expires=1761037200&x-signature=9XuQ909zvFyth1tdS8n8fgoNvpo%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1"
                            className={cx('user-avatar')}
                            alt="User"
                        />
                    ) : (
                        <button className={cx('more-btn')}>⋮</button>
                    )}
                </Menu>
            </div>
        </header>
    );
}

export default Header;
