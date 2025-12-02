import { HeartIcon, ChatCircleIcon, ShareIcon } from '@phosphor-icons/react';
import type { PostLikeProps } from '~/shared/types';
import { useState } from 'preact/hooks';
import { ActionButton } from '~/shared';

export function PostMainLikes({ post }: PostLikeProps) {
    const [hasClickedLike, setHasClickedLike] = useState(false);
    const [userLiked] = useState(false);

    // Sử dụng trực tiếp từ post data
    const comments = post.comments_count || [];
    const likes = post.likes_count || [];

    const handleLike = () => {
        console.log('likeOrUnlike');
        setHasClickedLike(true);
    };

    const handleOpenComments = () => {
        console.log('open comments');
    };

    const handleShare = () => {
        console.log('share post');
    };

    return (
        <div className="relative" id={`post-likes-${post.id}`}>
            <div className="absolute bottom-0 pl-4">
                <div className="pb-1 flex flex-col gap-1">
                    {/* Like Button */}
                    <ActionButton
                        icon={
                            <HeartIcon
                                color={userLiked ? '#ff2626' : '#374151'}
                                size={20}
                                weight="fill"
                            />
                        }
                        count={likes.length}
                        onClick={handleLike}
                        disabled={hasClickedLike}
                        isActive={userLiked}
                        isLoading={hasClickedLike}
                    />

                    {/* Comment Button */}
                    <ActionButton
                        icon={<ChatCircleIcon color="#374151" size={20} weight="fill" />}
                        count={comments.length}
                        onClick={handleOpenComments}
                    />

                    {/* Share Button */}
                    <ActionButton
                        icon={<ShareIcon color="#374151" size={20} weight="fill" />}
                        count={post.shares_count || 0}
                        onClick={handleShare}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostMainLikes;
