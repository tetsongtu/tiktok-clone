import classNames from 'classnames/bind';

import images from '~/assets/images';
import PostMain from './PostMain';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('container')}>
            <PostMain
                post={{
                    id: '1',
                    user_id: '1',
                    video_url: 'src/assets/videos/dance.mp4',
                    text: 'this is some text',
                    create_at: 'data here',
                    profile: {
                        user_id: '1',
                        name: 'name',
                        img: images.noImage,
                    },
                }}
            />
        </div>
    );
}

export default Home;
