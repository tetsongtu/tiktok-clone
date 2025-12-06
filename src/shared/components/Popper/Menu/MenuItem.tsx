import classNames from 'classnames/bind';
import { Button } from '~/shared/components/Buttons/Button/Button';
import styles from './Menu.module.css';

const cx = classNames.bind(styles);

export function MenuItem({
    data,
    onClick,
}: {
    data: Record<string, any>;
    onClick: () => void;
}) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}
