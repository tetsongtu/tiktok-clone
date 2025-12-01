import { PostMain } from '~/Layouts/components';
import { useEffect, useState } from 'preact/hooks';
import * as videoService from '~/core/services/videoService';

function Home() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1); // page hiện tại

    const loadNextPage = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await videoService.getVideos(page);
            if (res?.length) {
                setVideos((prev) => [...prev, ...res]);
                setPage((prev) => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // scroll listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                loadNextPage();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, page]);

    // load page 1 lúc mount
    useEffect(() => {
        loadNextPage();
    }, []);

    return (
        <div>
            {videos.map((video) => (
                <PostMain key={video.id} post={video} />
            ))}

            {loading && <p className="text-center">Đang tải...</p>}
            {!hasMore && videos.length > 0 && (
                <p className="text-center">Hết video rồi!</p>
            )}
        </div>
    );
}

export default Home;
