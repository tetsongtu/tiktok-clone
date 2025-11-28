import { useRef, useState, useEffect } from 'react';

import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userServices from '~/services/userService';
import { SIDEBAR_MENU } from './SiderbarMenu';
import Search from '~/Layouts/components/Search';

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
                <nav className="my-[12px]">
                    {SIDEBAR_MENU.map((item) => (
                        <MenuItem key={item.title} {...item} />
                    ))}
                </nav>
            </Menu>
            <div className="h-[100vh] overflow-y-scroll">
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
                <footer className="hidden lg:block">
                    <hr className="border-[#ccc] w-[85%]"></hr>
                    <section className="text-[13px] font-semibold opacity-72 w-full">
                        <p>Following accounts</p>
                        <p>Accounts you follow will appear here</p>
                    </section>
                    <hr className="border-[#ccc] w-[85%]"></hr>

                    <ul className="text-[13px] font-semibold opacity-50 w-full">
                        <li>Company</li>
                        <li>Program</li>
                        <li>Terms & Policies</li>
                        <li>© 2025 TikTok</li>
                    </ul>
                </footer>
            </div>
        </aside>
    );
}

export default Sidebar;
