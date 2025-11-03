import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userServices from '~/services/userService';
import { SIDEBAR_MENU } from './SiderbarMenu';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);

    const fetchedRef = useRef(false);
    useEffect(() => {
        if (fetchedRef.current && page === INIT_PAGE) return;
        fetchedRef.current = true;

        userServices
            .getSuggested({ page: page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers((prev) =>
                    page === INIT_PAGE ? data : [...prev, ...data],
                );
            })
            .catch(console.error);
    }, [page]);

    const handleSeeAll = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {SIDEBAR_MENU.map((item) => (
                    <MenuItem key={item.title} {...item} />
                ))}
            </Menu>
            <SuggestedAccounts
                label="Suggested accounts"
                data={suggestedUsers}
                onSeeAll={handleSeeAll}
            />
            <SuggestedAccounts label="Following" />
            <div className={cx('footer')}>
                <div style={{ borderTop: '1px solid #ccc' }}>
                    <p>Following accounts</p>
                    <p>Accounts you follow will appear here</p>
                </div>
                <div
                    style={{
                        borderTop: '1px solid #ccc',
                        color: 'gray',
                        padding: '0 1rem',
                    }}
                >
                    <p>Company</p>
                    <p>Program</p>
                    <p>Terms & Policies</p>
                    <p>© 2025 TikTok</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
