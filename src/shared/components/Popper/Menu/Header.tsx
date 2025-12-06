import classNames from 'classnames/bind';
import styles from './Menu.module.css';

const cx = classNames.bind(styles);

export function Header({ title, onBack }: { title?: string; onBack: () => void }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                &lt;
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}
