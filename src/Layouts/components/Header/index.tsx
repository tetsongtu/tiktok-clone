import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import styles from './Header.module.scss';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { UploadIcon, SearchIcon } from '~/components/Icons';
import Image from '~/components/Image';

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
    const currentUser = true;

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

    const userMenu = [
        {
            icon: '',
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: '',
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: '',
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: '',
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

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
                                <SearchIcon />
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
                            <UploadIcon />
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Button outline>Upload</Button>
                        <Button primary>Load in</Button>
                    </>
                )}
                <Menu
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={handleMenuChange}
                >
                    {currentUser ? (
                        <Image
                            src="ttps://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3df143b41360fcf147aca1bb5ff62475~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=2988bc40&x-expires=1761037200&x-signature=9XuQ909zvFyth1tdS8n8fgoNvpo%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1"
                            className={cx('user-avatar')}
                            alt="User"
                            fallback="https://yt3.ggpht.com/Pa8wyxqTOkhu5DW_RvkiQIS7Bsa7OW7gSen-2WpaQsC2EqUAkgubAg1_QPc951pzpN2F2Q4_TA=s88-c-k-c0x00ffffff-no-rj"
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
