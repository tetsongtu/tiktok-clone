import Header from '../components/Header';
import Sidebar from './Sidebar';

function DefaultLayout({ children }: { children: any }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
}

export default DefaultLayout;
