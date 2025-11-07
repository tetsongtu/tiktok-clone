import classNames from 'classnames/bind';
import styles from './AccountItem.module.css';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import type { AccountItemProps } from '~/types/AccountTypes';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data }: AccountItemProps) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image
                src={data.avatar}
                alt={data.full_name}
                className="w-13 h-13 object-cover rounded-full"
            />

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <Image className={cx('check')} src={images.search} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
