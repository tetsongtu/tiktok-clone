import { useRef, useState, useEffect } from 'preact/hooks';

import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import { SuggestedAccounts } from '~/features';
import * as userServices from '~/core/services/userService';
import { SIDEBAR_MENU } from './SidebarMenu';
import { Search } from '~/Layouts/components';

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
        <aside id="Sidebar" className="fixed top-[70px] bottom-0 w-[280px] px-2.5 z-40">
            <Menu>
                <Search />
                <nav className="my-[12px]">
                    {SIDEBAR_MENU.map((item) => (
                        <MenuItem key={item.title} {...item} />
                    ))}
                </nav>
            </Menu>
            <section>
                <SuggestedAccounts
                    label="Suggested accounts"
                    data={suggestedUsers}
                    onSeeAll={handleSeeAll}
                />
            </section>
            <section>
                <SuggestedAccounts label="Following" />
            </section>
            <footer className="py-4 w-full">
                <hr className="border-gray-400 w-[90%]"></hr>
                <section className="text-sm font-semibold text-gray-700 w-full">
                    <p>Following accounts</p>
                    <p>Accounts you follow will appear here</p>
                </section>
                <hr className="border-gray-400 w-[90%]"></hr>

                <ul className="text-sm font-medium text-gray-500 w-full space-y-1">
                    <li>Company</li>
                    <li>Program</li>
                    <li>Terms & Policies</li>
                    <li>© 2025 TikTok</li>
                </ul>
            </footer>
        </aside>
    );
}

export default Sidebar;
