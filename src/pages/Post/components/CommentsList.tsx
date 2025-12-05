import { UserAvatar } from '~/features';
import { HeartIcon } from '@phosphor-icons/react';

interface Comment {
    id: number;
    user: {
        nickname: string;
        avatar?: string;
    };
    text: string;
    likes: number;
}

interface CommentsListProps {
    comments: Comment[];
}

export function CommentsList({ comments }: CommentsListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>Chưa có bình luận nào</p>
                    <p className="text-sm mt-1">Hãy là người đầu tiên bình luận!</p>
                </div>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <UserAvatar user={comment.user} size={8} />
                        <div className="flex-1">
                            <p className="font-semibold text-sm">
                                {comment.user.nickname}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <button className="hover:text-gray-700">Trả lời</button>
                                {comment.likes > 0 && (
                                    <span>{comment.likes} lượt thích</span>
                                )}
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <HeartIcon size={16} />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
