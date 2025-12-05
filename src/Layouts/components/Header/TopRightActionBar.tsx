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
import type { MenuItemData } from '~/shared/types';
import { useCurrentUser } from '~/shared/hooks';
import { AuthModal } from '~/features/Modals';
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
    const { currentUser, currentUserData, setCurrentUser, setCurrentUserData } =
        useCurrentUser();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleLogout = () => {
        setCurrentUser(false);
        setCurrentUserData(null);
    };

    const userMenu: MenuItemData[] = [
        {
            icon: '',
            title: 'View profile',
            to: `/@${currentUserData?.nickname || 'test'}`,
        },
        { icon: '', title: 'Get coins', to: '/coin' },
        { icon: '', title: 'Settings', to: '/settings' },
        ...MENU_ITEMS,
        {
            icon: '',
            title: 'Log out',
            to: '#',
            separate: true,
            onClick: handleLogout,
        },
    ];

    return (
        <>
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
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
                            onClick={() => setIsAuthModalOpen(true)}
                            leftIcon={<PlusIcon />}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setIsAuthModalOpen(true)}
                        >
                            Log in
                        </Button>
                    </div>
                )}

                <Menu
                    key={currentUser ? 'user' : 'guest'}
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={(item) => item.title === 'Log out' && handleLogout()}
                >
                    <div className="ml-3">
                        {currentUser ? (
                            <UserAvatar
                                size={10}
                                user={currentUserData || {}}
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
