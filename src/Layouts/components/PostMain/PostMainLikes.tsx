import { HeartIcon, ChatCircleIcon, ShareIcon } from '@phosphor-icons/react';
import type { PostLikeProps } from '~/shared/types';
import { useState } from 'preact/hooks';
import { ActionButton } from '~/shared';

export function PostMainLikes({ post }: PostLikeProps) {
    const [hasClickedLike, setHasClickedLike] = useState(false);
    const [userLiked] = useState(false);

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
        <div id={`post-likes-${post.id}`}>
            {/* Like Button */}
            <ActionButton
                icon={
                    <HeartIcon
                        color={userLiked ? '#ff2626' : '#374151'}
                        size={24}
                        weight="fill"
                    />
                }
                count={post.user.likes_count}
                onClick={handleLike}
                disabled={hasClickedLike}
                isActive={userLiked}
                isLoading={hasClickedLike}
            />

            {/* Comment Button */}
            <ActionButton
                icon={<ChatCircleIcon color="#374151" size={24} weight="fill" />}
                count={post?.comments_count}
                onClick={handleOpenComments}
            />

            {/* Share Button */}
            <ActionButton
                icon={<ShareIcon color="#374151" size={24} weight="fill" />}
                count={post.shares_count}
                onClick={handleShare}
            />
        </div>
    );
}

export default PostMainLikes;
