import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/0b22197cfef8c7c570454811439204eb~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=06ac3324&x-expires=1758859200&x-signature=huTHqIB8ZthAywD7fWzYpTiEJP0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2"
                alt="Hoaaa"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Hoaaa</span>
                    <img className={cx('check')} src={images.search} alt="Search" />
                </h4>
                <span className={cx('username')}>@hoaaa</span>
            </div>
        </div>
    );
}

export default AccountItem;
