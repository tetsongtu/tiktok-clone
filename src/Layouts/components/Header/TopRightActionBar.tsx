import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { useState } from 'preact/hooks';

import {
    PlusIcon,
    DotsThreeVerticalIcon,
    ArrowUpIcon,
    ChatIcon,
    EnvelopeIcon,
} from '@phosphor-icons/react';

import config from '~/core/config';
import { Menu, Button, LinkButton } from '~/shared';
import type { MenuItemData, Account } from '~/shared/types';
import { useCurrentUser } from '~/shared/hooks';
import { AuthOptionsModal, LoginModal, RegisterModal } from '~/features/Modals';
import { UserAvatar } from '~/features';

const cx = classNames.bind(styles);

const MENU_ITEMS: MenuItemData[] = [
    {
        icon: '',
        title: 'English',
        children: {
            title: 'Language',
            data: [
                { type: 'language', code: 'en', title: 'English' },
                { type: 'language', code: 'vi', title: 'Tiếng Việt' },
            ],
        },
    },
    { icon: '', title: 'Feedback and help', to: '/feedback' },
    { icon: '', title: 'Keyboard shortcuts' },
];

function TopRightActionBar() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [isAuthOptionsModalOpen, setIsAuthOptionsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const userMenu: MenuItemData[] = [
        { icon: '', title: 'View profile', to: '/@hoaa' },
        { icon: '', title: 'Get coins', to: '/coin' },
        { icon: '', title: 'Settings', to: '/settings' },
        ...MENU_ITEMS,
        {
            icon: '',
            title: 'Log out',
            to: '#',
            separate: true,
            onClick: () => setCurrentUser(false),
        },
    ];

    const guestUser: Account = {
        avatar: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/486f3c515c065ccaa844faf058940fe1~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=3172adc4&x-expires=1764342000&x-signature=dpyyN9ZWvISrGqAwnsrc4oL8TP0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my3',
    };
    const handleSwitchToRegister = () => {
        setIsAuthOptionsModalOpen(false);
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    const handleSwitchToAuthOptions = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(false);
        setIsAuthOptionsModalOpen(true);
    };

    const handleShowLoginForm = () => {
        setIsAuthOptionsModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const handleBackToAuthOptions = () => {
        setIsLoginModalOpen(false);
        setIsAuthOptionsModalOpen(true);
    };

    return (
        <>
            <AuthOptionsModal
                isOpen={isAuthOptionsModalOpen}
                onClose={() => setIsAuthOptionsModalOpen(false)}
                onSwitchToRegister={handleSwitchToRegister}
                onShowLoginForm={handleShowLoginForm}
            />
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onBack={handleBackToAuthOptions}
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSwitchToLogin={handleSwitchToAuthOptions}
            />
            <nav className={cx('flex items-center')}>
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
                    <div className="flex space-x-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsAuthOptionsModalOpen(true)}
                            leftIcon={<PlusIcon />}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setIsAuthOptionsModalOpen(true)}
                        >
                            Log in
                        </Button>
                    </div>
                )}

                <Menu
                    key={currentUser ? 'user' : 'guest'}
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={(item) => item.title === 'Log out' && setCurrentUser(false)}
                >
                    <div className="ml-3">
                        {currentUser ? (
                            <UserAvatar
                                size={10}
                                user={guestUser}
                                fallback="https://yt3.ggpht.com/Pa8wyxqTOkhu5DW_RvkiQIS7Bsa7OW7gSen-2WpaQsC2EqUAkgubAg1_QPc951pzpN2F2Q4_TA=s88-c-k-c0x00ffffff-no-rj"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <DotsThreeVerticalIcon size={25} weight="bold" />
                            </button>
                        )}
                    </div>
                </Menu>
            </nav>
        </>
    );
}

export default TopRightActionBar;
