import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Buttons/Button';
import type { UserProps } from '~/types';
import UserAvatar from '~/components/UserAvatar';

const cx = classNames.bind(styles);

function AccountPreview({ user }: UserProps) {
    return (
        <div className={cx('w-full p-8')}>
            <header className={cx('flex justify-between')}>
                <UserAvatar size={18} user={user} />
                <Button variant="primary">Follow</Button>
            </header>
            <section>
                <p className={cx('text-3xl')}>
                    <strong>{user.nickname}</strong>
                </p>
                <p className={cx('text-2xl')}>{user.first_name + ' ' + user.last_name}</p>
                <p className={cx('mt-4 text-3xl')}>
                    <strong className={cx('value')}>{user.followers_count} </strong>
                    <span className={cx('text-gray-500')}>Followers</span>
                    <strong className={cx('value')}>{user.likes_count} </strong>
                    <span className={cx('text-gray-500')}>Likes</span>
                </p>
            </section>
        </div>
    );
}

export default AccountPreview;
