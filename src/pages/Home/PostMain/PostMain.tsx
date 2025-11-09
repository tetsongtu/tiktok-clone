import { useEffect } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { type PostProps } from '~/types';
import { AiFillHeart } from 'react-icons/ai';
import { ImMusic } from 'react-icons/im';

import Button from '~/components/Buttons/Button';
import PostMainLikes from './PostMainLikes';

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
        <div className="w-[480px] p-6 border-b border-gray-200">
            <img
                src={post?.profile?.img}
                className="cursor-pointer w-10 h-10 rounded-full"
            />
            <div className="w-full pl-3 pr-4">
                <div className="flex justify-between items-center mb-1">
                    <Link to={`/profile/${post?.profile?.user_id}`}>
                        <strong>{post?.profile?.name}</strong>
                    </Link>
                    <Button variant="outline">Follow</Button>
                </div>
                <p>{post?.text}</p>
                <p className="text-gray-500">#fun #cool #SuperAwesome</p>
                <p className="font-bold flex items-center">
                    <ImMusic size={20} />
                    <span className="mx-1">original sound - AWESOME</span>
                    <AiFillHeart size={20} />
                </p>
                <div className="flex mt-1">
                    <div className="relative min-h-[480px] max-h-[750px] max-w-[750px] flex items-center cursor-pointer">
                        <video
                            className="rounded-lg w-full h-full object-cover margin-auto"
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
