import { useLocation } from 'wouter-preact';
import { CaretCircleUpIcon, CaretCircleDownIcon } from '@phosphor-icons/react';
import config from '~/core/config';
import { Header, TopRightActionBar, Sidebar } from '~/Layouts/components';

function DefaultLayout({ children }: { children: any }) {
    const [location] = useLocation();
    const isHome = location === config.routes.home;

    return (
        <div className="relative grid grid-cols-[auto_1fr] min-h-[100dvh]">
            <aside className="w-[60px] lg:w-[250px] bg-gradient-to-b from-purple-100 via-purple-300 z-10">
                <Header />
                <Sidebar />
            </aside>

            <div className="flex h-[100dvh]">
                <div className="w-[8px] bg-gradient-to-b from-purple-300 via-yellow-700" />

                <main id="MainContent" className="flex-1 flex">
                    <div className="fixed top-0 right-[250px] h-screen w-[8px] bg-gradient-to-b from-yellow-200 via-cyan-700 to-cyan-50 pointer-events-none hidden lg:block" />

                    <aside className="fixed top-0 right-0 h-screen w-[250px] bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-50 pointer-events-none hidden lg:flex" />

                    <div className="flex-1 overflow-y-auto snap-y snap-mandatory bg-gradient-to-b from-gray-200 to-yellow-200 lg:pr-[258px]">
                        <article className="min-h-full py-2 px-4 flex justify-center items-center">
                            <div className={`${isHome ? '' : 'w-full'} h-full`}>
                                {children}
                            </div>
                        </article>
                    </div>

                    <div className="fixed top-0 right-0 h-screen w-24 flex items-center justify-center pointer-events-none z-30">
                        <div className="hidden lg:flex flex-col gap-4 pointer-events-auto">
                            {[CaretCircleUpIcon, CaretCircleDownIcon].map(
                                (Icon, index) => (
                                    <button
                                        key={index}
                                        className="flex justify-center items-center size-18 rounded-full bg-white/80 hover:bg-white shadow-lg cursor-pointer"
                                    >
                                        <Icon size={52} weight="light" />
                                    </button>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="fixed top-10 right-16 z-30 hidden lg:flex">
                        <TopRightActionBar />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
