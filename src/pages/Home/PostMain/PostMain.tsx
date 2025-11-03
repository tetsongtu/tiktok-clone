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
        <div
            style={{
                display: 'flex',
                padding: '24px 0px',
                borderBottom: '1px solid #ccc',
            }}
        >
            <img
                src={post?.profile?.img}
                style={{
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                }}
            />
            <div
                style={{
                    width: '100%',
                    paddingLeft: '12px',
                    paddingRight: '16px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '0.125rem',
                    }}
                >
                    <Link to={`/profile/${post?.profile?.user_id}`}>
                        <strong>{post?.profile?.name}</strong>
                    </Link>
                    <Button
                        outline
                        style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                    >
                        Follow
                    </Button>
                </div>
                <p>{post?.text}</p>
                <p style={{ color: 'gray' }}>#fun #cool #SuperAwesome</p>
                <p
                    style={{
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <ImMusic size={20} />
                    <span style={{ margin: '0 .5rem' }}>original sound - AWESOME</span>
                    <AiFillHeart size={20} />
                </p>
                <div style={{ display: 'flex', marginTop: '0.625rem' }}>
                    <div
                        style={{
                            position: 'relative',
                            minHeight: '480px',
                            maxHeight: '580px',
                            maxWidth: '260px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <video
                            style={{
                                borderRadius: '1rem',
                                objectFit: 'cover',
                                margin: 'auto 0',
                                height: '100%',
                            }}
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
