import type { UserProps } from '~/types';
import Image from '~/components/Image';

interface UserAvatarProps extends UserProps {
    size?: number;
}

function UserAvatar({ user, size = 13 }: UserAvatarProps) {
    return (
        <Image
            style={{
                width: `${size * 0.25}rem`,
                height: `${size * 0.25}rem`,
            }}
            className="my-auto"
            rounded
            src={user?.avatar || ''}
            alt={user?.nickname || ''}
        />
    );
}

export default UserAvatar;
