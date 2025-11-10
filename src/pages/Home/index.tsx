import images from '~/assets/images';
import PostMain from '~/Layouts/components/PostMain';

function Home() {
    return (
        <div className="relative left-[50%] translate-x-[-50%] mt-[80px] w-[calc(100%-90px)] max-w-[690px] ml-auto">
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
