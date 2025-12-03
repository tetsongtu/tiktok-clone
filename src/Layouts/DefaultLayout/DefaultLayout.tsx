import { useLocation } from 'wouter-preact';
import config from '~/core/config';

import { Header, TopRightActionBar, Sidebar } from '~/Layouts/components';

function DefaultLayout({ children }: { children: any }) {
    const [location] = useLocation();
    const isHome = location === config.routes.home;

    return (
        <div className="grid grid-cols-[auto_8px_1fr_8px_auto] min-h-[100dvh]">
            {/* Left Sidebar - cao nhất */}
            <aside className="w-[60px] lg:w-[250px] bg-gradient-to-b from-purple-100 via-purple-300">
                <Header />
                <div className="fixed top-[70px] bottom-0 w-[60px] lg:w-[250px] px-[2px] lg:px-2.5 z-40">
                    <Sidebar />
                </div>
            </aside>

            {/* Left Gradient Divider */}
            <div className="bg-gradient-to-b from-purple-300 via-yellow-700"></div>

            {/* Main Content - thấp hơn nhưng nội dung click được */}
            <main
                id="MainContent"
                className="bg-gradient-to-b from-gray-200 to-yellow-200"
            >
                <div
                    className={`h-[100dvh] overflow-y-auto ${
                        isHome ? 'max-w-6xl mx-auto' : 'w-full'
                    }`}
                >
                    {children}
                </div>
            </main>

            {/* Right Gradient Divider */}
            <div className="bg-gradient-to-b from-yellow-200 via-cyan-700"></div>

            {/* Right Sidebar */}
            <aside
                id="RightSidebar"
                className="hidden lg:flex w-[0px] lg:w-[250px] bg-gradient-to-b from-cyan-100 via-cyan-200"
            >
                <TopRightActionBar />
            </aside>
        </div>
    );
}

export default DefaultLayout;
