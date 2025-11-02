import images from '~/assets/images';
import PostMain from './PostMain';

function Home() {
    return (
        <div>
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
