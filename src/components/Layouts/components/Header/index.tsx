import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <div className={cx('search')}>
                    <input type="text" placeholder="Search" spellcheck={false} />
                    <button className={cx('search-btn')}>
                        <img src={images.search} alt="Search" />
                    </button>
                    <button className={cx('clear')}>
                        <img src={images.clear} alt="Clear" />
                    </button>
                    <button className={cx('loading')}>
                        <img src={images.loading} alt="Loading" />
                    </button>
                </div>
                <div className={cx('actions')}></div>
            </div>
        </header>
    );
}

export default Header;
