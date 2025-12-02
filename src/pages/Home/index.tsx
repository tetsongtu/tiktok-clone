import { PostMain } from '~/Layouts/components';
import { useRandomVideoFeed } from '~/shared/hooks';

function Home() {
    const videos = useRandomVideoFeed();

    return (
        <div>
            {videos.map((video, index) => (
                <PostMain key={`${video.id}-${index}`} post={video} />
            ))}
        </div>
    );
}

export default Home;
