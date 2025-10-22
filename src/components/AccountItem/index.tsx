import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data }: any) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <img className={cx('check')} src={images.search} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </div>
    );
}

export default AccountItem;
