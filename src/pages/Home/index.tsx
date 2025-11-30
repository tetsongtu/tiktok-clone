import images from '~/shared/assets/images';
import danceVideo from '~/shared/assets/videos/dance.mp4';
import PostMain from '~/Layouts/components/PostMain';

function Home() {
    return (
        <>
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
        </>
    );
}

export default Home;
