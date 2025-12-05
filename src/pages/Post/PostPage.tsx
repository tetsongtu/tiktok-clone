import { useState, useEffect } from 'preact/hooks';
import { Link } from 'wouter-preact';
import { UserAvatar } from '~/features';
import { HeartIcon, ShareIcon, XIcon } from '@phosphor-icons/react';
import type { Post } from '~/shared/types';
import { CommentsList, CommentInput } from './components';

interface PostPageProps {
    postId: string;
}

export function PostPage({ postId }: PostPageProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10);

        // TODO: Fetch post data from API
        if (postId) {
            setPost({
                id: postId,
                user_id: '1',
                file_url: 'https://example.com/video.mp4',
                description: 'Video description here',
                likes_count: 1234,
                comments_count: 56,
                shares_count: 78,
                user: {
                    id: 1,
                    nickname: 'user123',
                    avatar: '',
                    first_name: 'John',
                    last_name: 'Doe',
                },
                meta: {
                    video: {
                        resolution_x: 1080,
                        resolution_y: 1920,
                    },
                },
            });

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
    }, [postId]);

    const handleAddComment = (text: string) => {
        setComments([
            ...comments,
            {
                id: Date.now(),
                user: { nickname: 'currentUser', avatar: '' },
                text,
                likes: 0,
            },
        ]);
    };

    if (!post) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <Link
                href="/"
                className="absolute top-4 left-4 text-white hover:text-gray-300 z-10"
            >
                <XIcon size={32} />
            </Link>

            <div className="w-full h-full flex max-w-7xl mx-auto">
                {/* Video Section */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <video
                        className="max-h-[90vh] rounded-lg"
                        controls
                        autoPlay
                        loop
                        src={post.file_url}
                    />
                </div>

                {/* Comments Section - Slide from right */}
                <div
                    className={`w-[450px] bg-white flex flex-col transition-transform duration-300 ease-out ${
                        isVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Header */}
                    <div className="p-4 border-b flex items-center gap-3">
                        <Link to={`/@${post.user?.nickname}`}>
                            <UserAvatar user={post.user} size={10} />
                        </Link>
                        <div className="flex-1">
                            <Link
                                to={`/@${post.user?.nickname}`}
                                className="font-semibold hover:underline"
                            >
                                {post.user?.nickname}
                            </Link>
                            <p className="text-sm text-gray-600">{post.description}</p>
                        </div>
                    </div>

                    {/* Comments List */}
                    <CommentsList comments={comments} />

                    {/* Actions & Comment Input */}
                    <div className="border-t p-4">
                        <div className="flex items-center gap-4 mb-3">
                            <button className="hover:text-red-500 transition-colors">
                                <HeartIcon size={28} weight="fill" />
                            </button>
                            <button className="hover:text-gray-600 transition-colors">
                                <ShareIcon size={28} />
                            </button>
                        </div>
                        <p className="font-semibold text-sm mb-3">
                            {post.likes_count.toLocaleString()} lượt thích
                        </p>

                        <CommentInput onSubmit={handleAddComment} />
                    </div>
                </div>
            </div>
        </div>
    );
}
