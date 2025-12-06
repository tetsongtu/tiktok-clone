import classNames from 'classnames';
import { useState } from 'preact/hooks';
import images from '~/shared/assets/images';

interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
    rounded?: boolean;
    fallback?: string;
    style?: Record<string, string | number>;
}

export function Image({
    src,
    alt,
    className,
    rounded,
    fallback: customFallback = images.noImage,
    ...props
}: ImageProps) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(
                'overflow-hidden select-none pointer-events-none',
                rounded && 'rounded-full object-cover',
                className,
            )}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
}
