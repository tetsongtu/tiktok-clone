import { useEffect } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { type PostProps } from '~/types';
import { AiFillHeart } from 'react-icons/ai';
import { ImMusic } from 'react-icons/im';

import Button from '~/components/Buttons/Button';
import PostMainLikes from './PostMainLikes';
import Image from '~/components/Image';

function PostMain({ post }: PostProps) {
    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        const postMainElement = document.getElementById(`post-main-${post?.id}`);

        if (postMainElement) {
            let observer = new IntersectionObserver(
                (entries) => {
                    entries[0].isIntersecting ? video.play() : video.pause();
                },
                { threshold: 0.5 },
            );
            observer.observe(postMainElement);
        }
    }, []);
    return (
        <div className="flex border-b py-6 px-10 border-gray-200">
            <Image
                src={post?.profile?.img}
                className="cursor-pointer min-w-18 h-18 rounded-full object-cover"
            />
            <div className="pl-3 w-full px-4">
                <div className="flex items-center justify-between">
                    <Link to={`/profile/${post?.profile?.user_id}`}>
                        <strong>{post?.profile?.name}</strong>
                    </Link>
                    <Button variant="outline">Follow</Button>
                </div>
                <p>{post?.text}</p>
                <p className="text-gray-500">#fun #cool #SuperAwesome</p>
                <p className="font-bold flex items-center">
                    <ImMusic size={20} />
                    <span className="px-1">original sound - AWESOME</span>
                    <AiFillHeart size={20} />
                </p>

                <div className="flex mt-2.5 justify-center">
                    <div className="relative min-h-[480px] max-h-[750px] max-w-[750px] flex items-center cursor-pointer">
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

export default PostMain;
