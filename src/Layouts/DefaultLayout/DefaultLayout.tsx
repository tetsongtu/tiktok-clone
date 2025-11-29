import Header, { TopRightActionBar } from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';
function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[auto_8px_1fr_8px_auto] min-h-[100dvh]">
            <aside className="w-[250px] bg-gradient-to-b from-purple-100 via-purple-300">
                <Header />
                <div className="fixed flex w-full px-[2px] lg:px-2.5">
                    <Sidebar />
                </div>
            </aside>
            <div className="bg-gradient-to-b from-purple-300 via-yellow-700"></div>
            <main
                id="MainContent"
                className="bg-gradient-to-b from-gray-200 to-yellow-200"
            >
                <div className="mx-auto">{children}</div>
            </main>
            <div className="bg-gradient-to-b from-yellow-200 via-cyan-700"></div>
            <aside
                id="RightSidebar"
                className="bg-gradient-to-b from-cyan-100 via-cyan-200"
            >
                <TopRightActionBar />
            </aside>
        </div>
    );
}
export default DefaultLayout;
