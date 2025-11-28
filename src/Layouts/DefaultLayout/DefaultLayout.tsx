import Header, { TopRightActionBar } from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div class="grid grid-cols-[auto_auto_auto] min-h-[100dvh]">
            <aside id="LeftSidebar" class="bg-blue-500 p-4">
                <Header />
                <div className="flex w-full px-[2px] lg:px-2.5">
                    <Sidebar />
                </div>
            </aside>
            <main id="MainContent" class="bg-green-200 p-4">
                <div className="flex mx-auto">{children}</div>
            </main>
            <aside id="RightSidebar" class="bg-gray-300 p-4">
                <TopRightActionBar />
            </aside>
        </div>
    );
}

export default DefaultLayout;
