import { useRoute } from 'wouter-preact';
import { PostPage } from './PostPage';

function Post() {
    const [, params] = useRoute('/post/:id');
    const postId = params?.id;

    if (!postId) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Post not found</p>
            </div>
        );
    }

    return <PostPage postId={postId} />;
}

export default Post;
