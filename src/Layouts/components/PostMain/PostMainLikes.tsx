import { HeartIcon, ChatCircleIcon, ShareIcon } from '@phosphor-icons/react';
import type { PostMainProps } from '~/shared/types';
import { useState } from 'preact/hooks';
import { ActionButton } from '~/shared';

interface PostMainLikesProps extends PostMainProps {
    onOpenComments: () => void;
}

export function PostMainLikes({ post, onOpenComments }: PostMainLikesProps) {
    const [hasClickedLike, setHasClickedLike] = useState(false);
    const [userLiked] = useState(false);

    const handleLike = () => {
        setHasClickedLike(true);
    };

    const handleShare = () => {
        // TODO: Implement share functionality
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
                count={post.likes_count}
                onClick={handleLike}
                disabled={hasClickedLike}
                isActive={userLiked}
                isLoading={hasClickedLike}
            />

            {/* Comment Button */}
            <ActionButton
                icon={<ChatCircleIcon color="#374151" size={24} weight="fill" />}
                count={post.comments_count}
                onClick={onOpenComments}
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
