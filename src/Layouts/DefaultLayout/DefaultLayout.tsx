import Header from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Header />
            <div className="flex px-[2px] md:px-[16px] w-full h-full">
                <Sidebar />
                <div className="z-50 flex-1 max-w-[690px] mx-auto">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
