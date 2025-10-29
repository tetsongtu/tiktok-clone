import classNames from 'classnames/bind';
import Header from '~/Layouts/components/Header';
import Sidebar from '~/Layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
