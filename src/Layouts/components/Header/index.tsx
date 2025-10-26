import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import Button from '~/components/Button';
import { Tooltip } from '~/components/Tooltip';
import images from '~/assets/images';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

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
    const currentUser = true;

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
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>
                <Search />
            </div>

            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Tooltip content="Upload video">
                            <button className={cx('action-btn')}>
                                <UploadIcon />
                            </button>
                        </Tooltip>
                        <Tooltip content="Messages">
                            <button className={cx('action-btn')}>
                                <MessageIcon />
                            </button>
                        </Tooltip>
                        <Tooltip content="Inbox">
                            <button className={cx('action-btn')}>
                                <InboxIcon />
                                <span className={cx('badge')}>12</span>
                            </button>
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
                            src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3df143b41360fcf147aca1bb5ff62475~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=2988bc40&x-expires=1761037200&x-signature=9XuQ909zvFyth1tdS8n8fgoNvpo%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1"
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
