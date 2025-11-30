import { useEffect } from 'preact/hooks';
import { Link } from 'wouter-preact';
import { HeartIcon, MusicNotesIcon } from '@phosphor-icons/react';

import { type PostProps } from '~/shared/types';
import PostMainLikes from './PostMainLikes';
import Image from '~/shared/components/Image';
import Button from '~/shared/components/Buttons/Button';

function PostMain({ post }: PostProps) {
    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        const postMainElement = document.getElementById(`post-main-${post?.id}`);

        if (!postMainElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries[0].isIntersecting ? video.play() : video.pause();
            },
            { threshold: 0.5 },
        );

        observer.observe(postMainElement);

        return () => observer.disconnect();
    }, [post?.id]);

    return (
        <div id={`post-main-${post?.id}`}>
            <div className="border-b py-6 px-10 border-gray-200">
                {/* Header Section */}
                <div className="flex items-center mb-2.5">
                    <Image
                        src={post?.profile?.img}
                        className="cursor-pointer min-w-18 h-18 rounded-full object-cover"
                    />

                    <div className="pl-3 w-full px-4">
                        <div className="flex items-center justify-between">
                            <UserInfo post={post} />
                            <Button variant="outline">Follow</Button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex justify-center">
                    <div>
                        <video
                            className="rounded-lg object-cover mx-auto h-full"
                            id={`video-${post?.id}`}
                            loop
                            controls
                            muted
                            src={post?.video_url}
                        />
                    </div>
                    <PostMainLikes post={post} />
                </div>
            </div>
        </div>
    );
}

// Extracted component for user information
function UserInfo({ post }: { post: PostProps['post'] }) {
    return (
        <div>
            <Link to={`/profile/${post?.profile?.user_id}`}>
                <strong className="hover:underline">{post?.profile?.name}</strong>
            </Link>
            <p className="my-1">{post?.text}</p>
            <p className="text-gray-500 text-xl">#fun #cool #SuperAwesome</p>
            <p className="font-bold flex items-center mt-1">
                <MusicNotesIcon size={20} weight="fill" />
                <span className="px-1">original sound - AWESOME</span>
                <HeartIcon size={20} weight="fill" />
            </p>
        </div>
    );
}

export default PostMain;
