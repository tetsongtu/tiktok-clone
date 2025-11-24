import Header from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Header />
            <div className="flex w-full px-[2px] lg:px-2.5">
                <Sidebar />
                <div className="flex mx-auto">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
