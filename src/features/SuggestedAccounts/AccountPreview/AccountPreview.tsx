import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

import type { Account } from '~/shared/types';
import { Button } from '~/shared';
import { UserAvatar } from '~/features';
import { Link } from 'wouter-preact';

const cx = classNames.bind(styles);

interface AccountPreviewProps {
    user: Account;
}

function AccountPreview({ user }: AccountPreviewProps) {
    return (
        <div className={cx('w-full p-5')}>
            <Link to={`/@${user.nickname}`}>
                <header className={cx('flex justify-between items-start')}>
                    <UserAvatar user={user} />
                    <button className="rounded-md py-4 px-6 text-sm text-white font-semibold bg-[var(--primary)] hover:bg-[#e0274b]">
                        Follow
                    </button>
                </header>
            </Link>
            <section>
                <p className={cx('text-lg')}>
                    <strong>{user.nickname}</strong>
                </p>
                <p className={cx('text-sm text-gray-600')}>
                    {user.first_name} {user.last_name}
                </p>
                <p className={cx('mt-3 text-base')}>
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
