import { useLocation } from 'wouter-preact';
import config from '~/core/config';

import { Header, TopRightActionBar, Sidebar } from '~/Layouts/components';
import { CaretCircleUpIcon, CaretCircleDownIcon } from '@phosphor-icons/react';

function DefaultLayout({ children }: { children: any }) {
    const [location] = useLocation();
    const isHome = location === config.routes.home;

    return (
        <div className="relative grid grid-cols-[auto_8px_1fr_8px_auto] min-h-[100dvh]">
            {/* Left Sidebar */}
            <aside className="w-[60px] lg:w-[250px] bg-gradient-to-b from-purple-100 via-purple-300 z-10">
                <Header />
                <Sidebar />
            </aside>

            {/* Left Divider */}
            <div className="bg-gradient-to-b from-purple-300 via-yellow-700 z-5" />

            {/* Main Content */}
            <main
                id="MainContent"
                className="bg-gradient-to-b from-gray-200 to-yellow-200 relative"
            >
                <div className="h-[100dvh] overflow-y-auto">
                    <article className="h-full w-full py-2 px-4 flex justify-center items-center">
                        <div className={`${isHome ? 'aspect-[9/16]' : 'w-full'} h-full`}>
                            {children}
                        </div>
                    </article>
                </div>
            </main>

            {/* Right Divider */}
            <div className="bg-gradient-to-b from-yellow-200 via-cyan-700 z-5" />

            {/* Right Sidebar */}
            <aside className="hidden lg:flex w-[0px] lg:w-[250px] bg-gradient-to-b from-cyan-100 via-cyan-200 z-10" />

            {/* Scroll Buttons */}
            <div className="fixed right-0 top-0 h-screen w-24 flex items-center justify-center z-30 pointer-events-none">
                <div className="pointer-events-auto hidden lg:flex flex-col gap-4">
                    {[CaretCircleUpIcon, CaretCircleDownIcon].map((Icon, index) => (
                        <button
                            key={index}
                            className="flex justify-center items-center size-18 rounded-full cursor-pointer bg-white/80 hover:bg-white shadow-lg"
                        >
                            <Icon size={52} weight="light" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Top Right Action Bar */}
            <div className="fixed right-16 top-10 z-30 hidden lg:flex">
                <TopRightActionBar />
            </div>
        </div>
    );
}

export default DefaultLayout;
