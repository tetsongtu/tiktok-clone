import { useEffect } from 'preact/hooks';

import PostMainLikes from './PostMainLikes';
import { UserAvatar } from '~/features';
import { Link } from 'wouter-preact';
import { PlusIcon } from '@phosphor-icons/react';
import type { PostMainProps } from '~/shared/types';

function PostMain({ post }: PostMainProps) {
    // Calculate aspect ratio from meta
    const getAspectRatio = () => {
        const width = post?.meta?.video?.resolution_x;
        const height = post?.meta?.video?.resolution_y;

        if (!width || !height) return 'aspect-[9/16]';

        const ratio = width / height;

        if (Math.abs(ratio - 1) < 0.15) {
            return 'aspect-square'; // 1:1
        } else if (ratio > 1.3) {
            return 'aspect-video'; // 16:9
        } else {
            return 'aspect-[9/16]'; // 9:16
        }
    };

    const aspectRatio = getAspectRatio();

    useEffect(() => {
        if (!post) return;

        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        const postMainElement = document.getElementById(`post-main-${post?.id}`);

        if (!postMainElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries[0].isIntersecting ? video.play().catch(() => {}) : video.pause();
            },
            { threshold: 0.5 },
        );

        observer.observe(postMainElement);

        return () => observer.disconnect();
    }, [post?.id]);

    return (
        <div
            className="h-screen w-full flex justify-center items-center snap-start"
            id={`post-main-${post?.id}`}
        >
            <div className="relative flex items-center justify-center">
                <video
                    className={`${aspectRatio} rounded-2xl object-cover h-[95vh] max-w-[60vw]`}
                    id={`video-${post?.id}`}
                    loop
                    controls
                    muted
                    src={post?.file_url}
                />
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-b-2xl"></div>

                    <div className="relative p-5 text-white">
                        <p className="my-1">{post?.description}</p>
                        <p className="text-gray-500 text-xl">#fun #cool #SuperAwesome</p>
                    </div>
                </div>
                <div className="absolute -right-22 bottom-0 flex items-center flex-col gap-2">
                    <Link
                        className="flex justify-center mb-6"
                        to={`/@${post?.user?.nickname}`}
                    >
                        <UserAvatar user={post.user} size={18} />
                        <button className="text-white flex justify-center items-center absolute size-8 rounded-full top-14 bg-[var(--primary)]">
                            <PlusIcon size={12} />
                        </button>
                    </Link>
                    <PostMainLikes post={post} />
                </div>
            </div>
        </div>
    );
}

export default PostMain;
