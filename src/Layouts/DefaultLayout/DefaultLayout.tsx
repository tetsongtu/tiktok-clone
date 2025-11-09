import classNames from 'classnames/bind';
import Header from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }: { children: React.ReactNode }) {
    const pathname = useLocation().pathname;

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div
                    className={`
                absolute top-0 left-[50%] translate-x-[-50%]
                mx-auto w-full 
                lg:px-2.5 px-0 
                ${pathname == '/' ? 'max-w-[1140px]' : ''}`}
                >
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
