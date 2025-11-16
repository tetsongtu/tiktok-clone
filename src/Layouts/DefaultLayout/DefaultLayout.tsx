import Header from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="flex px-[16px] w-full h-full max-w-[100%]">
                <Sidebar />
                <div className="flex-1">{children}</div>
            </div>
        </>
    );
}

export default DefaultLayout;
