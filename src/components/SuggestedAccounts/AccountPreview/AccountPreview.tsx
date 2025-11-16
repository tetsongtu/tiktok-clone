import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Buttons/Button';
import type { UserProps } from '~/types';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function AccountPreview({ user }: UserProps) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
                <Button variant="primary">Follow</Button>
            </header>
            <section>
                <p className={cx('nickname')}>
                    <strong>{user.nickname}</strong>
                </p>
                <p className={cx('name')}>{user.first_name + ' ' + user.last_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{user.followers_count} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{user.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </section>
        </div>
    );
}

export default AccountPreview;
