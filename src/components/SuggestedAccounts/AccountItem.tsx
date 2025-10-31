import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3df143b41360fcf147aca1bb5ff62475~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=2988bc40&x-expires=1761037200&x-signature=9XuQ909zvFyth1tdS8n8fgoNvpo%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1"
                alt=""
            />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>quocnguyenphu</strong>
                </p>
                <p className={cx('name')}>Nguyễn Quốc Khánh</p>
            </div>
        </div>
    );
}

export default AccountItem;
