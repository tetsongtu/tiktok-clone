import { useEffect } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { type PostProps } from '~/types';
import { AiFillHeart } from 'react-icons/ai';
import { ImMusic } from 'react-icons/im';

import Button from '~/components/Button';

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
        <div style={{ display: 'flex' }} id={`post-main-${post?.id}`}>
            <div
                style={{
                    cursor: 'pointer',
                }}
            >
                <img
                    src={post?.profile?.img}
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
            </div>

            <div
                style={{
                    width: '32%',
                    padding: '0 1rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to={`/profile/${post?.profile?.user_id}`}>
                        <p>
                            <strong>{post?.profile?.name}</strong>
                        </p>
                    </Link>
                    <Button
                        outline
                        style={{
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem',
                        }}
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

                <div>
                    <video
                        style={{
                            borderRadius: '1rem',
                            objectFit: 'cover',
                            margin: '0 ',
                            height: '100%',
                        }}
                        id={`video-${post?.id}`}
                        loop
                        controls
                        muted
                        src={post?.video_url}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostMain;
