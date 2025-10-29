import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type AccountItemProps = {
    data: {
        id: number;
        nickname: string;
        avatar: string;
        full_name: string;
        tick?: boolean;
    };
};

function AccountItem({ data }: AccountItemProps) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <img className={cx('check')} src={images.search} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

export type Account = AccountItemProps['data'];
export default AccountItem;
