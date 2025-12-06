import { useState, useEffect } from 'preact/hooks';
import { PostMain } from '~/Layouts/components';
import { CommentDrawer } from '~/features';
import { useRandomVideoFeed } from '~/shared/hooks';
import { useCommentContext } from '~/shared/contexts/CommentContext';
import { resetToHome } from '~/shared/utils/urlHelper';

export function Home() {
    const [refreshKey, setRefreshKey] = useState(0);
    const videos = useRandomVideoFeed(refreshKey);
    const { activeVideoId, setActiveVideoId } = useCommentContext();

    const activePost = videos.find((v) => v.id === activeVideoId);

    useEffect(() => {
        (window as any).refreshVideoFeed = () => {
            setActiveVideoId(null);
            setRefreshKey((prev) => prev + 1);
        };

        (window as any).closeCommentDrawer = () => {
            setActiveVideoId(null);
        };

        return () => {
            delete (window as any).refreshVideoFeed;
            delete (window as any).closeCommentDrawer;
        };
    }, [setActiveVideoId]);

    return (
        <div>
            {videos.map((video, index) => (
                <PostMain key={`${video.id}-${index}`} post={video} />
            ))}

            <CommentDrawer
                post={activePost || videos[0] || null}
                isOpen={activeVideoId !== null && videos.length > 0}
                onClose={() => {
                    setActiveVideoId(null);
                    resetToHome();
                }}
            />
        </div>
    );
}
