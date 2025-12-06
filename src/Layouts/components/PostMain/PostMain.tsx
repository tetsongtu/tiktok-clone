import { useEffect } from 'preact/hooks';

import PostMainLikes from './PostMainLikes';
import { UserAvatar } from '~/features';
import { Link } from 'wouter-preact';
import { PlusIcon } from '@phosphor-icons/react';
import type { PostMainProps } from '~/shared/types';
import { useCommentContext } from '~/shared/contexts/CommentContext';
import { resetToHome, setVideoUrl } from '~/shared/utils/urlHelper';

function PostMain({ post }: PostMainProps) {
    const { activeVideoId, setActiveVideoId } = useCommentContext();
    const showComments = activeVideoId === post.id;
    const isAnyCommentOpen = activeVideoId !== null;

    const handleToggleComments = () => {
        if (showComments) {
            setActiveVideoId(null);
            resetToHome();
        } else {
            setActiveVideoId(post.id);
            setVideoUrl(post.id);
        }
    };

    const getAspectRatio = () => {
        const width = post?.meta?.video?.resolution_x;
        const height = post?.meta?.video?.resolution_y;

        if (!width || !height) return { class: 'aspect-[9/16]', isWide: false };

        const ratio = width / height;

        if (Math.abs(ratio - 1) < 0.15) {
            return { class: 'aspect-square', isWide: true }; // 1:1
        } else if (ratio > 1.3) {
            return { class: 'aspect-video', isWide: true }; // 16:9
        } else {
            return { class: 'aspect-[9/16]', isWide: false }; // 9:16
        }
    };

    const { class: aspectRatio, isWide } = getAspectRatio();

    useEffect(() => {
        if (!post) return;

        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        const postMainElement = document.getElementById(`post-main-${post?.id}`);

        if (!postMainElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    video.play().catch(() => {});

                    // Nếu có video đang mở comment, tự động chuyển sang video mới
                    if (activeVideoId !== null) {
                        setActiveVideoId(post.id);
                        setVideoUrl(post.id);
                    }
                } else {
                    video.pause();
                }
            },
            { threshold: 0.5 },
        );

        observer.observe(postMainElement);

        return () => observer.disconnect();
    }, [post?.id, activeVideoId, setActiveVideoId]);

    return (
        <div
            className={`h-screen w-full flex justify-center items-center snap-start ${
                isAnyCommentOpen ? 'pr-[150px]' : ''
            }`}
            id={`post-main-${post?.id}`}
        >
            <div className="relative flex items-center justify-center">
                <video
                    className={`${aspectRatio} rounded-2xl object-cover ${
                        isAnyCommentOpen && isWide
                            ? 'h-[85vh] max-w-[50vw]'
                            : 'h-[95vh] max-w-[60vw]'
                    }`}
                    id={`video-${post?.id}`}
                    loop
                    controls
                    muted
                    src={post?.file_url}
                />
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-b-2xl"></div>

                    <div className="relative p-5 text-white">
                        <p className="my-1 text-lg">{post?.description}</p>
                        <p className="text-gray-300">#fun #cool #SuperAwesome</p>
                    </div>
                </div>
                <div className="absolute -right-22 bottom-0 flex items-center flex-col gap-3">
                    <Link
                        className="flex justify-center mb-4 group"
                        to={`/@${post?.user?.nickname}`}
                    >
                        <div className="flex justify-center">
                            <UserAvatar user={post.user} size={18} />
                            <button className="text-white flex justify-center items-center absolute size-8 rounded-full top-14 bg-[var(--primary)] hover:bg-[#d02648]">
                                <PlusIcon size={12} />
                            </button>
                        </div>
                    </Link>
                    <PostMainLikes post={post} onOpenComments={handleToggleComments} />
                </div>
            </div>
        </div>
    );
}

export default PostMain;
