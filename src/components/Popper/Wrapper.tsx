import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

interface WrapperProps {
    children: any;
}

function Wrapper({ children }: WrapperProps) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Wrapper;
