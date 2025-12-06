import { useState, useEffect } from 'preact/hooks';
import { Link } from 'wouter-preact';
import { UserAvatar } from '~/features';
import { HeartIcon, ShareIcon } from '@phosphor-icons/react';
import type { Post } from '~/shared/types';

interface Comment {
    id: number;
    user: {
        nickname: string;
        avatar?: string;
    };
    text: string;
    likes: number;
}

interface CommentDrawerProps {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
}

export function CommentDrawer({ post, isOpen, onClose }: CommentDrawerProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState('');
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        setShouldRender(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setComments([
                {
                    id: 1,
                    user: { nickname: 'user1', avatar: '' },
                    text: 'Great video!',
                    likes: 10,
                },
                {
                    id: 2,
                    user: { nickname: 'user2', avatar: '' },
                    text: 'Amazing content 🔥',
                    likes: 5,
                },
            ]);
        }
    }, [isOpen]);

    if (!post) {
        return (
            <div
                className="fixed top-0 right-0 h-full w-[450px] z-50"
                style={{ transform: 'translateX(100%)' }}
            />
        );
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setComments([
            ...comments,
            {
                id: Date.now(),
                user: { nickname: 'currentUser', avatar: '' },
                text: comment,
                likes: 0,
            },
        ]);
        setComment('');
    };

    return (
        <div
            data-comment-drawer
            className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col"
            style={{
                transform: isOpen && shouldRender ? 'translateX(0)' : 'translateX(100%)',
            }}
        >
            {/* Header */}
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">
                    {post.comments_count || 0} bình luận
                </h2>
            </div>

            {/* Post Info */}
            <div className="p-4 border-b flex items-center gap-3">
                <Link to={`/@${post.user?.nickname}`} onClick={onClose}>
                    <UserAvatar user={post.user} size={10} />
                </Link>
                <div className="flex-1">
                    <Link
                        to={`/@${post.user?.nickname}`}
                        onClick={onClose}
                        className="font-semibold hover:underline"
                    >
                        {post.user?.nickname}
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {post.description}
                    </p>
                </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>Chưa có bình luận nào</p>
                        <p className="text-sm mt-1">Hãy là người đầu tiên bình luận!</p>
                    </div>
                ) : (
                    comments.map((c) => (
                        <div key={c.id} className="flex gap-3">
                            <UserAvatar user={c.user} size={8} />
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{c.user.nickname}</p>
                                <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <button className="hover:text-gray-700">
                                        Trả lời
                                    </button>
                                    {c.likes > 0 && <span>{c.likes} lượt thích</span>}
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500">
                                <HeartIcon size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Actions & Input */}
            <div className="border-t p-4">
                <div className="flex items-center gap-4 mb-3">
                    <button className="hover:text-red-500">
                        <HeartIcon size={28} weight="fill" />
                    </button>
                    <button className="hover:text-gray-600">
                        <ShareIcon size={28} />
                    </button>
                </div>
                <p className="font-semibold text-sm mb-3">
                    {post.likes_count?.toLocaleString() || 0} lượt thích
                </p>

                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={comment}
                        onInput={(e) => setComment((e.target as HTMLInputElement).value)}
                        placeholder="Thêm bình luận..."
                        className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="text-blue-500 font-semibold text-sm px-4 disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-600"
                    >
                        Đăng
                    </button>
                </form>
            </div>
        </div>
    );
}
