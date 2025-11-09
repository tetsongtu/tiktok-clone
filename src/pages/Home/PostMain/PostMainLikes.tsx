import { AiFillHeart } from 'react-icons/ai';
import type { PostLikeProps, Like, Comment } from '~/types';
import { useState } from 'preact/hooks';
import { FaCommentDots, FaShare } from 'react-icons/fa6';
import ActionButton from '~/components/Buttons/ActionButton';

export function PostMainLikes({ post }: PostLikeProps) {
    const [hasClickedLike, setHasClickedLike] = useState(false);
    const [userLiked, setUserLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);

    const likeOrUnlike = () => {
        console.log('likeOrUnlike');
    };

    const openComments = () => {
        console.log('open comments');
    };

    const sharePost = () => {
        console.log('share post');
    };

    return (
        <div className="relative" id={`post-likes-${post?.id}`}>
            <div className="absolute bottom-0 pl-[1rem]">
                <div className="pb-1">
                    {/* Like Button */}
                    <ActionButton
                        icon={
                            <AiFillHeart
                                color={userLiked ? '#ff2626' : '#374151'}
                                size={20}
                            />
                        }
                        count={likes?.length}
                        onClick={() => {
                            likeOrUnlike();
                            setHasClickedLike(true);
                        }}
                        disabled={hasClickedLike}
                        isActive={userLiked}
                        isLoading={hasClickedLike}
                    />

                    {/* Comment Button */}
                    <ActionButton
                        icon={<FaCommentDots color="#374151" size={18} />}
                        count={comments?.length}
                        onClick={openComments}
                    />

                    {/* Share Button */}
                    <ActionButton
                        icon={<FaShare color="#374151" size={18} />}
                        count={55}
                        onClick={sharePost}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostMainLikes;
