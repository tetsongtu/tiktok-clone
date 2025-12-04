import { useEffect } from 'preact/hooks';

import PostMainLikes from './PostMainLikes';
import { UserAvatar } from '~/features';
import { Link } from 'wouter-preact';
import { PlusIcon } from '@phosphor-icons/react';
import type { PostMainProps } from '~/shared/types';

function PostMain({ post }: PostMainProps) {
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
        <div className="pb-12" id={`post-main-${post?.id}`}>
            <video
                className="aspect-[9/16] rounded-2xl object-cover"
                id={`video-${post?.id}`}
                loop
                controls
                muted
                src={post?.file_url}
            />
            <div className="relative">
                <div className="absolute bottom-0 inset-x-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-b-3xl"></div>

                    <div className=" p-5 text-white">
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
