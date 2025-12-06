import { useEffect } from 'preact/hooks';
import { SpinnerIcon, ChartBarIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { Link } from 'wouter-preact';
import type { ProfilePostProps } from '~/shared/types';

export function ProfilePost({ post }: ProfilePostProps) {
    useEffect(() => {
        const video = document.getElementById(`video${post?.id}`) as HTMLVideoElement;

        setTimeout(() => {
            video.addEventListener('mouseenter', () => {
                video.play();
            });
            video.addEventListener('mouseleave', () => {
                video.pause();
            });
        }, 50);
    }, []);

    return (
        <div className="relative brightness-90 cursor-pointer">
            {!post.video_url ? (
                <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black">
                    <SpinnerIcon className="ml-1" size="80" color="#FFFFFF" />
                </div>
            ) : (
                <Link to={`/post/${post.id}/${post.user_id}`}>
                    <video
                        id={`video${post.id}`}
                        muted
                        loop
                        className="aspect-[3/4] object-cover rounded-md"
                        src={post.video_url}
                    />
                </Link>
            )}
            <div className="px-1">
                <p className="text-gray-700 text-[15px] pt-1 break-words">{post.text}</p>
                <div className="flex items-center gap-4 -ml-1 text-gray-600 font-normal text-base">
                    <ChartBarIcon size="15" />
                    3%
                    <WarningCircleIcon size="16" />
                </div>
            </div>
        </div>
    );
}
