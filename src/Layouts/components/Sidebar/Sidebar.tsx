import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userServices from '~/services/userService';
import { SIDEBAR_MENU } from './SiderbarMenu';
import Search from '~/Layouts/components/Search';

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
        <aside id="Sidebar" className="fixed mt-[71px]">
            <Menu>
                <Search />
                <div className="my-[12px]">
                    {SIDEBAR_MENU.map((item) => (
                        <MenuItem key={item.title} {...item} />
                    ))}
                </div>
            </Menu>
            <div className="h-[100vh] overflow-y-scroll">
                <SuggestedAccounts
                    label="Suggested accounts"
                    data={suggestedUsers}
                    onSeeAll={handleSeeAll}
                />
                <SuggestedAccounts label="Following" />
                <div className={cx('footer')}>
                    <div className="text-[13px] font-semibold opacity-72 border-t border-[#ccc] w-[85%]">
                        <p>Following accounts</p>
                        <p>Accounts you follow will appear here</p>
                    </div>
                    <div className="text-[13px] font-semibold opacity-50 border-t border-[#ccc] w-[85%]">
                        <p>Company</p>
                        <p>Program</p>
                        <p>Terms & Policies</p>
                        <p>© 2025 TikTok</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
