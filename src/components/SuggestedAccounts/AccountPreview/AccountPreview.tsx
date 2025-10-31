import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3df143b41360fcf147aca1bb5ff62475~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=2988bc40&x-expires=1761037200&x-signature=9XuQ909zvFyth1tdS8n8fgoNvpo%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1"
                    alt=""
                />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </header>
            <section>
                <p className={cx('nickname')}>
                    <strong>quocnguyenphu</strong>
                </p>
                <p className={cx('name')}>Nguyễn Quốc Khánh</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>1.2M </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>12.3M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </section>
        </div>
    );
}

export default AccountPreview;
