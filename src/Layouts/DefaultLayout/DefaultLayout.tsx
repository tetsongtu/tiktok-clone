import Header from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="flex px-[16px] w-full h-full">
                <Sidebar />
                <div className="flex-1 max-w-[690px] mx-auto">{children}</div>
            </div>
        </>
    );
}

export default DefaultLayout;
