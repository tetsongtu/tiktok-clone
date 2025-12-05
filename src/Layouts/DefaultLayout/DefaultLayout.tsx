import { Header, TopRightActionBar, Sidebar, ScrollButtons } from '~/Layouts/components';

function DefaultLayout({ children }: { children: any }) {
    return (
        <div className="relative grid grid-cols-[auto_1fr] min-h-[100dvh]">
            <aside className="w-[60px] lg:w-[250px] bg-gradient-to-b from-purple-100 via-purple-300 z-10">
                <Header />
                <Sidebar />
            </aside>

            <div className="flex h-[100dvh]">
                <div className="w-[8px] bg-gradient-to-b from-purple-300 via-yellow-700" />

                <main id="MainContent" className="flex-1">
                    <div className="h-full overflow-y-auto snap-y snap-mandatory bg-gradient-to-b from-gray-200 to-yellow-200 lg:pr-[258px]">
                        <div className="min-h-full py-2 px-4">{children}</div>
                    </div>

                    <ScrollButtons />
                </main>

                {/* Right bar - outside main to avoid re-render */}
                <div className="fixed top-0 right-[250px] h-screen w-[8px] bg-gradient-to-b from-yellow-200 via-cyan-700 to-cyan-50 pointer-events-none hidden lg:block z-10" />
                <aside className="fixed top-0 right-0 h-screen w-[250px] bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-50 pointer-events-none hidden lg:flex z-10" />
                <div className="fixed top-10 right-16 z-30 hidden lg:flex">
                    <TopRightActionBar />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
