import { useState, useEffect, useRef } from 'preact/hooks';

import * as videoService from '~/core/services/videoService';
import type { Post } from '~/shared/types';

const VIDEOS_PER_BATCH = 5;
const MAX_VIDEO_ID = 109;
const SCROLL_THRESHOLD = 800;

export function useRandomVideoFeed(resetKey?: number) {
    const [videos, setVideos] = useState<Post[]>([]);
    const isFetchingRef = useRef(false);
    const fetchedIdsRef = useRef(new Set<number>());

    useEffect(() => {
        // Reset when resetKey changes
        setVideos([]);
        fetchedIdsRef.current.clear();
        isFetchingRef.current = false;
    }, [resetKey]);

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
            .filter((video): video is Post => video !== null);

        setVideos((prev) => [...prev, ...newVideos]);
        isFetchingRef.current = false;
    };

    useEffect(() => {
        fetchVideos();

        // Tìm phần tử scroll: ưu tiên MainContent > overflow-y-auto > window
        const mainEl = document.getElementById('MainContent');
        const scrollEl =
            (mainEl?.querySelector('.overflow-y-auto') as HTMLElement) || mainEl;

        if (!scrollEl) return;

        const handleScroll = () => {
            const isNearBottom =
                scrollEl.scrollTop + scrollEl.clientHeight >=
                scrollEl.scrollHeight - SCROLL_THRESHOLD;

            if (isNearBottom) {
                fetchVideos();
            }
        };

        scrollEl.addEventListener('scroll', handleScroll);
        return () => scrollEl.removeEventListener('scroll', handleScroll);
    }, []);

    return videos;
}
