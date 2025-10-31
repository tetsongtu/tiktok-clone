import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function AccountPreview({ data }: { data: Record<string, any> }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </header>
            <section>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                </p>
                <p className={cx('name')}>{data.first_name + ' ' + data.last_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers_count} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </section>
        </div>
    );
}

export default AccountPreview;
