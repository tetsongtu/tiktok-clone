import classNames from 'classnames/bind';
import { useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
    rounded?: boolean;
    fallback?: string;
}

function Image({
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

    const classes = cx(styles.wrapper, className, { rounded });

    return (
        <img
            className={classes}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
}

export default Image;
