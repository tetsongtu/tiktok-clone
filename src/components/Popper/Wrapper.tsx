import classNames from 'classnames';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children }: { children: any }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Wrapper;
