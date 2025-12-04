import classNames from 'classnames';
import type { UserProps } from '~/shared/types';
import { Image } from '~/shared';

interface UserAvatarProps extends UserProps {
    size?: number;
    fallback?: string;
    className?: string;
}

function UserAvatar({ user, size = 13, fallback, className }: UserAvatarProps) {
    return (
        <Image
            style={{
                width: `${size * 0.25}rem`,
                height: `${size * 0.25}rem`,
            }}
            rounded
            src={user?.avatar || ''}
            alt={user?.nickname || ''}
            fallback={fallback}
            className={classNames(className, 'cursor-pointer shrink-0')}
        />
    );
}

export default UserAvatar;
