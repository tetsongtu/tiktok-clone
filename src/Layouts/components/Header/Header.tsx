import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
    PlusIcon,
    DotsThreeVerticalIcon,
    ArrowUpIcon,
    ChatIcon,
    EnvelopeIcon,
} from '@phosphor-icons/react';

import config from '~/config';
import images from '~/assets/images';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import type { MenuItemData } from '~/types';
import Image from '~/components/Image';
import Button from '~/components/Buttons/Button';
import LinkButton from '~/components/Buttons/LinkButton';

const cx = classNames.bind(styles);

const MENU_ITEMS: MenuItemData[] = [
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
    const currentUser = false;

    const handleMenuChange = (menuItem: MenuItemData) => {
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
        <header className="fixed flex justify-between z-50 w-full h-[100px] py-[20px] px-[16px]">
            <div className="h-full">
                <Link to={config.routes.home}>
                    <Image className="h-[42px] px-[8px]" src={images.logo} alt="TikTok" />
                </Link>
            </div>

            <div className={cx('flex justify-end items-center')}>
                {currentUser ? (
                    <>
                        <LinkButton
                            to={config.routes.upload}
                            icon={<ArrowUpIcon size={25} />}
                            tooltip="Upload video"
                        />
                        <LinkButton icon={<ChatIcon size={25} />} tooltip="Messages" />
                        <LinkButton
                            icon={<EnvelopeIcon size={25} />}
                            tooltip="Inbox"
                            badge={12}
                        />
                    </>
                ) : (
                    <>
                        <Button variant="outline" leftIcon={<PlusIcon />}>
                            Upload
                        </Button>
                        <Button variant="primary">Load in</Button>
                    </>
                )}
                <Menu
                    key={currentUser ? 'user' : 'guest'}
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={handleMenuChange}
                >
                    {currentUser ? (
                        <Image
                            src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3df143b41360fcf147aca1bb5ff62475~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=2988bc40&x-expires=1761037200&x-signature=9XuQ909zvFyth1tdS8n8fgoNvpo%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1"
                            className={cx('user-avatar', 'rounded-full object-cover')}
                            alt="User"
                            fallback="https://yt3.ggpht.com/Pa8wyxqTOkhu5DW_RvkiQIS7Bsa7OW7gSen-2WpaQsC2EqUAkgubAg1_QPc951pzpN2F2Q4_TA=s88-c-k-c0x00ffffff-no-rj"
                        />
                    ) : (
                        <button className={cx('more-btn')}>
                            <DotsThreeVerticalIcon size={25} weight="bold" />
                        </button>
                    )}
                </Menu>
            </div>
        </header>
    );
}

export default Header;
