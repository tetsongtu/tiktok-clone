import { useState, useEffect, useRef } from 'react';
import { PostMain } from '~/Layouts/components';
import * as videoService from '~/core/services/videoService';
import type { PostData } from '~/shared/types/Home';

const VIDEOS_PER_BATCH = 5;
const MAX_VIDEO_ID = 109;
const SCROLL_THRESHOLD = 800;

function Home() {
    const [videos, setVideos] = useState<PostData[]>([]);
    const isFetchingRef = useRef(false);
    const fetchedIdsRef = useRef(new Set<number>());

    const fetchVideos = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        const videoIds = Array.from(
            { length: VIDEOS_PER_BATCH },
            () => Math.floor(Math.random() * MAX_VIDEO_ID) + 1,
        ).filter((id) => !fetchedIdsRef.current.has(id));

        const results = await Promise.allSettled(
            videoIds.map((id) => videoService.getVideo(id)),
        );

        const newVideos = results
            .map((result, index) => {
                if (result.status === 'fulfilled' && result.value) {
                    fetchedIdsRef.current.add(videoIds[index]);
                    return result.value;
                }
                return null;
            })
            .filter((video): video is PostData => video !== null);

        setVideos((prev) => [...prev, ...newVideos]);
        isFetchingRef.current = false;
    };

    useEffect(() => {
        fetchVideos();

        const handleScroll = () => {
            const isNearBottom =
                window.scrollY + window.innerHeight >=
                document.documentElement.scrollHeight - SCROLL_THRESHOLD;

            if (isNearBottom) {
                fetchVideos();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {videos.map((video, index) => (
                <PostMain key={`${video.id}-${index}`} post={video} />
            ))}
        </div>
    );
}

export default Home;
