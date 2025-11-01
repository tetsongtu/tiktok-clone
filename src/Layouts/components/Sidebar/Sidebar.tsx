import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { BsCameraVideo, BsCameraVideoFill } from 'react-icons/bs';
import { RiGroupLine, RiGroupFill } from 'react-icons/ri';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userServices from '~/services/userService';
import config from '~/config';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

const MENU_ITEM = [
    {
        title: 'For You',
        to: config.routes.home,
        icon: <AiOutlineHome />,
        actionIcon: <AiFillHome />,
    },
    {
        title: 'Following',
        to: config.routes.following,
        icon: <RiGroupLine />,
        actionIcon: <RiGroupFill />,
    },
    {
        title: 'LIVE',
        to: config.routes.live,
        icon: <BsCameraVideo />,
        actionIcon: <BsCameraVideoFill />,
    },
];

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);

    useEffect(() => {
        userServices
            .getSuggested({ page: page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers((prev) => [...prev, ...data]);
            })
            .catch(console.error);
    }, [page]);

    const handleSeeAll = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {MENU_ITEM.map((item) => (
                    <MenuItem key={item.title} {...item} />
                ))}
            </Menu>
            <SuggestedAccounts
                label="Suggested accounts"
                data={suggestedUsers}
                onSeeAll={handleSeeAll}
            />
            <SuggestedAccounts label="Following" />
        </aside>
    );
}

export default Sidebar;
