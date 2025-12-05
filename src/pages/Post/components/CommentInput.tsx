import { useState } from 'preact/hooks';

interface CommentInputProps {
    onSubmit: (text: string) => void;
}

export function CommentInput({ onSubmit }: CommentInputProps) {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (!comment.trim()) return;

        onSubmit(comment);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
                type="text"
                value={comment}
                onInput={(e) => setComment((e.target as HTMLInputElement).value)}
                placeholder="Thêm bình luận..."
                className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            />
            <button
                type="submit"
                disabled={!comment.trim()}
                className="text-blue-500 font-semibold text-sm px-4 disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-600 transition-colors"
            >
                Đăng
            </button>
        </form>
    );
}
