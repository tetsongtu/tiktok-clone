import images from '~/assets/images';
import danceVideo from '~/assets/videos/dance.mp4';
import PostMain from '~/Layouts/components/PostMain';

function Home() {
    return (
        <div>
            <PostMain
                post={{
                    id: '1',
                    user_id: '1',
                    video_url: danceVideo,
                    text: 'this is some text',
                    create_at: 'data here',
                    profile: {
                        user_id: '1',
                        name: 'name',
                        img: images.noImage,
                    },
                }}
            />
            <PostMain
                post={{
                    id: '1',
                    user_id: '1',
                    video_url: danceVideo,
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
