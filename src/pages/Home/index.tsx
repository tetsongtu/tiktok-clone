import { PostMain } from '~/Layouts/components';
import { useEffect, useState } from 'preact/hooks';
import * as videoService from '~/core/services/videoService';

function Home() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [nextId, setNextId] = useState(1);

    // Hàm load thêm video
    const loadMoreVideos = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            // Tạo mảng chứa 5 promise để fetch 5 video
            const promises = [];
            for (let i = 0; i < 5; i++) {
                promises.push(videoService.getVideoById(nextId + i));
            }

            // Chạy tất cả promise cùng lúc
            const results = await Promise.all(promises);

            // Lấy video hợp lệ
            const validVideos = results.filter((video) => video != null);

            // Nếu có video mới
            if (validVideos.length > 0) {
                setVideos((prev) => [...prev, ...validVideos]);
                setNextId(nextId + 5);
            } else {
                // Nếu không có video nào
                setHasMore(false);
            }
        } catch (error) {
            console.error('Lỗi khi tải video:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    // Load video khi vào trang
    useEffect(() => {
        if (videos.length === 0) {
            loadMoreVideos();
        }
    }, []);

    // Xử lý scroll
    useEffect(() => {
        const handleScroll = () => {
            // Tính toán vị trí scroll
            const nearBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

            // Nếu gần cuối trang và đang không loading
            if (nearBottom && !loading && hasMore) {
                loadMoreVideos();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

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
