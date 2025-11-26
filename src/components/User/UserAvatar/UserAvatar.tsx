import type { UserProps } from '~/types';
import Image from '~/components/Image';

interface UserAvatarProps extends UserProps {
    size?: number;
    fallback?: string;
}

function UserAvatar({ user, size = 13, fallback }: UserAvatarProps) {
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
            className="ml-2 cursor-pointer"
        />
    );
}

export default UserAvatar;
